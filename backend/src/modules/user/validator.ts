import Joi from "joi";

const createUserPayload = {
	password: Joi.string().required(),
	meta: {
		firstName: Joi.string(),
		lastName: Joi.string(),
		companyName: Joi.string().required(),
		logo: {
			url: Joi.string(),
			name: Joi.string(),
		},
	},
	contact: Joi.object({
		phone: Joi.string().required(),
		dialCode: Joi.string().required(),
	}),
};

const updateUserPayload = {
	password: Joi.string(),
	meta: Joi.object({
		firstName: Joi.string(),
		lastName: Joi.string(),
		companyName: Joi.string(),
		logo: {
			url: Joi.string(),
			name: Joi.string(),
		},
	}),
	contact: Joi.object({
		phone: Joi.string().required(),
		dialCode: Joi.string().required(),
	}),
};

const getUsers = {
	query: {
		uid: Joi.string(),
		phone: Joi.string(),
		startDate: Joi.date(),
		endDate: Joi.date(),
		skip: Joi.number(),
		limit: Joi.number(),
	},
};

const getUserByUid = {
	params: {
		uid: Joi.string().regex(/^[-a-zA-Z0-9]{0,12}$/),
	},
};

const signUpUser = {
	payload: {
		otp: Joi.string(),
		deviceUuid: Joi.string(),
		firstName: Joi.string(),
		lastName: Joi.string(),
		phone: Joi.string(),
		dialCode: Joi.string(),
	},
};

const signInUser = {
	payload: {
		otp: Joi.string(),
		deviceUuid: Joi.string(),
		dialCode: Joi.string(),
		phone: Joi.string(),
	},
};

const createUser = {
	payload: {
		...createUserPayload,
	},
};

const updateUser = {
	params: {
		uid: Joi.string()
			.regex(/^[-a-zA-Z0-9]{0,12}$/)
			.required(),
	},
	payload: {
		uid: Joi.string()
			.regex(/^[-a-zA-Z0-9]{0,12}$/)
			.required(),
		...updateUserPayload,
	},
};

const remove = {
	params: {
		uid: Joi.string()
			.regex(/^[-a-zA-Z0-9]{0,12}$/)
			.required(),
	},
};

export default {
	getUsers,
	getUserByUid,
	signUpUser,
	signInUser,
	createUser,
	updateUser,
	remove,
};
