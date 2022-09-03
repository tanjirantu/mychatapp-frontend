import React, { forwardRef, useEffect, useRef } from 'react';
import UserAvatar from '../../../common/components/UserAvatar';
import styles from './ChatWindow.module.scss';
import LeftChatText from './LeftChatText';
import RightChatText from './RightChatText';
import { useAppSelector } from '../../../common/hooks';
import getUrlParams from '../../../../helpers/utils/getUrlParams';
import InfiniteScroll from '../../../common/components/InfiniteScroll';
import UserTyping from './UserTyping';

type ChatProps = {
    scrollToBottom: (behaviour: 'smooth' | 'auto') => void;
    isLoading: boolean;
    onInfiniteScroll: (skip: number) => void;
    filter: any;
    isTyping: boolean;
};

type ChatRef = HTMLDivElement | null;

const ChatBox: React.ForwardRefRenderFunction<ChatRef, ChatProps> = (
    { scrollToBottom, isLoading, onInfiniteScroll, filter, isTyping },
    ref
) => {
    const { messages, activeMessagehead } = useAppSelector((state) => state.messages);
    const { data } = useAppSelector((state) => state.user);
    const chatWindow = useRef<ChatRef>(null);
    const results = messages.results[getUrlParams({ uid: activeMessagehead?.friends[0].uid, ...filter })];

    useEffect(() => {
        if (results?.data.length && chatWindow.current) {
            const iniitalStatus = chatWindow.current.dataset.firstscroll;

            if (iniitalStatus === 'no') {
                scrollToBottom('auto');
                chatWindow.current.dataset.firstscroll = 'yes';
            }
        }
    }, [results, ref]);

    const messagesList = results?.data || [];

    return (
        <div ref={ref} className={`${styles.chat_box} overflow-y-auto`}>
            <div className="max-w-lg text-center mx-auto flex flex-col items-center mt-7">
                <UserAvatar
                    width={90}
                    height={90}
                    name={activeMessagehead?.friends[0]?.meta?.logo?.url || ''}
                    src={activeMessagehead?.friends[0]?.meta?.logo?.url || ''}
                />
                <h2 className="text-xl text-dh-gray-800 mt-2.5">{activeMessagehead?.friends[0].meta.companyName}</h2>
                <h5 className="font-normal text-dh-gray-700 mt-1.5">
                    This is very beginning of your conversations with {activeMessagehead?.friends[0].meta.companyName}
                </h5>
            </div>
            <InfiniteScroll
                isLoading={isLoading}
                skip={messagesList.length}
                actionEvent={({ skip }) => onInfiniteScroll(skip)}
                margin={10}
                direction="top"
                count={results?.count}
            >
                <div ref={chatWindow} className="px-7 pt-14 pb-4" data-firstscroll="no">
                    <div className="flex gap-5 flex-col">
                        {messagesList.map((message) => {
                            if (message.sender.uid === data?.uid) {
                                return (
                                    <RightChatText
                                        date={message.createdAt}
                                        name="tusher"
                                        url={message.sender?.meta?.logo?.url || ''}
                                        key={message._id}
                                        message={message.content.message}
                                        files={message?.content?.files || []}
                                    />
                                );
                            }

                            return (
                                <LeftChatText
                                    date={message.createdAt}
                                    name="tusher"
                                    url={message.sender?.meta?.logo?.url || ''}
                                    key={message._id}
                                    message={message.content.message}
                                    files={message?.content?.files || []}
                                />
                            );
                        })}

                        {isTyping ? (
                            <UserTyping name="" url={activeMessagehead?.friends[0]?.meta?.logo?.url || ''} />
                        ) : null}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default forwardRef(ChatBox);
