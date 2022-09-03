export interface IAddressCard {
    checked: boolean;
    index: number;
    uid: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    onClick: (uid: string) => void;
    onEdit: (uid: string) => void;
    onDelete: (uid: string) => void;
}
