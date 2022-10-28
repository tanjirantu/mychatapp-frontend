import React from 'react';

const ApproveIcon = ({ fill = '#ffff', className = '' }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g data-name="Iconly/Bold/Tick Square">
                <path
                    data-name="Tick Square"
                    d="M11.472 16H4.536A4.387 4.387 0 0 1 0 11.273V4.736A4.392 4.392 0 0 1 4.536 0h6.936A4.388 4.388 0 0 1 16 4.736v6.537A4.384 4.384 0 0 1 11.472 16zm-6.32-8.7a.7.7 0 0 0-.5 1.2l1.9 1.9a.705.705 0 0 0 .984 0l3.8-3.8a.7.7 0 0 0-.992-.992l-3.3 3.3-1.4-1.4a.7.7 0 0 0-.492-.208z"
                    style={{ fill: fill }}
                />
            </g>
        </svg>
    );
};

export default ApproveIcon;
