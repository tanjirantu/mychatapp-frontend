import Link from 'next/link';
import React from 'react';
import { removeToken } from '../../../../libs/authClient';
import { removeUser } from '../../../../reducers/userReducer';
import { actionLogoutBuyer } from '../../actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Dropdown from '../Dropdown';
import NotificationDropdown from '../NotificationDropdown';
import UserAvatar from '../UserAvatar';

const HeaderMenu = () => {
    const { data } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleLogoutUser = async () => {
        try {
            await actionLogoutBuyer();
            removeToken();
            dispatch(removeUser());
            window.location.replace(process.env.SIGNIN_URL as string);
        } catch (error) {}
    };

    return (
        <div className="flex gap-5 relative">
            <div>
                <NotificationDropdown />
            </div>

            <div>
                <Dropdown className="relative">
                    <Dropdown.Menu>
                        {({ toggle, open }) => (
                            <div onClick={() => toggle(!open)}>
                                <UserAvatar
                                    className="cursor-pointer"
                                    src={data?.meta?.logo?.url || ''}
                                    height={42}
                                    width={42}
                                    name={`${data?.meta?.firstName || ''} ${
                                        data?.meta?.firstName || ''
                                    }`}
                                />
                            </div>
                        )}
                    </Dropdown.Menu>
                    <Dropdown.Item>
                        {() => (
                            <div className="absolute z-50 bg-white top-full mt-3 right-0 rounded-md w-64 shadow-2xl overflow-hidden p-1">
                                <Link href="/profile">
                                    <a>
                                        <div className="flex gap-3 items-center hover:bg-dh-gray-200 hover:bg-opacity-70 cursor-pointer rounded px-3.5  py-2.5">
                                            <img
                                                height={30}
                                                width={30}
                                                alt="profile"
                                                src="/static/assets/icons/header-profile.svg"
                                            />
                                            <h5 className="font-medium">
                                                My profile
                                            </h5>
                                        </div>
                                    </a>
                                </Link>
                                <Link href="/profile/edit">
                                    <a>
                                        <div className="flex gap-3 items-center hover:bg-dh-gray-200 hover:bg-opacity-70 cursor-pointer rounded px-3.5  py-2.5">
                                            <img
                                                height={30}
                                                width={30}
                                                alt="edit profile"
                                                src="/static/assets/icons/header-edit-profile.svg"
                                            />
                                            <h5 className="font-medium">
                                                Edit profile
                                            </h5>
                                        </div>
                                    </a>
                                </Link>
                                <Link href="/profile/bookmarks">
                                    <a>
                                        <div className="flex gap-3 items-center hover:bg-dh-gray-200 hover:bg-opacity-70 cursor-pointer rounded px-3.5  py-2.5">
                                            <img
                                                height={30}
                                                width={30}
                                                alt="bookmark"
                                                src="/static/assets/icons/header-bookmark.svg"
                                            />
                                            <h5 className="font-medium">
                                                Bookmarks
                                            </h5>
                                        </div>
                                    </a>
                                </Link>

                                <div
                                    onClick={handleLogoutUser}
                                    className="flex gap-3 items-center hover:bg-dh-gray-200 hover:bg-opacity-70 cursor-pointer rounded px-3.5  py-2.5"
                                >
                                    <img
                                        height={30}
                                        width={30}
                                        alt="logout"
                                        src="/static/assets/icons/header-logout.svg"
                                    />
                                    <h5 className="font-medium">Log out</h5>
                                </div>
                            </div>
                        )}
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    );
};

export default HeaderMenu;
