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
    createdAt: string;
    uid: string;
    _id: string;

    content: {
        message: string;
        files: File[];
    };
    sender: {
        uid: string;
        meta: {
            firstName: string;
            lastName: string;
            logo: {
                url: string;
                name: string;
            };
        };
        contact: {
            phone: string;
            dialCode: string;
            phoneWithDialCode: string;
        };
    };
};
