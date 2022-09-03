import userRoutes from "../../modules/user/routes";
import otpRoutes from "../../modules/otp/routes";
import roomRoutes from "../../modules/room/routes";
import messageRoutes from "../../modules/message/routes";
import uploadRoutes from "../../modules/upload/routes";

export default [
	...userRoutes,
	...otpRoutes,
	...roomRoutes,
	...messageRoutes,
	...uploadRoutes,
];
