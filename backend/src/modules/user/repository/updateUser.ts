import { Request, ResponseToolkit } from "@hapi/hapi";
import BuyerModel from "../model";
import { User } from "../types";
import {
	sendResponse,
	sendErrorResponse,
	flattenObject,
} from "../../../helper";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const payload: User = request.payload as User;
		let uid: string = request.params.uid;

		const updatedPayload = flattenObject(payload);
		const buyer = await BuyerModel.findOneAndUpdate(
			{ uid, isDeleted: false },
			{
				$set: updatedPayload,
			},
			{ new: true }
		);
		if (!buyer)
			return h.response(sendErrorResponse("DATA_NOT_FOUND")).code(200);
		if (payload.isActive === false || payload.isActive)
			return h.response(sendResponse(buyer, 204, "UPDATED")).code(200);
	} catch (exp: any) {
		return h
			.response({
				statusCode: 500,
				message: "ERROR",
				error: exp.toString(),
			})
			.code(500);
	}
};
