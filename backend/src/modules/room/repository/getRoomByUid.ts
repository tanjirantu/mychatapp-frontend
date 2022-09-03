import { Request, ResponseToolkit } from "@hapi/hapi";
import { sendErrorResponse, sendResponse } from "../../../helper";
import RoomModel from "../model";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const authUser = request.auth.credentials;
		const uid = request.query.uid;

		const room = await RoomModel.findOne({
			uid,
			users: authUser.uid,
			isDeleted: false,
		});

		if (!room) {
			return h.response(sendErrorResponse("DATA_NOT_FOUND ")).code(200);
		}

		return h.response(sendResponse(room, 200, "SUCCESS")).code(200);
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
