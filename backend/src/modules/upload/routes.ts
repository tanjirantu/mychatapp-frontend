import { getUploadSignedUrl } from "./repository";

export default [
	{
		method: "GET",
		path: "/uploads/signed-url",
		options: {
			tags: ["Api", "Upload Signed Url"],
			description: "Upload Signed Url"
		},
		handler: getUploadSignedUrl,
	}
];
