import { Request, ResponseToolkit } from "@hapi/hapi";
import { sendResponse, sendErrorResponse } from "../../../helper";
import { v1 as uuidv1 } from 'uuid';

export default async (request: Request, h: ResponseToolkit) => {
	try {
		return h.response(sendResponse({ deviceUuid: uuidv1() }, 200, "SUCCESS")).code(200);
	} catch (exp: any) {
		return h.response({ statusCode: 500, message: "ERROR", error: exp.toString() }).code(500);
	}
};
