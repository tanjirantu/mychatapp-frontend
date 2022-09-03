import userRoutes from "../../modules/user/routes";
import otpRoutes from "../../modules/otp/routes";
import roomRoutes from "../../modules/room/routes";

export default [...userRoutes, ...otpRoutes, ...roomRoutes];
