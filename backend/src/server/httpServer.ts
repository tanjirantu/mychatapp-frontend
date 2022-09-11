import Hapi, { ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { getDateTime, logger } from "../plugin/logger";
import routes from "../plugin/router";
// @ts-ignore
import Jwt from "hapi-auth-jwt2";
import { HttpServerConfiguration } from "../config";
import UserModel from "../modules/user/model";
// import { Server } from "socket.io";
import { getAuthUserFromToken } from "../helper";
import RoomModel from "../modules/room/model";
import { AuthUser } from "../shared/types/DecodedAuthToken";
import LastSeenModel from "../modules/last-seen/model";
import LastSeenCreateInput from "../modules/last-seen/types/LastSeenCreateInput";
import generateMessageUid from "../modules/message/repository/generateMessageUid";
import MessageModel from "../modules/message/model";
import { MessageCreateInput } from "../modules/message/types";
// @ts-ignore
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import RedisHashUpdateInput from "../shared/types/RedisHashUpdateInput";

export const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();
const redisClient = pubClient.duplicate();

const validateJwt = async (
	authUser: any,
	request: Request,
	h: ResponseToolkit
) => {
	const validUser = await UserModel.findOne({
		uid: authUser.userUid,
		// deviceUuid: authUser.deviceUuid,
		isDeleted: false,
	});

	if (validUser) return { isValid: true };
	else return { isValid: false };
};

const getRooms = async (authUser: AuthUser) => {
	const findQuery = { "users.uid": authUser.userUid, isDeleted: false };
	const selectedFields = { uid: 1, _id: 0 };
	return RoomModel.find(findQuery, selectedFields);
};

const createMessage = async (payload: MessageCreateInput) => {
	const uid = await generateMessageUid();
	return MessageModel.create({ uid, ...payload });
};

const updateLastSeen = async (lastSeen: LastSeenCreateInput) => {
	return await LastSeenModel.findOneAndUpdate(
		{
			userUid: lastSeen.userUid,
		},
		{
			$set: {
				lastseenAt: new Date().toUTCString(),
			},
		}
	);
};

const updateRedisHashmap = async ({ uid, key, data }: RedisHashUpdateInput) => {
	await pubClient.hSet(uid, key, data);
};

const server = Hapi.server({
	host: HttpServerConfiguration.hostname,
	port: HttpServerConfiguration.port,
	routes: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type"],
			additionalHeaders: ["Authorization"],
			credentials: true,
		},
		validate: {
			failAction: async (request, h, err) => {
				if (process.env.NODE_ENV === "production") {
					// In prod, log a limited error message and throw the default Bad Request error.
					console.error("ValidationError:", err);
					return h
						.response({
							message: "Invalid request payload input",
							statusCode: 400,
							error: "Bad Reqquest",
						})
						.code(400)
						.takeover();
				} else {
					console.error(err);
					throw err;
				}
			},
		},
	},
});

const StartServer = async () => {
	try {
		server.validator(Joi);
		server.realm.modifiers.route.prefix = "/api/v1";
		await server.register(Jwt);
		await server.auth.strategy("jwt", "jwt", {
			key: process.env.AUTH_JWT_SECRET,
			verifyOptions: {
				algorithms: [
					process.env.AUTH_JWT_ALGORITHM?.toString() || "HS256",
				],
			},
			validate: validateJwt,
		});

		server.route(routes);

		// server.ext("onRequest", async (request, h) => {
		// 	if (request.headers.authuser)
		// 		request.headers.authuser = JSON.parse(request.headers.authuser);
		// 	return h.continue;
		// });
		server.events.on("response", function (request: any) {
			let ts = Date.now();
			const dateTime = getDateTime(ts);
			const responseDateTime = { timestamp: ts, dateTime: dateTime };
			logger(request, responseDateTime);
		});
	} catch (err) {
		console.log("ERR: Server Plugin - ", err);
	}

	var io = require("socket.io")(server.listener, {
		cors: { origin: "*" },
	});
	Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
		io.adapter(createAdapter(pubClient, subClient));
	});
	io.on("connection", async (socket: any) => {
		try {
			const authToken = socket?.handshake?.auth?.token;
			const authUser: any = getAuthUserFromToken(authToken);

			console.log(`New user connected!`, authUser.userUid);

			const myRooms = await getRooms(authUser);
			const myRoomUids: any = myRooms.map((room) => room.uid);
			myRoomUids.push(authUser.userUid);
			socket.join(myRoomUids);

			socket.broadcast.emit("onUserOnline", {
				userUid: authUser.userUid,
				isOnline: true,
			});

			socket.on("onTypingStarted", (roomUid: string, userUid: string) => {
				socket
					.to(roomUid)
					.emit("onTypingStarted", { roomUid, userUid });
			});

			socket.on("onTypingStopped", (roomUid: string, userUid: string) => {
				socket
					.to(roomUid)
					.emit("onTypingStopped", { roomUid, userUid });
			});

			socket.on("onMessageWindowChange", (data: LastSeenCreateInput) => {
				updateLastSeen(data);
				updateRedisHashmap({
					uid: `${data.roomUid}:${authUser.userUid}`,
					key: "lastSeenAt",
					data: JSON.stringify(new Date().toUTCString()),
				});
			});

			socket.on("onMessageSubmit", (data: MessageCreateInput) => {
				const messageCreateInput: MessageCreateInput = {
					...data,
					senderUid: authUser.userUid,
				};

				createMessage(messageCreateInput);
				updateRedisHashmap({
					uid: data.roomUid,
					key: "lastMessage",
					data: JSON.stringify(data),
				});
				updateRedisHashmap({
					uid: `${data.roomUid}:${authUser.userUid}`,
					key: "lastSeenAt",
					data: JSON.stringify(new Date().toUTCString()),
				});
				// updateLastSeen({
				// 	userUid: authUser.userUid,
				// 	roomUid: data.roomUid,
				// });

				socket
					.to(data.roomUid)
					.emit("onNewMessageReceived", messageCreateInput);
			});

			socket.on("disconnect", () => {
				console.log("User disconnected");
			});
		} catch (exp: any) {
			console.log(exp.toString());
		}
	});

	await server.start();

	console.log(
		`${process.env.SERVICE_NAME?.toUpperCase()} Server running at : ${
			server.info.uri
		}`
	);
};

export default StartServer;
