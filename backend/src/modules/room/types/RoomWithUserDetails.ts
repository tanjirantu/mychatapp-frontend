type RoomWithUserDetails = {
	uid: string;
	label: string;
	users: [
		{
			uid: string;
			meta?: {
				firstName: string;
				lastName: string;
			};
			contact: {
				phone: string;
				dialCode: string;
				phoneWithDialCode: string;
			};
		}
	];
	createdAt: string;
	updatedAt: string;
};

export default RoomWithUserDetails;
