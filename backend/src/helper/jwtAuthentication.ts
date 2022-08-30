import JsonWebToken from "jsonwebtoken";
import fs from "fs";
import path from "path";

let AuthenticationConfig: any, UserAuthentication: any;

const authResponse = {
	isVerified: false,
	userUid: null,
	firstName: null,
	lastName: null,
	phoneNumberWithCountryCode: null,
	deviceUuid: null,
};

const configJWT = (
	JWTAuthenticationConfiguration: any,
	_UserAuthentication: any
) => {
	// console.log("AuthenticationConfig", authenticationConfig)
	AuthenticationConfig = JWTAuthenticationConfiguration;
	UserAuthentication = _UserAuthentication;
};

const extractToken = (tokenString: string) => {
	try {
		return tokenString ? tokenString.replace("Bearer ", "").trim() : "";
	} catch (err) {
		console.error(err);
	}
};

const checkJWT = async (token: string) => {
	try {
		//console.info('token-->', token);
		const publicKey = fs.readFileSync(
			path.join(__dirname, "../../src/config/keys/jwt-rsa.pub")
		);
		JsonWebToken.verify(token, publicKey, AuthenticationConfig.jwt.options);
		const { data }: any = JsonWebToken.decode(token, { json: true });
		//console.info('data-->', util.inspect(data, false, null));
		const {
			userUid,
			deviceUuid,
			phoneNumberWithCountryCode,
			firstName,
			lastName,
		} = data;

		let authUser = null;
		authUser = await UserAuthentication.findOne(
			{
				userUid,
				deviceUuid,
				"contact.phoneNumberWithCountryCode":
					phoneNumberWithCountryCode,
				isLoggedIn: true,
			},
			{ _id: 1, contact: 1, role: 1, name: 1 },
			{ lean: true }
		);
		if (authUser) {
			return {
				userUid,
				deviceUuid,
				firstName,
				lastName,
				phoneNumberWithCountryCode,
				privileges: null,
			};
		}
		return authResponse;
	} catch (err) {
		//console.info("TOKEN", token);
		console.error(err);
		return authResponse;
	}
};

const checkJWTRest = (params: any) => {
	try {
		let token = null;
		if (
			params.request &&
			params.request.headers.authorization &&
			params.request.headers.authorization !== "undefined"
		) {
			token = extractToken(params.request.headers.authorization);
		}
		if (!token) return authResponse;
		return checkJWT(token);
	} catch (err) {
		console.error(err);
	}
};
const checkJWTRestUsingToken = async (token: string) => {
	try {
		if (!token || token === "undefined") return authResponse;
		const extToken: any = extractToken(token);
		return checkJWT(extToken);
	} catch (err) {
		console.info(err);
	}
};

export { configJWT, checkJWTRest, checkJWTRestUsingToken };
