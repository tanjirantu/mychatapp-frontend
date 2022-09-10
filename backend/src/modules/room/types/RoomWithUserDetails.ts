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
	lastSeenAt?: Date;
	lastMessage?: string;
	newMessageCount?: number;
	createdAt: string;
	updatedAt: string;
};

export default RoomWithUserDetails;
