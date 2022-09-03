import React from 'react';

interface ISkeleton {
    width?: number;
    height?: number;
    rounded?: boolean;
    className?: string;
}

const Skeleton: React.FC<ISkeleton> = ({ width, height, rounded, className = '' }) => {
    return (
        <div
            style={{
                height: height ? height + 'px' : '100%',
                width: width ? width + 'px' : '100%',
                borderRadius: rounded ? '100%' : '',
            }}
            className={`bg-dh-gray-200 ${className}`}
        ></div>
    );
};

export default Skeleton;
