import React, { SVGAttributes } from 'react';

interface IBookmarkIcon extends SVGAttributes<HTMLOrSVGElement> {
    fill: string;
    className: string;
}

const BookmarkIcon: React.FC<IBookmarkIcon> = ({ fill = '#b8b8be', className = '', ...rest }) => {
    return (
        <svg
            {...rest}
            className={className}
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="60px"
            height="60px"
        >
            <path d="M15,26c-0.21,0-0.42-0.066-0.597-0.198C13.938,25.456,3,17.243,3,11c0-3.859,3.141-7,7-7c2.358,0,4.062,1.272,5,2.212 C15.938,5.272,17.642,4,20,4c3.859,0,7,3.14,7,7c0,6.243-10.938,14.456-11.403,14.803C15.42,25.934,15.21,26,15,26z" />
        </svg>
    );
};

export default BookmarkIcon;
