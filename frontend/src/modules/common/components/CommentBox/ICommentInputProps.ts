import { Comment } from '../../types/Comment';
export interface ICommentInputProps {
    onCommentPost: (comment: Comment) => void;
}
