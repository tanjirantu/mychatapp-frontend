type Address = {
    uid: string;
    city: string;
    country: string;
    email: string;
    phoneNumber: string;
    recipientName: string;
    state: string;
    street: string;
    zipCode: string;
};
export interface IUser {
    companyName: string;
    addresses: Array<Address>;
    deviceUuid: string;
    email: string;
    loginType: string;
    name?: string;
    userRole: string;
    userType: string;
    userUid: string;
}

export interface IToken {
    data: IUser;
}
