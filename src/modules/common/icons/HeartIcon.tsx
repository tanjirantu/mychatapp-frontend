import React, { SVGAttributes } from 'react';

interface IHeartIcon extends SVGAttributes<HTMLOrSVGElement> {
    fill?: string;
    className?: string;
    stroke?: string;
}

const HeartIcon: React.FC<IHeartIcon> = ({ fill = 'none', stroke = '#63636a', className = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20.235"
            height="19.242"
            viewBox="0 0 20.235 19.242"
            className={className}
        >
            <g data-name="Iconly/Light/Heart">
                <path
                    data-name="Stroke 1"
                    d="M.372 8.6C-.7 5.248.553 1.419 4.07.286A6.007 6.007 0 0 1 9.5 1.2a6.052 6.052 0 0 1 5.42-.914c3.517 1.133 4.78 4.962 3.707 8.314C16.957 13.908 9.5 18 9.5 18S2.1 13.97.372 8.6z"
                    transform="translate(.619 .643)"
                    style={{
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeMiterlimit: 10,
                        strokeWidth: '1.2px',
                        fill: fill,
                        stroke: stroke,
                    }}
                />
                <path
                    data-name="Stroke 3"
                    d="M0 0a2.781 2.781 0 0 1 1.917 2.422"
                    transform="translate(14.119 4.343)"
                    style={{
                        fill: 'none',
                        stroke: '#fff',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeMiterlimit: 10,
                        strokeWidth: '1.2px',
                    }}
                />
            </g>
        </svg>
    );
};

export default HeartIcon;
