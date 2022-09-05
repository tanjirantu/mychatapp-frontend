export type Buyer = {
    uid: `USR-${string}`;
    meta: {
        companyName: string;
        firstName: string;
        lastName: string;
        companyShortDesc: string;
        logo: {
            url: string;
            name: string;
        };
    };
    contact: {
        countryCode: string;
        phone: string;
        isPhoneNumberVerified: boolean;
        email: string;
        secondaryEmail: string;
    };
    userType: string;
    profileCompletion: number;
    addresses: [
        {
            uid: string;
            street: string;
            city: string;
            state: string;
            country: string;
            countryShortName: string;
            zipCode: string;
            lat: number;
            lng: number;
            type: string;
        }
    ];
    productGroups: [
        {
            uid: string;
            name: string;
        }
    ];
    segmentGroups: [
        {
            uid: string;
            name: string;
        }
    ];
    targetGroups: [
        {
            uid: string;
            name: string;
        }
    ];
    bookmark: {
        manufacturers: [
            {
                uid: string;
                meta: {
                    companyLegalName: string;
                    companyShortDesc: string;
                    logo: { url: string; name: string };
                    banners: [{ url: string; name: string }];
                };
            }
        ]; // Todo: need to check
    };
    createdAt: string;
    updatedAt: string;
};
