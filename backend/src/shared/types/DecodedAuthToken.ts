export type AuthUser = {
	userUid: string;
	deviceUuid: string;
	firstName: string;
	lastName: string;
	logo: {
		url: string;
		originalFileName: string;
		generatedFileName: string;
	};
	contact: {
		phone: string;
		dialCode: string;
	};
};

export type DecodedAuthToken = {
	data: AuthUser;
};
