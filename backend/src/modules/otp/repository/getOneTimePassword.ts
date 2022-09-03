import { Request, ResponseToolkit } from "@hapi/hapi";
import { PhoneNumVerifyInput } from "../types";
import { sendResponse, sendErrorResponse, generateOtp } from "../../../helper";
import Crypto from "crypto";
import { Twilio } from "twilio";
import OtpModel from "../model";
import { v1 as uuidv1 } from "uuid";
import UserModel from "../../user/model";

const twilioClient = new Twilio(
	process.env.TWILIO_ACCOUNT_SID || "",
	process.env.TWILIO_AUTH_TOKEN || ""
);

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const payload: PhoneNumVerifyInput =
			request.payload as PhoneNumVerifyInput;

		const deviceUuid = uuidv1();
		const dialCode = payload.dialCode;

		const phoneWithDialCode = dialCode + parseInt(payload.phone);

		const otp = generateOtp();

		//add 1 minute to date
		var minutesToAdd = 60;
		var currentTime = new Date();
		var expiresAt = new Date(
			currentTime.getTime() + minutesToAdd * 60000
		).toUTCString();

		OtpModel.create({
			otp,
			deviceUuid,
			expiresAt,
		});

		// const response = await twilioClient.messages.create({
		// 	body: `Your account verification code is: ${otp}`,
		// 	from: process.env.TWILIO_PHONE_NUMBER || "+13344639271" ,
		// 	to: `${phoneWithDialCode}`,
		// });

		// if (!response) {
		// 	return h
		// 		.response(sendErrorResponse("COULD_NOT_SEND_SMS"))
		// 		.code(200);
		// }

		return h
			.response(sendResponse({ deviceUuid }, 200, "SUCCESS"))
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
