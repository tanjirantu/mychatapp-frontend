import Joi from "joi";

const getMessages = {
	params: {
		roomUid: Joi.string(),
	},
	query: {
		text: Joi.string(),
		skip: Joi.string(),
		limit: Joi.string(),
	},
};

export default {
	getMessages,
};
