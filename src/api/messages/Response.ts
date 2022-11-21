export type Friend = {
    uid: string;
    contact: {
        phone: string;
        dialCode: string;
        phoneWithDialCode: string;
    };
    firstName: string;
    lastName: string;
    logo?: {
        url: string;
        name: string;
    }
};

export type MeesageHead = {
    uid: string;
    users: Friend[];
};
