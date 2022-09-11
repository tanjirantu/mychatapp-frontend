export type UserResponse = {
    uid: string;
    lastName: string;
    firstName: string;
    logo: string;
    contact: {
        phone: string;
        dialCode: string;
        phoneWithDialCode: string;
        isPhoneVerified: boolean;
    };
};
