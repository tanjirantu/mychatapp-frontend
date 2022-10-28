import React, { HTMLAttributes } from 'react';

interface IPlusIcon extends HTMLAttributes<HTMLOrSVGElement> {
    className: string;
}

const PlusIcon: React.FC<IPlusIcon> = ({ className, ...rest }) => {
    return (
        <svg {...rest} xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export default PlusIcon;
