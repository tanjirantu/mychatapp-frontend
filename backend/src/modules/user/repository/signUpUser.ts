import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserSignUpInput } from "../types";
import UserModel from "../model";
import { sendResponse, sendErrorResponse, generateOtp } from "../../../helper";
import generateUserUid from "./generateUserUid";
import OtpModel from "../../otp/model";
import generateToken from "../../../helper/generateToken";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const payload: UserSignUpInput = request.payload as UserSignUpInput;

		const currentTime = new Date(Date.now()).toUTCString();

		const userExists = await UserModel.findOne({
			"contact.phone": payload.phone,
			isDeleted: false,
		});

		if (userExists) {
			return h
				.response(sendErrorResponse("USER_ALREADY_EXISTS"))
				.code(200);
		}

		const isUserVerified = await OtpModel.findOne({
			deviceUuid: payload.deviceUuid,
			otp: payload.otp,
			expiresAt: { $gt: new Date(currentTime) },
		});

		if (isUserVerified) {
			const uid = await generateUserUid();
			const newUser = {
				uid,
				deviceUuid: payload.deviceUuid,
				meta: {
					firstName: payload.firstName,
					lastName: payload.lastName,
				},
				contact: {
					phone: payload.phone,
					countryCode: payload.countryCode,
					phoneNumberWithCountryCode:
						payload.countryCode + payload.phone,
					isVerified: true,
				},
				lastLoginTime: new Date(),
				isLoggedIn: true,
			};

			const user = await UserModel.create(newUser);
			const token: any = await generateToken({
				userUid: user.uid,
				deviceUuid: payload.deviceUuid,
				phoneNumberWithCountryCode: payload.countryCode + payload.phone,
			});

			return h.response(sendResponse(token, 200, "SUCCESS")).code(200);
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
