import React, { useState } from 'react';
import styles from './Tab.module.scss';
const tabItems = ['Explore', 'Feeds'];
const Tab = () => {
    const [active, setActive] = useState('Explore');
    return (
        <div className={`${styles.tab} inline-flex items-center`}>
            {tabItems.map((item, key) => {
                return (
                    <div
                        onClick={() => setActive(item)}
                        key={key}
                        className={`h-full ${styles.item} ${
                            active === item ? styles.item_active : ''
                        } flex justify-center cursor-pointer items-center`}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

export default Tab;
