import { Request, ResponseToolkit } from "@hapi/hapi";
import UserModel from "../model";
import { sendResponse } from "../../../helper";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const users = await UserModel.find({ isDeleted: false });
		const count = await UserModel.countDocuments({ isDeleted: false });

		return h
			.response(sendResponse({ users, count }, 200, "SUCCESS"))
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
