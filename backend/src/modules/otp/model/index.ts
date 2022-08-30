import { Schema, model } from "mongoose";
import { Otp } from "../types";

const otpSchema = new Schema<Otp>(
	{
		deviceUuid: String,
		otp: String,
		expiresAt: {
			type: Date,
			default: Date.now,
			expires: "60s", // 1 min
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const OtpModel = model<Otp>("Otp", otpSchema);

export default OtpModel;
