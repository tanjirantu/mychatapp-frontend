import { Request, ResponseToolkit } from "@hapi/hapi";
import { flattenObject, sendResponse } from "../../../helper";
import mapOdmEntityToType from "../mapper/mapOdmEntityToType";
import RoomModel from "../model";
import { pubClient } from "../../../server/httpServer";
import MessageModel from "../../message/model";

const getNewMessagesCount = async (roomUid: string, userUid: string) => {
	const myLastSeenAt = (await pubClient.hGet(
		`${roomUid}:${userUid}`,
		"lastSeenAt"
	)) as string;

	const createdAtObj: any = {};
	createdAtObj["$gt"] = new Date(JSON.parse(myLastSeenAt));

	const newMessagesFindQuery: any = flattenObject({ "room.uid": roomUid });

	if (myLastSeenAt) newMessagesFindQuery["createdAt"] = createdAtObj;

	return MessageModel.countDocuments(newMessagesFindQuery);
};

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const skip = request.query.skip ? request.query.skip : 0;
		const limit = request.query.limit ? request.query.limit : 10;

		const authUser: any = request.auth.credentials;
		const findQuery = { "users.uid": authUser.userUid };
		const rooms = await RoomModel.aggregate([
			{
				$match: findQuery,
			},
			{
				$project: {
					_id: 1,
					uid: 1,
					users: {
						$filter: {
							input: "$users",
							as: "user",
							cond: { $ne: ["$$user.uid", authUser.userUid] },
						},
					},
				},
			},
			{ $sort: { _id: -1 } },
			{ $skip: skip },
			{ $limit: limit },
		]);

		const messageRooms: any = [];

		for await (const room of rooms) {
			const lastMessageResponse = await pubClient.hGet(
				room.uid,
				"lastMessage"
			);
			const lastSeenAtResponse = (await pubClient.hGet(
				`${room.uid}:${room.users[0].uid}`,
				"lastSeenAt"
			)) as string;

			// const promiseResolved: any = await Promise.all([lastMessageResponse, lastSeenAtResponse]);

			let seenAt: any = null;
			if (lastSeenAtResponse !== null)
				seenAt = JSON.parse(lastSeenAtResponse);

			let parsedLastMessage: any = {};
			if (lastMessageResponse)
				parsedLastMessage = JSON.parse(lastMessageResponse);

			const newMessageCount = await getNewMessagesCount(
				room.uid,
				authUser.userUid
			);

			const updatedMessageRoom = {
				...room,
				lastMessage: parsedLastMessage,
				lastSeenAt: seenAt,
				newMessageCount,
			};

			messageRooms.push(updatedMessageRoom);
		}

		const count = await RoomModel.countDocuments(findQuery);

		return h
			.response(
				sendResponse(
					{ rooms: messageRooms.map(mapOdmEntityToType), count },
					200,
					"SUCCESS"
				)
			)
			.code(200);
	} catch (exp: any) {
		return h
			.response({
				statusCode: 500,
				message: "ERROR",
				error: exp.toString(),
			})
			.code(500);
	}
};
