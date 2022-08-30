import { getDeviceUuid, getOneTimePassword } from "./repository";
import verifyOtp from "./repository/verifyOneTimePassword";

import validator from "./validator";

export default [
	{
		method: "GET",
		path: "/deviceuid",
		options: {
			tags: ["Api", "Otp"],
			description: "Get device uid",
		},
		handler: getDeviceUuid,
	},
	{
		method: "POST",
		path: "/get-otp",
		options: {
			tags: ["Api", "Otp"],
			description: "Get otp",
			validate: validator.getOneTimePassword,
		},
		handler: getOneTimePassword,
	},
	{
		method: "GET",
		path: "/verify-otp/{token}",
		options: {
			tags: ["Api", "Otp"],
			description: "Verify otp",
			validate: validator.verifyOtp,
		},
		handler: verifyOtp,
	},
];
