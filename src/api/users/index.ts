import { baseApi } from '../../config';
import { UserFilterInput } from './UserFilterInput';
import { UserResponse } from './UserResponse';
import { User } from './User';
import { IApiResponse } from '../IApiResponse';
import getUrlParams from '../../helpers/utils/getUrlParams';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<
            IApiResponse<{ users: UserResponse[] }>,
            { params?: UserFilterInput } | void
        >({
            query: ({ params }: { params: UserFilterInput }) => ({
                url: `/users?${getUrlParams(params)}`,
                method: 'GET',
            }),
        }),
        getUser: build.query<User, any | void>({
            query: (uid) => ({
                url: `/user/${uid}`,
                method: 'GET',
            }),
            transformResponse: (response: IApiResponse<User>) => {
                return response.result;
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetUserQuery, useGetUsersQuery } = userApi;
