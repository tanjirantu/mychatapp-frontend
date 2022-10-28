import React from 'react';
import AppHeaderWrapper from '../AppHeaderWrapper';
import styles from './NotificationDropdown.module.scss';
import Button from '../../components/Button';
import Dropdown from '../Dropdown';
import NotificationIcon from '../../icons/NotificationIcon';

const NotificationDropdown = () => {
    return (
        <Dropdown className={`relative ${styles.notification}`}>
            <Dropdown.Menu>
                {({ toggle, open }) => (
                    <div className="cursor-pointer select-none" onClick={() => toggle(!open)}>
                        <AppHeaderWrapper.IconWrapper
                            className="transition-all duration-150"
                            backgroundColor={open ? 'white' : 'rgb(0,116,90)'}
                        >
                            <NotificationIcon fill={open ? 'rgb(0,116,90)' : 'white'} />
                        </AppHeaderWrapper.IconWrapper>
                    </div>
                )}
            </Dropdown.Menu>
            <Dropdown.Item>
                {() => (
                    <div className={`absolute z-50 bg-white right-0 rounded  ${styles.dropdown}`}>
                        <div className="flex items-center justify-between mb-5">
                            <p className={`${styles.most_recent} uppercase`}>Most Recent</p>
                            <span className="text-dh-red-500">See All</span>
                        </div>
                        <div className={`${styles.notification_list} flex mb-7`}>
                            <div className={`${styles.icon} flex-shrink-0 rounded-full bg-dh-green-700`}></div>
                            <div className={styles.notification_body}>
                                <h6>
                                    <span className="font-semibold">Superfine Fashion Ltd.</span> send you a new message
                                    with attachment
                                </h6>
                                <p className="text-dh-green-700">18 minunites ago</p>
                            </div>
                        </div>
                        <div className={`${styles.notification_list} flex mb-7`}>
                            <div className={`${styles.icon} flex-shrink-0 rounded-full bg-dh-green-700`}></div>
                            <div className={styles.notification_body}>
                                <h6>
                                    <span className="font-semibold">Superfine Fashion Ltd.</span> send you a new message
                                    with attachment
                                </h6>
                                <p className="text-dh-green-700">18 minunites ago</p>
                            </div>
                        </div>
                        <div className={`${styles.notification_list} flex mb-7`}>
                            <div className={`${styles.icon} flex-shrink-0 rounded-full bg-dh-green-700`}></div>
                            <div className={styles.notification_body}>
                                <h6>
                                    <span className="font-semibold">Superfine Fashion Ltd.</span> send you a new message
                                    with attachment
                                </h6>
                                <p className="text-dh-green-700">18 minunites ago</p>
                            </div>
                        </div>
                        <div className={`${styles.notification_list} flex mb-7`}>
                            <div className={`${styles.icon} flex-shrink-0 rounded-full bg-dh-green-700`}></div>
                            <div className={styles.notification_body}>
                                <h6>
                                    <span className="font-semibold">Superfine Fashion Ltd.</span> send you a new message
                                    with attachment
                                </h6>
                                <p className="text-dh-green-700">A day ago</p>
                                <div className="flex gap-1.5 mt-2.5 ">
                                    <Button size="sm" color="primary">
                                        Accept
                                    </Button>
                                    <Button size="sm" color="lightGrey">
                                        Later
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Dropdown.Item>
        </Dropdown>
    );
};

export default NotificationDropdown;
