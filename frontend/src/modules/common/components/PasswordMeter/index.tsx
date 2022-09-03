import React from 'react';
import styles from './PasswordMeter.module.scss';
interface IPasswordMeterProps {
    passwordStatus: string;
}
const PasswordMeter: React.FC<IPasswordMeterProps> = ({ passwordStatus = '=' }) => {
    return (
        <div className={`${styles.password_meter}`}>
            <div className={styles[passwordStatus]}></div>
            <div className={styles[passwordStatus]}></div>
            <div className={styles[passwordStatus]}></div>
            <div className={styles[passwordStatus]}></div>
        </div>
    );
};

export default PasswordMeter;
