import React, { useState } from 'react';
// import { formatMessageFromNow } from '../../../../helpers/utils/formatMessageTime';
import { useAppSelector } from '../../../common/hooks';
import styles from './ChatWindow.module.scss';

interface IChatHeader {
    onSearch: (value: string) => void;
}

const ChatHeader: React.FC<IChatHeader> = ({ onSearch }) => {
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

    const { activeMessagehead } = useAppSelector((state) => state.messages);
    return (
        <div
            className={`bg-white flex items-center justify-between flex-shrink-0 pl-7 pr-5 ${styles.chat_header}  `}
        >
            <div className="self-center">
                <h5 className="text-dh-gray-800 ">
                    {activeMessagehead?.users[0] === undefined
                        ? ''
                        : activeMessagehead?.users[0]?.firstName +
                          ' ' +
                          activeMessagehead?.users[0]?.lastName}
                </h5>
                {/* <span className="text-dh-gray-700">
                    {activeMessagehead?.seenAt
                        ? '  Last seen' +
                          ' ' +
                          formatMessageFromNow(activeMessagehead?.seenAt)
                        : null}
                </span> */}
            </div>
            <div className="flex gap-3 ">
                {isOpenSearch ? (
                    <div className="flex bg-dh-gray-200 pl-3 pr-2 py-1 rounded-full">
                        <input
                            onChange={(event) => onSearch(event.target.value)}
                            type="text"
                            className=" bg-dh-gray-200 outline-none"
                            placeholder="Search Messages"
                        />
                        <img
                            className="w-7 h-7"
                            src="/static/assets/icons/message-search.png"
                            alt=""
                        />
                    </div>
                ) : (
                    <img
                        className="w-9 h-9 cursor-pointer"
                        src="/static/assets/icons/message-search.png"
                        alt=""
                        onClick={() => setIsOpenSearch(!isOpenSearch)}
                    />
                )}
            </div>
        </div>
    );
};
export default ChatHeader;
