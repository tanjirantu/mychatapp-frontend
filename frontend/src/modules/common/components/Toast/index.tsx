import React from 'react';
import styles from './Toast.module.scss';
import { IToast } from './IToast';

const Toast: React.FC<IToast> = ({ type, message, title }) => {
    return (
        <div className={`flex rounded-lg  p-4 gap-3 ${styles[type]} ${styles.root}`}>
            <div className="flex-shrink-0">
                <img src={`/static/assets/icons/${type}-icon.svg`} alt="warning" />
            </div>

            <div>
                <h3 className={`font-bold text-lg`}>{title}</h3>
                <p className="text-base font-normal mt-2">{message}</p>
            </div>
        </div>
    );
};

export default Toast;
