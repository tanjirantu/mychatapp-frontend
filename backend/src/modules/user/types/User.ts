type User = {
	uid: string;
	otpResetToken: string;
	otpResetExpires: Date;
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
