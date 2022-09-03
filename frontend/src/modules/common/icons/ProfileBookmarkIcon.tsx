import React from 'react';

const ProfileBookmarkIcon = ({ fill = '#ff5b43', className = '' }) => {
    return (
        <svg
            className={className}
            data-name="Iconly/Bold/Bookmark"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                data-name="Bookmark"
                d="M14.986 20a1.026 1.026 0 0 1-.515-.141L7.99 16.62 1.5 19.86a1.069 1.069 0 0 1-.491.13A1.016 1.016 0 0 1 0 18.97V3.79A3.316 3.316 0 0 1 1.437.875 6.154 6.154 0 0 1 4.9 0h6.17a6.181 6.181 0 0 1 3.47.875A3.362 3.362 0 0 1 16 3.79v15.18a1.022 1.022 0 0 1-.74.99.933.933 0 0 1-.274.04zM4.22 6.04a.79.79 0 0 0 0 1.58h7.53a.79.79 0 0 0 0-1.58z"
                transform="translate(4 2)"
                style={{ fill }}
            />
        </svg>
    );
};

export default ProfileBookmarkIcon;
