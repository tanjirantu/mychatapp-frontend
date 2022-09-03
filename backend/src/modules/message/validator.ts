import Joi from "joi";

const getMessages = {
	params: {
		text: Joi.string(),
	},
	query: {
		roomUid: Joi.string(),
	},
};

export default {
	getMessages,
};
