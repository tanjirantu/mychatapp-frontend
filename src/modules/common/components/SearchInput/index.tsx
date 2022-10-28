import Link from 'next/link';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useGetUsersQuery } from '../../../../api/users';
import useDebounce from '../../hooks/useDebounce';
import useLocalStorage from '../../hooks/useLocalStorage';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import SearchIcon from '../../icons/SearchIcon';
import Button from '../Button';
import UserAvatar from '../UserAvatar';
import styles from './SearchInput.module.scss';

const SearchInput = () => {
    const [state, setState] = useState('');
    const [activeInput, setActiveInput] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setActiveInput(false));
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
    const debouncedValue = useDebounce<string>(state, 500);

    const { data, isFetching } = useGetUsersQuery(
        {
            params: {
                skip: 0,
                limit: 20,
                phone: debouncedValue,
            },
        },
        { skip: !debouncedValue }
    );

    const [recentSearch, setRecentSearch] = useLocalStorage<string[]>(
        'recentSearch',
        []
    );

    const handleRecentSearch = (searchName: string) => {
        const _recentSearch = [...recentSearch];

        const findIndex = _recentSearch.findIndex(
            (search) => search === searchName
        );

        if (findIndex >= 0) {
            _recentSearch.splice(findIndex, 1);
            _recentSearch.unshift(searchName);
        } else {
            _recentSearch.unshift(searchName);
            _recentSearch.splice(14, 1);
        }

        setRecentSearch(_recentSearch);
    };

    const users = !!debouncedValue && !isFetching ? data?.result || [] : [] as any;

    return (
        <div
            ref={ref}
            className={`${
                styles.root
            } absolute left-0 right-0 overflow-hidden top-0 z-50 bg-white transition-all duration-100 ${
                activeInput ? styles.active : ''
            }`}
        >
            <div
                className={`h-10 w-full items-center gap-3 flex  pl-4  pr-2.5 ${styles.active_input}`}
            >
                <div className="flex-shrink-0">
                    <SearchIcon />
                </div>

                <input
                    value={state}
                    onChange={handleChange}
                    onFocus={() => setActiveInput(true)}
                    className="w-full h-full bg-transparent focus:outline-none text-sm"
                    type="text"
                    placeholder="Search by name, group, type and others"
                />
                {!!state ? (
                    <img
                        onClick={() => setState('')}
                        className="cursor-pointer"
                        src="/static/assets/icons/clear.svg"
                        alt="search cross"
                    />
                ) : null}
            </div>
            {activeInput ? (
                <div
                    className={`${styles.search_body} border-t max-h-72 overflow-y-auto  border-dh-gray-200`}
                >
                    {!!debouncedValue ? (
                        <div className="flex flex-col px-1">
                            {users.map((user: any) => {
                                return (
                                    <Link
                                        key={user._id}
                                        href={`/user/${user.uid}`}
                                    >
                                        <a>
                                            <div
                                                onClick={() =>
                                                    handleRecentSearch(
                                                        user.contact.firstName
                                                    )
                                                }
                                                className={`flex gap-3.5 py-2 transition hover:bg-dh-gray-200 items-center px-4 rounded-md cursor-pointer select-none ${styles.search_item}`}
                                            >
                                                <UserAvatar
                                                    name={user.meta.companyName}
                                                    src={
                                                        user.meta.logo?.url ||
                                                        ''
                                                    }
                                                    height={45}
                                                    width={45}
                                                />
                                                <div className="">
                                                    <h5 className="mb-1 font-medium text-dh-gray-800">
                                                        {user.meta.companyName}
                                                    </h5>
                                                    <p className="text-dh-gray-700">
                                                        Dhaka , Bangladesh
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-5">
                            {!!recentSearch.length ? (
                                <>
                                    <h4 className="mb-2.5">Recent search</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearch.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        setState(item)
                                                    }
                                                    className={`h-6 px-2 flex justify-center items-center cursor-pointer rounded text-dh-gray-700 text-xs ${styles.tag} `}
                                                >
                                                    {item}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <h5 className="text-gray-600">
                                        No Recent search available
                                    </h5>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <Button
                                    className="mt-10"
                                    color="secondaryGreen"
                                >
                                    Advance search
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default SearchInput;
