import React from 'react';

const CrossIcon = ({ className = 'text-gray-400 hover:text-dh-red-500 h-6 w-6' }) => {
    return (
        <svg
            className={`${className} fill-current cursor-pointer`}
            xmlns="http://www.w3.org/2000/svg"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2px"
        >
            <g id="Group_4900" data-name="Group 4900" transform="translate(-317.292 -206.292)">
                <g
                    id="Ellipse_44"
                    data-name="Ellipse 44"
                    transform="translate(320.292 209.292)"
                    strokeLinecap="round"
                    // fill="#b9b9be"
                    strokeWidth="3px"
                >
                    <circle cx="10" cy="10" r="10" />
                    <circle cx="10" cy="10" r="11.5" />
                </g>
                <g id="Group_35" data-name="Group 35" transform="rotate(45 -92.38 505.37)">
                    <path
                        id="Line_201"
                        data-name="Line 201"
                        strokeLinecap="round"
                        fill="none"
                        strokeLinejoin="round"
                        strokeWidth="2px"
                        transform="translate(4.208)"
                        d="M0 0v8.416"
                    />
                    <path
                        id="Line_202"
                        data-name="Line 202"
                        className="cls-2"
                        transform="translate(0 4.208)"
                        d="M0 0h8.416"
                    />
                </g>
            </g>
        </svg>
    );
};

export default CrossIcon;
