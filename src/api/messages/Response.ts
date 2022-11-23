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
    label : string
    uid: string;
    users: Friend[];
};
