import React from 'react';
import { getAllMessagesByRoomUidQuery } from '../../../../api/messages';
import getUrlParams from '../../../../helpers/utils/getUrlParams';
import { setImages } from '../../../../reducers/messageReducer';
import InfiniteScroll from '../../../common/components/InfiniteScroll';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import useQuery from '../../../common/hooks/useQuery';

const imageTypes = 'png,webp,jpeg,jpg';

const SharedMedia = () => {
    const { activeMessagehead, images } = useAppSelector(
        (state) => state.messages
    );
    const receiverUid = activeMessagehead?.users[0]?.uid || '';
    const dispatch = useAppDispatch();

    const { isLoading, lazyFetch } = useQuery(getAllMessagesByRoomUidQuery, {
        skip:
            receiverUid === undefined ||
            images.results[
                getUrlParams({ uid: receiverUid, includeOnly: imageTypes })
            ] !== undefined
                ? true
                : false,
        onQueryEnd: (state) => {
            dispatch(
                setImages({
                    data: state?.result?.messages,
                    count: state?.result?.count,
                    params: {
                        uid: receiverUid || '',
                        includeOnly: imageTypes,
                    },
                })
            );
        },

        params: {
            receiverUid: receiverUid || '',
            includeOnly: imageTypes,
            limit: 10,
            skip: 0,
        },
    });

    const results =
        images.results[
            getUrlParams({
                uid: activeMessagehead?.users[0]?.uid || '',
                includeOnly: imageTypes,
            })
        ];

    const handleInfiniteScroll = async (skip: number) => {
        const response = await lazyFetch({
            receiverUid: activeMessagehead?.users[0]?.uid || '',
            includeOnly: imageTypes,
            limit: 10,
            skip,
        });

        dispatch(
            setImages({
                data: response?.result?.messages,
                count: response?.result?.count,
                type: 'join',
                params: {
                    uid: receiverUid || '',
                    includeOnly: imageTypes,
                },
            })
        );
    };

    return (
        <div className={'py-5'}>
            <div className="px-2 flex gap-1 flex-wrap">
                <InfiniteScroll
                    isLoading={isLoading}
                    margin={0}
                    actionEvent={({ skip }) => handleInfiniteScroll(skip)}
                    skip={results?.data?.length}
                    count={results?.count}
                    direction="bottom"
                >
                    <>
                        {results?.data?.map((message) => {
                            return message?.files?.map((data, index) => {
                                return (
                                    <div
                                        key={message?.uid + index}
                                        className="w-20 h-24 overflow-hidden rounded  relative border-2"
                                    >
                                        <img
                                            className="absolute min-w-full min-h-full object-cover"
                                            src={data?.url || ''}
                                            alt=""
                                        />
                                    </div>
                                );
                            });
                        })}
                    </>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default SharedMedia;
