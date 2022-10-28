import type { File } from './File';

export type Comment = {
    content: {
        message: string;
        files: File[];
    };
};
