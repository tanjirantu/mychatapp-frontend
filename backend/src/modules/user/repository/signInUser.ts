import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserSignInInput } from "../types";
import UserModel from "../model";
import { sendResponse, sendErrorResponse } from "../../../helper";
import OtpModel from "../../otp/model";
import generateToken from "../../../helper/generateToken";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const payload: UserSignInInput = request.payload as UserSignInInput;

		const currentTime = new Date(Date.now()).toUTCString();
		const isUserVerified = await OtpModel.findOne({
			deviceUuid: payload.deviceUuid,
			otp: payload.otp,
			expiresAt: { $gt: new Date(currentTime) },
		});

		if (isUserVerified) {
			const user = await UserModel.findOneAndUpdate(
				{
					"contact.phone": payload.phone,
					isDeleted: false,
				},
				{
					$set: {
						deviceUuid: payload.deviceUuid,
						lastLoginTime: new Date(),
						isLoggedIn: true,
					},
				},
				{
					new: true,
				}
			);

			if (user) {
				const token: any = await generateToken({
					userUid: user.uid,
					deviceUuid: payload.deviceUuid,
					phoneWithDialCode: payload.dialCode + payload.phone,
				});
				return h
					.response(sendResponse(token, 200, "SUCCESS"))
					.code(200);
			}
			return h.response(sendErrorResponse("NO_DATA_FOUND")).code(200);
		}

		return h
			.response(sendErrorResponse("OTP_HAS_EXPIRED_OR_IS_INVALID"))
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
