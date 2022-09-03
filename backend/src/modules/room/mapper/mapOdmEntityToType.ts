import { RoomWithUserDetails } from "../types";

const mapOdmEntityToType = (room: RoomWithUserDetails) => {
	return {
		uid: room.uid,
		label: room?.label,
		users: room.users.map((user) => ({
			uid: user.uid,
			meta: user?.meta,
			contact: {
				phone: user.contact.phone,
				dialCode: user.contact.dialCode,
				phoneWithDialCode: user.contact.phoneWithDialCode,
			},
		})),
	};
};

export default mapOdmEntityToType;
