import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ChatWindow from '../components/ChatWindow';
import MessageLists from '../components/MessageLists';
import { useAppSelector } from '../../common/hooks';
import OverflowOption from '../components/OverflowOption';

const MessageContainer = () => {
    const { messageHeads } = useAppSelector((state) => state.messages);
    const router = useRouter();

    useEffect(() => {
        if (!!messageHeads.results.length) {
            router.push(`/messages?uid=${messageHeads.results[0].uid}`);
        }
    }, []);

    return (
        <div className='h-screen overflow-y-auto relative'>
            <OverflowOption/>
            <div className="flex">
                <MessageLists messageLists={messageHeads.results || []} />
                <div className="flex-auto  h-screen flex flex-col ">
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
