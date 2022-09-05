export type UserResponse = {
    uid: string;
    contact: {
        phone: string;
        dialCode: string;
        phoneWithDialCode: string;
        isPhoneVerified: boolean;
    };
};
