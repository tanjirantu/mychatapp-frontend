import React, { useState } from 'react';
import Filter from './Filter';
import List from './List';
import styles from './MessageLists.module.scss';
import Profile from './Profile';
import { MeesageHead } from '../../../../api/messages/Response';
import { getAllMessageRoomQuery } from '../../../../api/messages';
import {
    setActiveHeads,
    setMessageHeads,
} from '../../../../reducers/messageReducer';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import useQuery from '../../../common/hooks/useQuery';
import { useRouter } from 'next/router';
import useDebounce from '../../../common/hooks/useDebounce';
import InfiniteScroll from '../../../common/components/InfiniteScroll';

const MessageLists: React.FC<{ messageLists: MeesageHead[] }> = ({
    messageLists,
}) => {
    const { messageHeads } = useAppSelector((state) => state.messages);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');

    const { isLoading, lazyFetch, data } = useQuery(getAllMessageRoomQuery, {
        onQueryEnd: (data) => {
            dispatch(setActiveHeads(data.result.rooms[0]));
            dispatch(
                setMessageHeads({
                    results: data.result.rooms,
                    count: data.result.count,
                })
            );
            router.push(`/messages?uid=${data.result.rooms[0].uid}`);
        },
        skip: !!messageHeads.results.length,
    });

    useDebounce(search, 700, {
        onChange: async () => {
            if (search.length) {
                const response = await lazyFetch({ search: search });
                dispatch(
                    setMessageHeads({
                        results: response.result.rooms,
                        count: response.result.count,
                    })
                );
                return;
            }

            if (data) {
                dispatch(
                    setMessageHeads({
                        results: data?.result.rooms,
                        count: data?.result.count,
                    })
                );
            }
        },
    });

    const handleSearch = (value: string) => setSearch(value);

    const handleInfiniteScroll = async (skip: number) => {
        const response = await lazyFetch({ search: search, limit: 10, skip });
        dispatch(
            setMessageHeads({
                results: response.result.rooms,
                count: response.result.count,
            })
        );
    };

    return (
        <div
            className={`h-screen flex flex-col flex-shrink-0 overflow-hidden ${styles.container}`}
        >
            <Profile />
            <Filter onSearch={handleSearch} />
            <div className=" flex-1 overflow-y-auto">
                <InfiniteScroll
                    isLoading={isLoading}
                    actionEvent={({ skip }) => handleInfiniteScroll(skip)}
                    count={messageHeads.count}
                    skip={messageLists.length}
                    margin={0}
                >
                    <>
                        {messageLists.length
                            ? messageLists.map((_list) => {
                                  return <List key={_list.uid} {..._list} />;
                              })
                            : null}
                    </>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default MessageLists;
