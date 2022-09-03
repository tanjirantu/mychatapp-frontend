import Joi from "joi";

const getRoomByUid = {
	params: {
		uid: Joi.string(),
	},
};

const createRoom = {
	payload: {
		label: Joi.string(),
		users: Joi.array().items(Joi.string()).min(1).required(),
	},
};

export default {
	createRoom,
	getRoomByUid,
};
