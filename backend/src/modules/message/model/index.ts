import { Schema, model } from "mongoose";
import { Message } from "../types";

const messageSchema = new Schema<Message>(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		roomUid: String,
		senderUid: String,
		text: String,
		files: [
			{
				url: String,
				originalFileName: String,
				generatedFileName: String,
			},
		],
		replies: [
			{
				text: String,
				files: [
					{
						url: String,
						originalFileName: String,
						generatedFileName: String,
					},
				],
			},
		],
		isDeleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const MessageModel = model<Message>("Message", messageSchema);

export default MessageModel;
