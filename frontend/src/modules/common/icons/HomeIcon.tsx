import React from 'react';

const HomeIcon = ({ fill = '#fff', className = '' }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14.25" height="15" viewBox="0 0 14.25 15">
            <g data-name="Iconly/Bold/Home">
                <path
                    data-name="Home"
                    d="M4.976 14.08v-2.293a1.064 1.064 0 0 1 1.068-1.06H8.2a1.072 1.072 0 0 1 .755.31 1.056 1.056 0 0 1 .313.75v2.293a.91.91 0 0 0 .267.65.923.923 0 0 0 .653.27h1.471a2.6 2.6 0 0 0 1.833-.749 2.557 2.557 0 0 0 .76-1.817V5.9a1.855 1.855 0 0 0-.672-1.427l-5-3.967A2.323 2.323 0 0 0 5.614.56L.725 4.474A1.855 1.855 0 0 0 0 5.9v6.527A2.583 2.583 0 0 0 2.592 15h1.437a.923.923 0 0 0 .927-.913z"
                    style={{ fill: fill }}
                />
            </g>
        </svg>
    );
};

export default HomeIcon;
