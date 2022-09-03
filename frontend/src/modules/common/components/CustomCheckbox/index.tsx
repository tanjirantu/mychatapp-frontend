import React, { ReactChild } from 'react';
import styles from './CustomCheckbox.module.scss';
interface CustomCheckboxProps {
    className?: string;
    checked: boolean;
    label: string;
    price: number;
    initialQuantity: number;
    onClick: (key: boolean) => void | undefined;
    onQuantityChange: (key: number) => void | undefined;
    hasMultipleQuantity?: boolean;
    tooltip?: ReactChild;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    className,
    checked = false,
    label,
    price,
    initialQuantity,
    onClick,
    onQuantityChange,
    hasMultipleQuantity,
    tooltip,
}) => {
    return (
        <div
            className={`${className} gap-3 select-none flex cursor-pointer  rounded  ${styles.container} ${
                checked ? styles.checked_container : ''
            }`}
        >
            <div onClick={() => onClick(checked)}>
                <div className={`${styles.checked} relative rounded`}></div>
            </div>
            <div className="w-full flex flex-col justify-between">
                <h3>{label}</h3>
                {!!hasMultipleQuantity && !!initialQuantity && !!checked ? (
                    <div className="flex">
                        <button
                            onClick={() => {
                                initialQuantity > 1
                                    ? onQuantityChange(--initialQuantity)
                                    : onQuantityChange(initialQuantity);
                            }}
                            className={`w-6 cursor-pointer h-5 rounded-l text-white bg-dh-green-700 flex items-center justify-center `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <div
                            className={`text-white w-6 h-5 bg-dh-green-700 flex border-r border-l border-gray-500 justify-center items-center ${styles.initialQuantity}`}
                        >
                            {initialQuantity}
                        </div>
                        <button
                            onClick={() => onQuantityChange(++initialQuantity)}
                            className={`w-6 cursor-pointer h-5 rounded-r bg-dh-green-700 text-white flex items-center justify-center `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={'h-4 w-4'}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </button>
                    </div>
                ) : null}
                <div className="flex justify-between mt-1.5">
                    <h4 className="mt-0.5 mb-1 font-semibold">${price}</h4>
                    <div className={`inline ml-2 relative whitespace-normal   ${styles.info_icon}`}>
                        <svg
                            className={` inline fill-current opacity-80`}
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
                        {tooltip ? (
                            <div className={`absolute hidden z-50  p-5 rounded bg-white  ${styles.info}`}>
                                <div className="relative">
                                    <div className="h-5 w-5 rounded   -top-6 transform rotate-45 bg-white absolute"></div>
                                </div>
                                {tooltip}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

CustomCheckbox.defaultProps = {
    className: '',
};

export default CustomCheckbox;
