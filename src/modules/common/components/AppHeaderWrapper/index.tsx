import React from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import styles from './AppHeaderWrapper.module.scss';
import IconWrapper from './IconWrapper';
interface IAppHeaderProps {
    children: React.ReactChild;
    style?: React.CSSProperties;
    height?: number;
    className?: string;
}

const AppHeaderWrapper: React.FC<IAppHeaderProps> = ({ children, style, height, className = '' }) => {
    const { position } = useScrollPosition({ window: true });

    return (
        <header
            style={{ minHeight: `${height}px`, height: `${height}px`, zIndex: 99, ...style }}
            className={`${styles.header_wraper} ${className} transition-all bg-dh-green-700 ${
                position.top && Math.ceil(position.top) < 40 ? 'bg-opacity-90  backdrop-blur' : ''
            }`}
        >
            {children}
        </header>
    );
};

export default Object.assign(AppHeaderWrapper, { IconWrapper });
