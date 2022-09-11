import { Request, ResponseToolkit } from "@hapi/hapi";
import { flattenObject, sendResponse } from "../../../helper";
import { pubClient } from "../../../server/httpServer";
import MessageModel from "../model";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const roomUid: string = request.params.roomUid;
		const authUser = request.auth.credentials;

		let skip = 0;
		let limit = 10;

		if (request.query.skip) skip = request.query.skip;
		if (request.query.limit) limit = request.query.limit;

		const findQuery = flattenObject({ roomUid: roomUid });

		if (request.query && request.query.includeOnly) {
			const fileTypes = request.query.includeOnly.split(",");
			if (fileTypes.length) {
				findQuery["files.fileType"] = {
					$in: fileTypes,
				};
			}
		}

		await pubClient.hSet(
			`${roomUid}:${authUser.userUid}`,
			"lastSeenAt",
			JSON.stringify(new Date().toUTCString())
		);

		const messages = await MessageModel.find(findQuery)
			.sort({ _id: -1 })
			.skip(skip)
			.limit(limit);

		const count = await MessageModel.countDocuments(findQuery);

		return h
			.response(
				sendResponse(
					{
						messages,
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
