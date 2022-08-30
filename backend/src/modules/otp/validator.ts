import Joi from "joi";

const getOneTimePassword = {
	payload: {
		countryCode: Joi.string().required(),
		phone: Joi.string().required(),
	},
};

const verifyOtp = {
	params: {
		token: Joi.string(),
	},
};

export default {
	getOneTimePassword,
	verifyOtp,
};
