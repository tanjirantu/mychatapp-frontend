import { Request, ResponseToolkit } from "@hapi/hapi";
import UserModel from "../model";
import {
	sendResponse,
	sendErrorResponse,
	flattenObject,
} from "../../../helper";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const authUser = request.auth.credentials;
		const user = await UserModel.findOne({
			uid: authUser.userUid,
			isDeleted: false,
		});

		if (!user)
			return h.response(sendErrorResponse("DATA_NOT_FOUND ")).code(200);

		return h.response(sendResponse(user, 200, "SUCCESS")).code(200);
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
