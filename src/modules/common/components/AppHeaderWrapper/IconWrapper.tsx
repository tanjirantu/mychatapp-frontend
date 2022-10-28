import React, { Fragment, HTMLAttributes } from 'react';

interface IIconWraperProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactChild;
    className?: string;
    height?: number;
    width?: number;
    backgroundColor?: string;
}

const IconWrapper: React.FC<IIconWraperProps> = ({
    children,
    height = 42,
    width = 42,
    className = '',

    backgroundColor = 'rgb(0,116,90)',
    ...rest
}) => {
    return (
        <div
            {...rest}
            style={{ height, width, backgroundColor }}
            className={` cursor-pointer bg-dh-green-800 rounded-full relative flex items-center justify-center ${className}`}
        >
            <div
                className="absolute h-5 rounded-full text-center font-medium text-sm text-white flex justify-center px-0.5 items-center "
                style={{ minWidth: '20px', background: '#ac0000', top: '-5px', right: '-5px' }}
            >
                3
            </div>
            <Fragment>{children}</Fragment>
        </div>
    );
};

export default IconWrapper;
