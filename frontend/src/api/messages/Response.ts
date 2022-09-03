export type Friend = {
    _id: string;
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

export type MeesageHead = {
    _id: string;
    uid: string;
    me: {
        uid: string;
        meta: {
            firstName: string;
            lastName: string;
            logo: {
                url: string;
                name: string;
            };
        };
    };
    seenAt?: null | string;
    lastMessage?: {
        text: string;
        files: File[] | [];
        room: {
            uid: string;
            label: string;
        };
    };
    friends: Friend[];
    createdAt: string;
    updatedAt: string;
};
