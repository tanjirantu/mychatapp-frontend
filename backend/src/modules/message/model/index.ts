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
				fileType: String,
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
						fileType: String,
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

messageSchema.index({ createdAt: -1 });
const MessageModel = model<Message>("Message", messageSchema);

export default MessageModel;
