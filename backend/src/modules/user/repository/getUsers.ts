import { Request, ResponseToolkit } from "@hapi/hapi";
import UserModel from "../model";
import { flattenObject, sendResponse } from "../../../helper";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const skip = request.query?.skip ? request.query.skip : 0;
		const limit = request.query?.limit ? request.query.limit : 10;
		const authUser: any = request.auth.credentials;

		let findQuery = flattenObject({
			isDeleted: false,
		});

		findQuery["uid"] = { $ne: authUser.userUid };

		if (request.query.search) {
			findQuery = {};
			findQuery = {
				$or: [
					{
						isDeleted: false,
						uid: { $ne: authUser.userUid },
						"contact.phoneWithDialCode": new RegExp(
							request.query.search
						),
					},
					{
						isDeleted: false,
						uid: { $ne: authUser.userUid },
						firstName: new RegExp(request.query.search, "i"),
					},
					{
						isDeleted: false,
						uid: { $ne: authUser.userUid },
						lastName: new RegExp(request.query.search, "i"),
					},
				],
			};
			// findQuery["contact.phoneWithDialCode"] = new RegExp(
			// 	request.query.search
			// );
			// findQuery["firstName"] = new RegExp(request.query.search, "i");
			// findQuery["lastName"] = new RegExp(request.query.search, "i");
		}

		const users = await UserModel.find(findQuery)
			.sort({ _id: -1 })
			.skip(skip)
			.limit(limit);
		const count = await UserModel.countDocuments(findQuery);

		return h
			.response(sendResponse({ users, count }, 200, "SUCCESS"))
			.code(200);
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
