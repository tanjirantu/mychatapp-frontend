import React, { ReactNode } from 'react';

interface IChipProps {
    name: string;
    icon: ReactNode;
    onClick?: () => void;
    iconClassName?: string;
    className?: string;
    labelClassName?: string;
}

const Chip: React.FC<IChipProps> = ({ name, icon, onClick, iconClassName, className, labelClassName }) => {
    return (
        <div className={`${className} flex cursor-pointer overflow-hidden  `} onClick={onClick}>
            <span className={labelClassName}>{name}</span>
            <div className={iconClassName}>{icon}</div>
        </div>
    );
};

Chip.defaultProps = {
    className: '',
    iconClassName: '',
    labelClassName: '',
};
export default Chip;
