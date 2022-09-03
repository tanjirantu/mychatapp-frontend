export type File = {
	url: string;
	orginalFileName: string;
	generatedFileName: string;
};

type Message = {
	uid: string;
	senderUid: string;
	receiverUid: string;
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
