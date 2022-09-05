export type Friend = {
    uid: string;
    contact: {
        phone: string;
        dialCode: string;
        phoneWithDialCode: string;
    };
};

export type MeesageHead = {
    uid: string;
    users: Friend[];
};
