import { Schema, model } from "mongoose";
import { Room } from "../types";

const roomSchema = new Schema<Room>(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		users: [{ type: Schema.Types.ObjectId, ref: "User" }],
		isDeleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const RoomModel = model<Room>("Room", roomSchema);

export default RoomModel;
