import { Request, ResponseToolkit } from "@hapi/hapi";
import { sendResponse } from "../../../helper";
import MessageModel from "../model";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const uid: string = request.query.roomUid;
		const authUser = request.auth.credentials;

		let skip = 0;
		let limit = 10;

		if (request.query.skip) skip = request.query.skip;
		if (request.query.limit) skip = request.query.limit;

		const findQuery = {
			$or: [
				{ uid, senderUid: authUser.userUid },
				{ uid, receiverUid: authUser.userUid },
			],
		};
		const messages = await MessageModel.find(findQuery);

		const count = await MessageModel.countDocuments(findQuery)
			.sort({ _id: -1 })
			.skip(skip)
			.limit(limit);

		const reversedMessagesArray = messages.reverse();

		return h
			.response(
				sendResponse(
					{
						messages: reversedMessagesArray,
						count,
					},
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
