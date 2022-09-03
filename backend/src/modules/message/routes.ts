import { getMessages } from "./repository";
import validator from "./validator";

export default [
	{
		method: "GET",
		path: "/messages/{roomUid}",
		options: {
			auth: {
				strategy: "jwt",
			},
			tags: ["Api", "Message"],
			description: "Get messages",
			validate: validator.getMessages,
		},
		handler: getMessages,
	},
];
