import React, { useState } from 'react';
import styles from './LeftSideNav.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import isStringMatched from '../../../../helpers/utils/isStringMatched';
import { useAppDispatch } from '../../hooks';
import { actionLogoutBuyer } from '../../actions';
import { removeToken } from '../../../../libs/authClient';
import { removeUser } from '../../../../reducers/userReducer';
import CreateContactModal from '../CreateContactModal';

const LeftSideNav = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleLogoutUser = async () => {
        try {
            await actionLogoutBuyer();
            removeToken();
            dispatch(removeUser());
            window.location.replace(process.env.SIGNIN_URL as string);
        } catch (error) {}
    };
    <CreateContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
    />;

    return (
        <div
            className={`${styles.activitybar} bg-dh-gray-200 h-screen pt-5 sticky top-0 flex flex-col justify-between`}
        >
            <CreateContactModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />

            <div>
                <div className="flex flex-col items-center w-full gap-4">
                    <Link href={'/messages'}>
                        <a>
                            <img
                                className={
                                    router.pathname == '/'
                                        ? styles.active
                                        : `filter grayscale opacity-60`
                                }
                                src="/static/assets/icons/home.svg"
                                alt="home"
                                width="30px"
                                height="30px"
                            />
                        </a>
                    </Link>

                    <img
                        onClick={() => setModalOpen(true)}
                        style={{ cursor: 'pointer' }}
                        title="Search"
                        className={
                            router.pathname == '/search'
                                ? styles.active
                                : `filter grayscale opacity-60`
                        }
                        src="/static/assets/icons/search.svg"
                        alt="home"
                        width="30px"
                        height="30px"
                    />

                    <Link href={'/messages'}>
                        <a>
                            <div
                                title="Message"
                                className={
                                    isStringMatched(
                                        router.pathname,
                                        '/messages'
                                    )
                                        ? styles.active
                                        : `filter grayscale`
                                }
                            >
                                <img
                                    className="filter grayscale opacity-60"
                                    src="/static/assets/icons/message.svg"
                                    alt="home"
                                    width="22px"
                                    height="18px"
                                />
                            </div>
                        </a>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col items-center mb-7 gap-6 ">
                <img
                    src="/static/assets/icons/help.png"
                    alt="home"
                    width="20px"
                    height="20px"
                />
                <Link href="/profile/edit">
                    <a>
                        <img
                            src="/static/assets/icons/settings.png"
                            alt="home"
                            width="20px"
                            height="20px"
                        />
                    </a>
                </Link>
                <img
                    onClick={handleLogoutUser}
                    src="/static/assets/icons/logout.png"
                    alt="home"
                    width="20px"
                    height="20px"
                />
            </div>
        </div>
    );
};

export default LeftSideNav;
