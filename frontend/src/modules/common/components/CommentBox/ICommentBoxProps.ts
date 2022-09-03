import { Comment } from '../../types/Comment';

export interface ICommentBoxProps {
    onPostCommentBtnClick: (comment: Comment) => void;
    comments: any;
    loadMore: ({ skip }: { skip: number }) => void;
    isLoading: boolean;
    count: number;
    limit: number;
}
