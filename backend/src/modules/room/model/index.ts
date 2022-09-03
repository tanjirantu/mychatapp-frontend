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
		label: String,
		users: [
			{
				type: String,
				required: true,
			},
		],
		isDeleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const RoomModel = model<Room>("Room", roomSchema);

export default RoomModel;
