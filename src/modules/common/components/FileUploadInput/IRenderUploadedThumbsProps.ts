import React from 'react';
import type { File } from '../../types/Comment/File';

export type IRenderUploadedThumbsProps = {
    files: File[];
    onRemove: (index: number) => void;
    className?: string;
    RemoveIcon?: React.ReactChild;
    removeIconClassName?: string;
};
