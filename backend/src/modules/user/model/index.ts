import { Schema, model } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		deviceUuid: String,
		meta: {
			firstName: String,
			lastName: String,
			logo: {
				url: String,
				name: String,
			},
		},
		contact: {
			countryCode: String,
			phone: String,
			phoneNumberWithCountryCode: { type: String, unique: true },
			isPhoneNumberVerified: {
				type: Boolean,
				default: false,
			},
		},
		lastLoginTime: { type: Date },
		isLoggedIn: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true },
		isDeleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const UserModel = model<User>("User", userSchema);

export default UserModel;
