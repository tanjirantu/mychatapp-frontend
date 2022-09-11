export type File = {
	url: string;
	orginalFileName: string;
	generatedFileName: string;
	fileType: string;
};

type Message = {
	roomUid: string;
	senderUid: string;
	text: string;
	files?: File[];
	replies?: [
		{
			text: string;
			files: File[];
		}
	];
};

export default Message;
