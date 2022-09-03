import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import styles from './ActionCard.module.scss';
import Banner from './Banner';

interface IActionCard {
    className?: string;
    icon: string;
    title: string | ReactElement;
    backgroundColor: string;
    titleClassName?: string;
    infoBox?: ReactElement;
    href: string;
}

const ActionCard: React.FC<IActionCard> = ({
    className,
    icon,
    title,
    titleClassName,
    backgroundColor,
    infoBox,
    href,
}) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(href)}
            style={{ backgroundColor: backgroundColor }}
            className={`${className} py-5 px-4 rounded relative flex flex-col justify-between cursor-pointer ${styles.action_card} `}
        >
            <div className="flex justify-between">
                <div className="w-16 h-16 flex items-center justify-center  rounded-full">
                    <img alt="" src={icon} />
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 opacity-40 ${titleClassName}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <h2 className={`${titleClassName} w-full font-semibold whitespace-nowrap`}>
                <span>{title}</span>
                <div className={`inline ml-2 relative whitespace-normal   ${styles.info_icon}`}>
                    <svg
                        className={`${titleClassName} inline fill-current opacity-80`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15.002"
                        viewBox="0 0 15 15.002"
                    >
                        <g data-name="Group 5987">
                            <path
                                data-name="Subtraction 4"
                                d="M10503.85 4741.7a7.5 7.5 0 1 1 7.5-7.5 7.508 7.508 0 0 1-7.5 7.5zm-1.628-4.973v1.464h3.408v-1.464h-.73v-4.387h-2.678v1.461h.729v2.925zm1.631-7.133a.976.976 0 1 0 .976.976.976.976 0 0 0-.976-.97z"
                                transform="translate(-10496.35 -4726.701)"
                            />
                        </g>
                    </svg>
                    {infoBox ? (
                        <div className={`absolute hidden z-50  p-5 rounded bg-white  ${styles.info}`}>
                            <div className="relative">
                                <div className="h-5 w-5 rounded   -top-6 transform rotate-45 bg-white absolute"></div>
                            </div>
                            {infoBox}
                        </div>
                    ) : null}
                </div>
            </h2>
        </div>
    );
};

ActionCard.defaultProps = {
    className: '',
    titleClassName: 'text-white',
};

export default Object.assign(ActionCard, { Banner });
