import React, { useContext, useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { getToken } from '../../libs/authClient';
import { useAppDispatch } from '../../modules/common/hooks';
import { setActiveFriend, setInActiveFriend } from '../../reducers/messageReducer';

const USER_ONLINE_EVENT = 'onUserOnline';
const USER_OFF_LINE_EVENT = 'onUserOffline';
const onlinePollingInterval = 10000;
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL as string;

interface IUserConnecttivityProps {
    children: React.ReactNode;
}

const UserConnectivityContext = React.createContext(true);

const UserConnectivityLayout: React.FC<IUserConnecttivityProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

    const socketRef = useRef<null | Socket>(null);

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            transports: ['websocket'],
            auth: {
                token: getToken(),
            },
        });

        // Add polling incase of slow connection
        const id = setInterval(() => {
            checkOnlineStatus();
        }, onlinePollingInterval);

        window.addEventListener('offline', () => {
            if (socketRef.current) {
                socketRef?.current.emit(USER_OFF_LINE_EVENT);
            }

            setOnlineStatus(false);
        });

        socketRef.current.on(USER_ONLINE_EVENT, (message) => {
            dispatch(setActiveFriend(message.userUid));
        });

        socketRef.current.on(USER_OFF_LINE_EVENT, (message) => {
            dispatch(setInActiveFriend(message.userUid));
        });

        return () => {
            clearInterval(id);
            window.addEventListener('offline', () => {
                if (socketRef.current) {
                    socketRef?.current.emit(USER_OFF_LINE_EVENT);
                }
                setOnlineStatus(false);
            });

            socketRef.current?.disconnect();
        };
    }, []);

    const checkOnlineStatus = () => {
        // If the browser has no network connection return offline
        if (!navigator.onLine) {
            if (socketRef.current) {
                socketRef?.current.emit(USER_OFF_LINE_EVENT);
            }
            setOnlineStatus(navigator.onLine);
            return;
        }

        if (socketRef.current) {
            socketRef?.current.emit(socketRef.current.connected ? USER_ONLINE_EVENT : USER_ONLINE_EVENT);
            setOnlineStatus(socketRef.current?.connected);
        }
    };

    return <UserConnectivityContext.Provider value={onlineStatus}>{children}</UserConnectivityContext.Provider>;
};

export const useOnlineStatus = () => {
    const store = useContext(UserConnectivityContext);
    return store;
};

export default UserConnectivityLayout;
