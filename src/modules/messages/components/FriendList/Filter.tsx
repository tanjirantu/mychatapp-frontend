import React from 'react';
import styles from './FriendList.module.scss';

interface IFilter {
    onSearch: (value: string) => void;
}

const Filter: React.FC<IFilter> = ({ onSearch }) => {
    return (
        <div className={`${styles.filter_messagelist} pb-4 flex `}>
            <div
                className={`flex items-center gap-2 self-end border border-gray-200 pl-3 pr-3.5 w-full bg-dh-gray-200 py-1.5 rounded-2xl mx-4`}
            >
                <img src="/static/assets/icons/light-search.svg" alt="search" />
                <div className="w-full">
                    <input
                        onChange={(event) => onSearch(event.target.value)}
                        type="text"
                        className="w-full bg-dh-gray-200 outline-none"
                        placeholder="Search by name"
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;
