export type CheckableList = {
    label: string;
    checked: boolean;
};

export type Item = {
    label: string;
    type: string;
    checkableList: CheckableList[];
};

export interface ICheckboxFilter {
    items: Item[];
    onChange: (items: Item[]) => void;
    onSubmit: (filter: any) => void;
}
