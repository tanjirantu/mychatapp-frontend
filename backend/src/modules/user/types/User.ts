type User = {
	uid: string;
	deviceUuid: string;
	meta: {
		firstName: string;
		lastName: string;
		logo: {
			url: string;
			name: string;
		};
	};
	contact: {
		countryCode: string;
		phone: string;
		isPhoneNumberVerified: boolean;
	};
	lastLoginTime?: Date;
	isLoggedIn?: boolean;
	isActive: boolean;
	isDeleted: boolean;
};

export default User;
