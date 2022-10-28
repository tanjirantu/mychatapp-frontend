import React from 'react';

interface IFileUploadInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactChild;
    multiple?: boolean;
    accept?: string;
}

const FileUploadInput: React.FC<IFileUploadInputProps> = ({ onChange, children, multiple = true, accept }) => {
    return (
        <div className="relative overflow-hidden inline-block cursor-pointer">
            <input
                key={Math.floor(Math.random() * 100 + 1)}
                multiple={multiple}
                type="file"
                className={' inset-0 opacity-0 z-50   absolute '}
                onChange={onChange}
                accept={accept && accept}
            />
            {children}
        </div>
    );
};

export default FileUploadInput;
