import { http } from '../../config';
import { MeesageHead } from './Response';
import { IApiResponse } from '../IApiResponse';
import {
    MessageRoomPayload,
    MessagePayload,
    Message,
    CreateRoomPayload,
} from './Payload';
import { AxiosResponse } from 'axios';
import getUrlParams from '../../helpers/utils/getUrlParams';

export const createRoomMutation = async (payload: CreateRoomPayload) => {
    try {
        const response = await http.post<
            MessageRoomPayload,
            AxiosResponse<IApiResponse<MeesageHead>>
        >('/rooms', payload);
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
            IApiResponse<{ rooms: MeesageHead[]; count: number }>
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
        const { receiverUid, ...rest } = params;
        const response = await http.get<
            IApiResponse<{
                messages: Message[];
                count: number;
            }>
        >(`/messages/${receiverUid}?${getUrlParams(rest)}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
};
