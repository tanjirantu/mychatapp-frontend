import React, { useEffect, useRef, useState } from 'react';
import { getAllMessagesByRoomUidQuery } from '../../../../api/messages';
import getUrlParams from '../../../../helpers/utils/getUrlParams';
import { setMessage, setMessages } from '../../../../reducers/messageReducer';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import useQuery from '../../../common/hooks/useQuery';
import ChatDetails from '../ChatDetails';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';
import ChatInputs from './ChatInputs';
import styles from './ChatWindow.module.scss';
import useMessage from '../../../common/hooks/useMessage';
import { useRouter } from 'next/router';
import { flushSync } from 'react-dom';
import useDebounce from '../../../common/hooks/useDebounce';

type ChatRef = HTMLDivElement;

const ChatWindow = () => {
    const { activeMessagehead, messages } = useAppSelector(
        (state) => state.messages
    );

    const chatBoxRef = useRef<ChatRef>(null);
    const dispatch = useAppDispatch();

    const [filter, setFilter] = useState({
        searchText: '',
    });

    const debouncedSearch = useDebounce<string>(filter.searchText, 500);

    const router = useRouter();
    const messageRoomUid = router.query.uid as string;
    const receiverUid = activeMessagehead?.users[0].uid;

    const { sendMessage, startTyping, stopTyping, isTyping } = useMessage(
        messageRoomUid,
        (message) => {
            flushSync(() => {
                dispatch(
                    setMessage({
                        data: {
                            files: message.files,
                            roomUid: message.roomUid,
                            uid: new Date().toISOString(),
                            text: message.text,
                            senderUid: message.senderUid,
                            createdAt: new Date().toISOString(),
                        },
                        params: {
                            uid: message.senderUid || '',
                        },
                    })
                );
            });

            scrollToBottom('smooth');
        }
    );

    const { isLoading, lazyFetch } = useQuery(getAllMessagesByRoomUidQuery, {
        skip: receiverUid === undefined,
        onQueryEnd: (state) => {
            dispatch(
                setMessages({
                    data: state.result.messages,
                    count: state.result.count,
                    params: {
                        uid: receiverUid || '',
                        searchText: debouncedSearch,
                    },
                })
            );

            setTimeout(() => scrollToBottom('smooth'), 1000);
        },

        params: {
            receiverUid: activeMessagehead?.uid || '',
            searchText: debouncedSearch,
            limit: 10,
            skip: 0,
        },
    });

    useEffect(() => {
        if (
            messages.results[getUrlParams({ uid: receiverUid })] !== undefined
        ) {
            scrollToBottom('auto');
        }
    }, [receiverUid]);

    const scrollToBottom = (behavior: 'smooth' | 'auto') => {
        chatBoxRef.current?.scrollTo({
            top: chatBoxRef.current.scrollHeight,
            behavior: behavior,
        });
    };

    const handleInfiniteScroll = async (skip: number) => {
        const response = await lazyFetch({
            ...filter,
            receiverUid: activeMessagehead?.uid || '',
            limit: 10,
            skip,
        });

        let scroll = 0;
        const chatBoxScrollElement = chatBoxRef.current;

        if (chatBoxScrollElement) {
            scroll =
                chatBoxScrollElement?.scrollHeight -
                (chatBoxScrollElement?.scrollTop +
                    chatBoxScrollElement?.clientHeight);
        }

        flushSync(() => {
            dispatch(
                setMessages({
                    data: response.result.messages,
                    count: response.result.count,
                    type: 'join',
                    params: {
                        uid: receiverUid || '',
                    },
                })
            );
        });

        chatBoxScrollElement?.scrollTo({
            top:
                chatBoxScrollElement.scrollHeight -
                (chatBoxScrollElement.offsetHeight + scroll),
            behavior: 'auto',
        });
    };

    useEffect(() => {
        if (
            messages.results[getUrlParams({ uid: receiverUid })] !==
                undefined &&
            isTyping
        ) {
            scrollToBottom('smooth');
        }
    }, [isTyping]);

    return (
        <div className={`${styles.chat_window} flex-auto flex`}>
            <div className="overflow-hidden flex-auto flex flex-col">
                <ChatHeader
                    onSearch={(value) => {
                        setFilter({ searchText: value });
                    }}
                />

                <ChatBox
                    isTyping={isTyping}
                    filter={{
                        searchText: debouncedSearch,
                    }}
                    ref={chatBoxRef}
                    isLoading={isLoading}
                    scrollToBottom={scrollToBottom}
                    onInfiniteScroll={handleInfiniteScroll}
                />
                <ChatInputs
                    startTyping={startTyping}
                    stopTyping={stopTyping}
                    scrollToBottom={scrollToBottom}
                    onChatSubmit={sendMessage}
                />
            </div>
            <ChatDetails />
        </div>
    );
};

export default ChatWindow;
