import { ReactNode } from 'react';

export interface IKebabMenuButton {
    items: [{ label: string; value: unknown; icon?: ReactNode }];
}
