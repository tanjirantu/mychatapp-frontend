import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";

const key = fs.readFileSync(
	path.join(__dirname, "../../src/config/keys/jwt-rsa")
);

type AuthUser = {
	userUid: string;
	deviceUuid: string;
	phoneWithDialCode: string;
};

export default async (authUser: AuthUser) => {
	try {
		const tokenData = {
			deviceUuid: authUser.deviceUuid,
			userUid: authUser.userUid,
			phoneWithDialCode: authUser.phoneWithDialCode,
		};

		const expireIndays: string =
			process.env.AUTH_JWT_EXPIRES_IN_DAYS || "90";
		const expiresIn: string = process.env.AUTH_JWT_EXPIRES_IN || "90d";
		const algorithm: any = process.env.AUTH_JWT_ALGORITHM || "HS256";
		const expiresAt = new Date(
			Date.now() + parseInt(expireIndays) * 24 * 60 * 60 * 1000
		).toJSON();
		const secret: string = process.env.AUTH_JWT_SECRET || "xyz";
		const token = jsonwebtoken.sign(tokenData, secret, {
			algorithm,
			expiresIn,
		});

		return { token, expiresAt };
	} catch (err) {
		console.error(err);
		throw new Error("Internal server error");
	}
};
