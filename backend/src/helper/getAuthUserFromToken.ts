import { DecodedAuthToken } from "../shared/types/DecodedAuthToken";
import jwt_decode from "jwt-decode";

const getAuthUserFromToken = (authToken: string) => {
	const decoded: DecodedAuthToken = jwt_decode(authToken);
	return decoded.data;
};

export default getAuthUserFromToken;
