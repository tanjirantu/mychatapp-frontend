import { Request, ResponseToolkit } from "@hapi/hapi";
import OtpModel from "../model";
import {
	sendResponse,
	sendErrorResponse,
	flattenObject,
} from "../../../helper";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const currentDateTime = new Date(Date.now()).toUTCString();
		const buyer = await OtpModel.findOne({
			otp: request.params.token,
			expiresAt: { $gt: new Date(currentDateTime) },
		});

		if (!buyer)
			return h
				.response(sendErrorResponse("OTP_HAS_EXPIRED_OR_IS_INVALID"))
				.code(200);
		return h.response(sendResponse({}, 200, "SUCCESS")).code(200);
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
