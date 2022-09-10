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
		firstName: String,
		lastName: String,
		logo: {
			url: String,
			name: String,
		},
		contact: {
			phone: { type: String, trim: true },
			dialCode: { type: String, trim: true },
			phoneWithDialCode: { type: String, unique: true, trim: true },
			isPhoneVerified: {
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
