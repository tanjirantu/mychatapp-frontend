import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';
import { ClipLoader } from 'react-spinners';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    uppercase?: boolean;
    className?: string;
    rounded?: boolean;
    color?: 'primary' | 'secondary' | 'gray' | 'lightGrey' | 'secondaryGreen';
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
    children,
    startIcon,
    endIcon,
    rounded,
    fullWidth,
    uppercase,
    className,
    color,
    size,
    loading,
    disabled,
    ...rest
}) => {
    return (
        <button
            disabled={disabled}
            className={classNames(
                styles.button,
                {
                    [styles.sm]: size === 'sm',
                    [styles.md]: size === 'md',
                    [styles.lg]: size === 'lg',
                    [styles.rounded]: rounded === true,
                    uppercase: uppercase,
                    'w-full': fullWidth,
                    [styles.primary]: color === 'primary',
                    [styles.secondaryGreen]: color === 'secondaryGreen',
                    [styles.secondary]: color === 'secondary',
                    [styles.gray]: color === 'gray',
                    [styles.lightGrey]: color === 'lightGrey',
                },
                className
            )}
            {...rest}
        >
            {startIcon}
            {loading && <ClipLoader color="#fff" size={20} />}
            <div className="px-2 inline-block">{children}</div>
            {endIcon}
        </button>
    );
};

Button.defaultProps = {
    fullWidth: false,
    uppercase: false,
    className: '',
    color: 'primary',
    size: 'md',
    rounded: false,
};

export default Button;
