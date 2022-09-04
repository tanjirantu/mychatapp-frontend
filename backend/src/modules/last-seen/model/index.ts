import { Schema, model } from "mongoose";
import { LastSeen } from "../types";

const lastSeenSchema = new Schema<LastSeen>(
	{
		userUid: String,
		roomUid: String,
		lastSeenAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const LastSeenModel = model<LastSeen>("LastSeen", lastSeenSchema);

export default LastSeenModel;
