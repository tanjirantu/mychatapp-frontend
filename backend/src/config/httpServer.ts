export default {
	hostname: process.env.HTTP_HOSTNAME || "localhost",
	port: process.env.HTTP_PORT || 3001,
	cors:
		process.env.HTTP_CORS === "true" ? true : process.env.HAPI_CORS || true,
};
