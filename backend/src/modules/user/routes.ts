import {
	signUpUser,
	getUserByUid,
	getUsers,
	updateUser,
	signInUser,
	getUserProfile,
} from "./repository";

import validator from "./validator";

export default [
	{
		method: "GET",
		path: "/users",
		options: {
			auth: {
				strategy: "jwt",
			},
			tags: ["Api", "User"],
			description: "Get User By Uid",
			validate: validator.getUsers,
		},
		handler: getUsers,
	},
	{
		method: "GET",
		path: "/user/me",
		options: {
			auth: {
				strategy: "jwt",
			},
			tags: ["Api", "User"],
			description: "Get User Profile",
		},
		handler: getUserProfile,
	},
	{
		method: "GET",
		path: "/users/{uid}",
		options: {
			tags: ["Api", "User"],
			description: "Get User By Uid",
			validate: validator.getUserByUid,
		},
		handler: getUserByUid,
	},
	{
		method: "PUT",
		path: "/user/me",
		options: {
			auth: {
				strategy: "jwt",
			},
			tags: ["Api", "User Profile"],
			description: "User Profile",
			validate: validator.updateUser,
		},
		handler: updateUser,
	},
	{
		method: "POST",
		path: "/user-signup",
		options: {
			tags: ["Api", "User"],
			description: "Sign Up User",
			validate: validator.signUpUser,
		},
		handler: signUpUser,
	},
	{
		method: "POST",
		path: "/user-signin",
		options: {
			tags: ["Api", "User"],
			description: "Sign In User",
			validate: validator.signInUser,
		},
		handler: signInUser,
	},
	// {
	// 	method: "PUT",
	// 	path: "/users/{uid}",
	// 	options: {
	// 		tags: ["Api", "User"],
	// 		description: "Update User",
	// 		validate: validator.updateUser,
	// 	},
	// 	handler: updateUser,
	// },
];
