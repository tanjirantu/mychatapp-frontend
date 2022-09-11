import { useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { getToken } from '../../../libs/authClient';
import jwt_decode from 'jwt-decode';
import useAudio from './useAudio';

const SUBMIT_CHAT_MESSAGE_EVENT = 'onMessageSubmit'; // Name of the event
const NEW_MESSAGE_EVENT = 'onNewMessageReceived';
const MESSGE_SEEN_CHANGE = 'onMessageWindowChange';
const TYPE_START_EVENT = 'onTypingStarted';
const TYPE_STOP_EVENT = 'onTypingStopped';
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL as string;

export type MessageType = {
    roomUid: string;
    senderUid: string;
    text: string;
    files?: File[];
    replies?: [
        {
            text: string;
            files: File[];
        }
    ];
};

type File = {
    name: string;
    url: string;
};

const useMessage = (
    roomUid: string | undefined,
    listenMessage: (value: MessageType) => void
) => {
    const socketRef = useRef<null | Socket>(null);
    const [isTyping, setIsTyping] = useState(false);
    const { play } = useAudio('/static/assets/audio/message-tone.mp3');

    useEffect(() => {
        const user = jwt_decode(getToken() as string) as any;
        if (roomUid) {
            // Creates a WebSocket connection
            socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
                transports: ['websocket'],
                auth: {
                    token: getToken(),
                },
                query: {
                    roomUid,
                },
            });

            // Listens for incoming messages
            socketRef?.current?.on(NEW_MESSAGE_EVENT, (message) => {
                if (
                    message.roomUid === roomUid &&
                    message.senderUid !== user.userUid
                ) {
                    listenMessage(message);
                    playAudio();
                }
            });
            //litens for start typing message
            listenStartTyping();
            listenStopTyping();
            windowChange(roomUid, user.userUid);

            return () => {
                socketRef.current?.disconnect();
            };
        }
    }, [roomUid]);

    const playAudio = () => {
        play();
    };

    // Sends a message to the server that
    // forwards it to all users in the same room
    //manufacturer
    const sendMessage = (message: MessageType) => {
        console.log('send', message);
        socketRef.current?.emit(SUBMIT_CHAT_MESSAGE_EVENT, {
            ...message,
        });
    };

    const windowChange = (roomUid: string, senderUid: string) => {
        if (socketRef.current) {
            socketRef?.current.emit(MESSGE_SEEN_CHANGE, {
                roomUid: roomUid,
                userUid: senderUid,
            });
        }
    };

    const startTyping = (userUid: string) => {
        socketRef.current?.emit(TYPE_START_EVENT, roomUid, userUid);
    };

    const stopTyping = (userUid: string) => {
        socketRef.current?.emit(TYPE_STOP_EVENT, roomUid, userUid);
    };
    const listenStartTyping = () => {
        socketRef?.current?.on(TYPE_START_EVENT, (message) => {
            if (message.roomUid === roomUid) {
                setIsTyping(true);
            }
        });
    };

    const listenStopTyping = () => {
        socketRef?.current?.on(TYPE_STOP_EVENT, (message) => {
            if (message.roomUid === roomUid) {
                setIsTyping(false);
            }
        });
    };

    return { sendMessage, windowChange, startTyping, stopTyping, isTyping };
};

export default useMessage;
