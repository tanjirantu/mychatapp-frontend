type Room = {
	uid: string;
	label: string;
	users: [
		{
			uid: string;
			firstName: string;
			lastName: string;
			logo: {
				url: string;
				name: string;
			};
			contact: {
				phone: string;
				dialCode: string;
				phoneWithDialCode: string;
			};
		}
	];
	isDeleted: boolean;
};

export default Room;
