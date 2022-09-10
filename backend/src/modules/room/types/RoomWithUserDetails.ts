type RoomWithUserDetails = {
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
	lastSeenAt?: Date;
	lastMessage?: string;
	newMessageCount?: number;
	createdAt: string;
	updatedAt: string;
};

export default RoomWithUserDetails;
