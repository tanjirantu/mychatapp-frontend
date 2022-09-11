export type Buyer = {
    contact: {
        phone: string;
        dialCode: string;
        phoneWithDialCode: string;
        isPhoneVerified: boolean;
    };
    _id: string;
    uid: string;
    deviceUuid: string;
    firstName: string;
    lastName: string;
    lastLoginTime: string;
    isLoggedIn: boolean;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    logo?: {
        name : string,
        url : string
    }
};
