import { http } from '../../config';
import { MeesageHead } from './Response';
import { IApiResponse } from '../IApiResponse';
import { MessageRoomPayload, MessagePayload, Message } from './Payload';
import { AxiosResponse } from 'axios';
import getUrlParams from '../../helpers/utils/getUrlParams';

export const createRoomMutation = async (payload: MessageRoomPayload) => {
    try {
        const response = await http.post<
            MessageRoomPayload,
            AxiosResponse<IApiResponse<{ room: MeesageHead }>>
        >('/message-rooms', payload);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
};

export const getAllMessageRoomQuery = async (params: {
    search?: string;
    skip?: number;
    limit?: number;
}) => {
    try {
        const response = await http.get<
            IApiResponse<{ messageRooms: MeesageHead[]; count: number }>
        >(`/rooms?${getUrlParams(params)}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
};

export const createMessageMutation = async (payload: MessagePayload) => {
    try {
        const response = await http.post<
            MessagePayload,
            AxiosResponse<IApiResponse<Message>>
        >('/messages', payload);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
};

export const getAllMessagesByRoomUidQuery = async (params: {
    receiverUid: string;
    searchText?: string;
    includeOnly?: string;
    skip?: number;
    limit?: number;
}) => {
    try {
        const response = await http.get<
            IApiResponse<{
                messages: Message[];
                count: number;
            }>
        >(`/messages?${getUrlParams(params)}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
};
