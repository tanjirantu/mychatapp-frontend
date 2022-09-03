import { Request, ResponseToolkit } from "@hapi/hapi";
import { sendResponse } from "../../../helper";
import mapOdmEntityToType from "../mapper/mapOdmEntityToType";
import RoomModel from "../model";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const skip = request.query.skip ? request.query.skip : 0;
		const limit = request.query.limit ? request.query.limit : 10;

		const authUser = request.auth.credentials;
		const findQuery = { users: authUser.userUid };
		const rooms = await RoomModel.aggregate([
			{
				$match: findQuery,
			},
			{
				$lookup: {
					from: "users",
					localField: "users",
					foreignField: "uid",
					as: "users",
				},
			},
			{
				$project: {
					uid: 1,
					createdAt: 1,
					updatedAt: 1,
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

		const count = await RoomModel.countDocuments(findQuery);

		return h
			.response(
				sendResponse(
					{ rooms: rooms.map(mapOdmEntityToType), count },
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
