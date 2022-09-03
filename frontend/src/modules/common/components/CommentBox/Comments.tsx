import React, { useLayoutEffect } from 'react';
import Comment from './Comment';
import EmptyComment from './EmptyComment';
import type { File } from '../../types/Comment/File';
import { MoonLoader } from 'react-spinners';
import InfiniteScroll from '../InfiniteScroll';
import { useComment } from './CommentContext';

interface User {
    uid: string;
    userType: string;
    meta: {
        companyName: string;
        logo: {
            name: string;
            url: string;
        };
    };
}

interface Comment {
    sender: User;
    receiver: User;
    content: {
        message: string;
        files: File[];
    };
}

interface IComments {
    comments: Comment[];
    isLoading: boolean;
    count: number;
    limit: number;
    loadMore: ({ skip }: { skip: number }) => void;
}

const Comments: React.FC<IComments> = ({ comments, loadMore, count, isLoading, limit }) => {
    const { ref, scrollToBottom } = useComment();

    useLayoutEffect(() => {
        if (comments.length <= limit) {
            scrollToBottom();
        }
    }, [ref.current?.childNodes.length]);

    return (
        <>
            <div ref={ref} className="h-full overflow-y-auto">
                {isLoading ? (
                    <div className="w-full flex justify-center">
                        <MoonLoader size={24} color="#01896a" />
                    </div>
                ) : null}
                <InfiniteScroll
                    isLoading={isLoading}
                    margin={-100}
                    skip={comments.length}
                    count={count}
                    actionEvent={({ skip }) => {
                        loadMore({ skip });
                    }}
                    direction="top"
                >
                    {comments.length
                        ? comments.map((comment: any, index: number) => {
                              return (
                                  <Comment
                                      key={index}
                                      sender={comment.sender}
                                      receiver={comment.receiver}
                                      content={comment.content}
                                  />
                              );
                          })
                        : []}
                </InfiniteScroll>
                {!isLoading && !comments.length && <EmptyComment />}
            </div>
        </>
    );
};

export default Comments;
