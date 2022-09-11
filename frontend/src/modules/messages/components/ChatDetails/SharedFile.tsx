import React from 'react';
import { getAllMessagesByRoomUidQuery } from '../../../../api/messages';
import getUrlParams from '../../../../helpers/utils/getUrlParams';
import { setAttachments } from '../../../../reducers/messageReducer';
import InfiniteScroll from '../../../common/components/InfiniteScroll';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import useQuery from '../../../common/hooks/useQuery';

const fileTypes = 'pdf,doc,docx,ppt,pptx';

const PDF_THUMB = '/static/assets/icons/pdf.svg';
const WORD_THUMB = '/static/assets/icons/word.svg';

const SharedFile = () => {
    const { activeMessagehead, attachments } = useAppSelector(
        (state) => state.messages
    );
    const receiverUid = activeMessagehead?.users[0].uid;
    const dispatch = useAppDispatch();

    const { isLoading, lazyFetch } = useQuery(getAllMessagesByRoomUidQuery, {
        skip:
            receiverUid === undefined ||
            attachments.results[
                getUrlParams({ uid: receiverUid, includeOnly: fileTypes })
            ] !== undefined
                ? true
                : false,
        onQueryEnd: (state) => {
            dispatch(
                setAttachments({
                    data: state?.result?.messages,
                    count: state?.result?.count,
                    params: {
                        uid: receiverUid || '',
                        includeOnly: fileTypes,
                    },
                })
            );
        },

        params: {
            receiverUid: receiverUid || '',
            includeOnly: fileTypes,
            limit: 10,
            skip: 0,
        },
    });

    const results =
        attachments.results[
            getUrlParams({
                uid: activeMessagehead?.users[0].uid,
                includeOnly: fileTypes,
            })
        ];

    const handleInfiniteScroll = async (skip: number) => {
        const response = await lazyFetch({
            receiverUid: activeMessagehead?.users[0]?.uid || '',
            includeOnly: fileTypes,
            limit: 10,
            skip,
        });

        dispatch(
            setAttachments({
                data: response.result?.messages,
                count: response.result.count,
                type: 'join',
                params: {
                    uid: receiverUid || '',
                    includeOnly: fileTypes,
                },
            })
        );
    };

    return (
        <div className={'py-5'}>
            <div className="px-2">
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
                                    <a
                                        rel="noreferrer"
                                        href={data?.url}
                                        target="_blank"
                                        key={message.uid + index}
                                        className="font-medium text-dh-gray-700 mb-3 flex gap-2 cursor-pointer hover:bg-dh-gray-400 p-1"
                                    >
                                        {data?.fileType === 'pdf' ? (
                                            <img src={PDF_THUMB} alt="" />
                                        ) : (
                                            <img src={WORD_THUMB} alt="" />
                                        )}
                                        <p>{data?.originalFilename}</p>
                                    </a>
                                );
                            });
                        })}
                    </>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default SharedFile;
