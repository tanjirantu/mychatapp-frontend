import { createRoom, getRoomByUid, getRooms } from "./repository";

import validator from "./validator";

export default [
	{
		method: "GET",
		path: "/rooms",
		options: {
			auth: {
				strategy: "jwt",
			},
			tags: ["Api", "Room"],
			description: "Get rooms",
		},
		handler: getRooms,
	},
	{
		method: "GET",
		path: "/rooms/{uid}",
		options: {
			auth: {
				strategy: "jwt",
			},
			tags: ["Api", "Room"],
			description: "Get room by uid",
			validate: validator.getRoomByUid,
		},
		handler: getRoomByUid,
	},
	{
		method: "POST",
		path: "/rooms",
		options: {
			auth: {
				strategy: "jwt",
			},
			tags: ["Api", "Room"],
			description: "Create rooms",
			validate: validator.createRoom,
		},
		handler: createRoom,
	},
];
