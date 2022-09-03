export type UserResponse = {
    uid: string;
    meta: {
        firstName: string;
        lastName: string;
        logo: {
            url: string;
            originalFileName: string;
            generatedFileName: string;
        };
    };
    contact: {
        dialCode: string;
        phone: string;
    };
};
