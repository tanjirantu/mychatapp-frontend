import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../api/messages/Payload';
import { MeesageHead } from '../api/messages/Response';
import getUrlParams from '../helpers/utils/getUrlParams';

type State = {
    activeMessagehead: null | MeesageHead;
    messageHeads: {
        results: MeesageHead[];
        count: number;
    };
    messages: {
        results: {
            [key: string]: {
                data: Message[];
                count: number;
            };
        };
    };
    images: {
        results: {
            [key: string]: {
                data: Message[];
                count: number;
            };
        };
    };
    attachments: {
        results: {
            [key: string]: {
                data: Message[];
                count: number;
            };
        };
    };
    activeFriends: {
        [key: string]: boolean;
    };
};

const initialState: State = {
    activeMessagehead: null,
    messageHeads: {
        results: [],
        count: 0,
    },
    messages: {
        results: {},
    },
    images: {
        results: {},
    },
    attachments: {
        results: {},
    },
    activeFriends: {},
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages(
            state: typeof initialState,
            action: PayloadAction<{
                data: Message[];
                count: number;
                type?: 'join';
                params: { uid: string; searchText?: string };
            }>
        ) {
            const urlParms = getUrlParams(action.payload.params);

            const data =
                action.payload.type === 'join'
                    ? [
                          ...action.payload.data,
                          ...state.messages.results[urlParms].data,
                      ]
                    : action.payload.data;

            state.messages.results[urlParms] = {
                data,
                count: action.payload.count,
            };
        },

        setImages(
            state: typeof initialState,
            action: PayloadAction<{
                data: Message[];
                count: number;
                type?: 'join';
                params: { uid: string; includeOnly?: string };
            }>
        ) {
            const urlParms = getUrlParams(action.payload.params);

            const data =
                action.payload.type === 'join'
                    ? [
                          ...state.images.results[urlParms]?.data,
                          ...action.payload.data,
                      ]
                    : action.payload.data;

            state.images.results[urlParms] = {
                data,
                count: action.payload.count,
            };
        },

        setAttachments(
            state: typeof initialState,
            action: PayloadAction<{
                data: Message[];
                count: number;
                type?: 'join';
                params: { uid: string; includeOnly?: string };
            }>
        ) {
            const urlParms = getUrlParams(action.payload.params);

            const data =
                action.payload.type === 'join'
                    ? [
                          ...state.attachments.results[urlParms]?.data,
                          ...action.payload.data,
                      ]
                    : action.payload.data;

            state.attachments.results[urlParms] = {
                data,
                count: action.payload.count,
            };
        },

        setMessage(
            state: typeof initialState,
            action: PayloadAction<{
                data: Message;
                params: { uid: string; search?: string };
            }>
        ) {
            const urlParms = getUrlParams(action.payload.params);
            if (state.messages.results[urlParms] === undefined) {
                state.messages.results[urlParms] = {
                    data: [action.payload.data],
                    count: 1,
                };
            } else {
                state.messages.results[urlParms] = {
                    data: [
                        ...state.messages.results[urlParms].data,
                        action.payload.data,
                    ],
                    count: state.messages.results[urlParms].count + 1,
                };
            }

            const findIndex = state.messageHeads.results.findIndex((head) => {
                return action.payload.params.uid === head.users[0].uid;
            });
            if (findIndex > -1) {
                const _messageHeads = [...state.messageHeads.results];
                _messageHeads.splice(findIndex, 1);
                _messageHeads.unshift(state.messageHeads.results[findIndex]);
                state.messageHeads.results = _messageHeads;
            }
        },

        setMessageHeads(
            state: typeof initialState,
            action: PayloadAction<State['messageHeads']>
        ) {
            state.messageHeads = action.payload;
        },

        setActiveHeads(
            state: typeof initialState,
            action: PayloadAction<State['activeMessagehead']>
        ) {
            state.activeMessagehead = action.payload;
        },
        setActiveFriend(
            state: typeof initialState,
            action: PayloadAction<string>
        ) {
            state.activeFriends[action.payload] = true;
        },

        setInActiveFriend(
            state: typeof initialState,
            action: PayloadAction<string>
        ) {
            state.activeFriends[action.payload] = false;
        },
    },
});

export const {
    setMessage,
    setMessages,
    setActiveHeads,
    setMessageHeads,
    setImages,
    setAttachments,
    setActiveFriend,
    setInActiveFriend,
} = messageSlice.actions;
export default messageSlice.reducer;
