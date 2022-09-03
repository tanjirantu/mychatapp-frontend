import Hapi, { ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { getDateTime, logger } from "../plugin/logger";
import routes from "../plugin/router";
// @ts-ignore
import Jwt from "hapi-auth-jwt2";
import { HttpServerConfiguration } from "../config";
import UserModel from "../modules/user/model";
import { Server } from "socket.io";

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

	// const io = require("socket.io")(server.listener);
	const io = new Server(server.listener, { cors: { origin: "*" } });
	io.on("connection", async (socket: any) => {
		try {
			const authToken = socket?.handshake?.auth?.token;
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
