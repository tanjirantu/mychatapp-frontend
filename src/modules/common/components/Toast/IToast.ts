export interface IToast {
    type: 'error' | 'success' | 'info';
    message: string;
    title: string;
}
