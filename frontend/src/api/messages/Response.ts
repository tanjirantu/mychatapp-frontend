export type Friend = {
    uid: string;
    contact: {
        phone: string;
        dialCode: string;
        phoneWithDialCode: string;
    };
    firstName: string;
    lastName: string;
};

export type MeesageHead = {
    uid: string;
    users: Friend[];
};
