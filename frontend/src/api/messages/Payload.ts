export type MessageRoomPayload = {
    friend: {
        uid: string;
        userType: 'MANUFACTURER';
    };
};

export type CreateRoomPayload = {
    label: string;
    users: string[];
};

export type MessagePayload = {
    receiver: {
        uid: string;
        userType: 'MANUFACTURER';
    };

    content: {
        message: string;
    };
};

type File = {
    name: string;
    url: string;
    fileType?: string;
    originalFilename?: string;
};

export type Message = {
    uid: string;
    createdAt: string;
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
