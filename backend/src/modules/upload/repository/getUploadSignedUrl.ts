import { Request, ResponseToolkit } from "@hapi/hapi";
import { sendResponse } from "../../../helper";
import aws from "aws-sdk";

import { v4 as uuid } from "uuid";
import util from "util";

export default async (request: Request, h: ResponseToolkit) => {
	try {
		const response = {
			url: "",
			name: "",
			isDefault: false,
		};
		const isPrivate = request.query.isPrivate || false;

		const ext = request.query.ext || "empty";
		console.info("request.query-->", util.inspect(request.query, false, null));

		let contentType = "image/jpeg";
		if (ext === "jpg") contentType = "image/jpeg";
		else if (ext === "png") contentType = "image/png";
		else if (ext === "pdf") contentType = "application/pdf";
		else if (ext === "doc") contentType = "application/msword";
		else if (ext === "docx")
			contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		else if (ext === "ppt") contentType = "application/vnd.ms-powerpoint";
		else if (ext === "xlsx") contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		else if (ext === "mp4") contentType = "video/mp4";

		aws.config.update({
			secretAccessKey: process.env.S3_ACCESS_SECRET,
			accessKeyId: process.env.S3_ACCESS_KEY,
			region: process.env.S3_REGION,
		});

		// Decent bucket name
		const bucketName = process.env.S3_BUCKETNAME;

		// Initiating S3 instance
		const s3 = new aws.S3({
			apiVersion: "2006-03-01",
		});

		// Get signed URL from S3
		const Key: string = `${uuid()}.${ext}`;
		const expireTimeInSeconds = process.env.S3_SIGNED_URL_EXIRE_IN_SECONDS || "600";

		const s3Params: any = {
			Bucket: bucketName,
			Key,
			Expires: parseInt(expireTimeInSeconds),
			ContentType: contentType,
		};

		if (!isPrivate) s3Params["ACL"] = "public-read";

		const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);
		console.info(util.inspect(uploadURL, false, null));
		response.url = uploadURL;
		response.name = Key;

		return h.response(sendResponse(response, 200, "SUCCESS")).code(200);
	} catch (exp: any) {
		return h.response({ statusCode: 500, message: "ERROR", error: exp.toString() }).code(500);
	}
};
