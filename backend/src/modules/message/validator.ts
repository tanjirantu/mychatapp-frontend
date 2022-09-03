import Joi from "joi";

const getMessages = {
	params: {
		roomUid: Joi.string(),
	},
	query: {
		text: Joi.string(),
	},
};

export default {
	getMessages,
};
