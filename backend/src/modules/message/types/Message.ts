export type File = {
	url: string;
	orginalFileName: string;
	generatedFileName: string;
	fileType: string;
};

type Message = {
	uid: string;
	roomUid: string;
	senderUid: string;
	text: string;
	files: File[];
	replies: [
		{
			text: string;
			files: File[];
		}
	];
	isDeleted: boolean;
};

export default Message;
