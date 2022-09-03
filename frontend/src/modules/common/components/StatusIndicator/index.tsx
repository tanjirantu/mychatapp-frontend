import React from 'react';
import styles from './StatusIndicator.module.scss';

interface IStatusIndicatorProps {
    // status: "draft" | "pending" | "processing" | "shipping" | "delivered";
    status: string;
}
const StatusIndicator: React.FC<IStatusIndicatorProps> = ({ status }) => {
    return (
        <div className={`flex ${styles.indicator} ${styles[status]}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default StatusIndicator;
