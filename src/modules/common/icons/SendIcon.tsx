import React from 'react';

const SendIcon = ({ className = '', fill = '#01896a' }) => {
    return (
        <svg
            className={className}
            data-name="Iconly/Bold/Send"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
        >
            <path
                data-name="Send"
                d="M21.379.64a2.126 2.126 0 0 0-2.124-.553L1.549 5.235A2.111 2.111 0 0 0 .027 6.909a2.479 2.479 0 0 0 1.1 2.313l5.536 3.4a1.435 1.435 0 0 0 1.771-.213l6.34-6.379a.807.807 0 0 1 1.166 0 .839.839 0 0 1 0 1.174l-6.351 6.38a1.456 1.456 0 0 0-.212 1.781l3.383 5.592A2.1 2.1 0 0 0 14.589 22a2.287 2.287 0 0 0 .275-.011 2.144 2.144 0 0 0 1.794-1.528l5.249-17.684A2.161 2.161 0 0 0 21.379.64"
                style={{ fill: fill }}
            />
        </svg>
    );
};

export default SendIcon;
