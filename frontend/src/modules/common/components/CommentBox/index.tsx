import React from 'react';
import CommentInput from './CommentInput';
import styles from './CommentBox.module.scss';
import Comments from './Comments';
import { ICommentBoxProps } from './ICommentBoxProps';
import CommentContextProvider, { useComment } from './CommentContext';

const CommentBox: React.FC<ICommentBoxProps> = ({
    onPostCommentBtnClick,
    comments,
    loadMore,
    count,
    isLoading,
    limit,
}) => {
    return (
        <div className={`${styles.root} bg-white rounded-md mt-2.5 px-10 flex flex-col shadow-sm`}>
            <div className="h-20 flex-shrink-0 flex items-center border-b">
                <h3 className="text-dh-gray-800 font-medium text-xl">{count} Comments</h3>
            </div>
            <Comments limit={limit} comments={comments} count={count} isLoading={isLoading} loadMore={loadMore} />
            <CommentInput onCommentPost={(comment) => onPostCommentBtnClick(comment)} />
        </div>
    );
};

export { CommentContextProvider, useComment };
export default CommentBox;
