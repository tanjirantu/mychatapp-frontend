import React from 'react';

const LocationIcon = ({ fill = '#fff', className = '' }) => {
    return (
        <svg
            className={className}
            data-name="Iconly/Bold/Location"
            xmlns="http://www.w3.org/2000/svg"
            width="13.883"
            height="16.333"
            viewBox="0 0 13.883 16.333"
        >
            <path
                data-name="Location"
                d="M6.945 16.333a1.109 1.109 0 0 1-.6-.2 17.569 17.569 0 0 1-4.525-4.2A8.481 8.481 0 0 1 0 6.793a6.671 6.671 0 0 1 2.044-4.805A6.966 6.966 0 0 1 6.936 0a6.879 6.879 0 0 1 6.947 6.793 8.485 8.485 0 0 1-1.821 5.14 17.9 17.9 0 0 1-4.525 4.2 1.078 1.078 0 0 1-.592.2zM6.936 4.718A2.289 2.289 0 0 0 4.65 7a2.214 2.214 0 0 0 .671 1.6A2.306 2.306 0 0 0 9.233 7a2.307 2.307 0 0 0-2.3-2.287z"
                style={{ fill: fill }}
            />
        </svg>
    );
};

export default LocationIcon;
