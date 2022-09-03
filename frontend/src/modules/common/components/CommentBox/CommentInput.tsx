import React, { useState } from 'react';
import SendIcon from '../../icons/SendIcon';
import { Comment } from '../../types/Comment';
import styles from './CommentBox.module.scss';
import { ICommentInputProps } from './ICommentInputProps';
import FileUploadInput from '../FileUploadInput';
import useFileUpload from '../../hooks/useFileUpload';
import RenderUploadedFileThumbs from '../FileUploadInput/RenderUploadedFileThumbs';
import { useComment } from './CommentContext';
import { ClipLoader } from 'react-spinners';

const CommentInput: React.FC<ICommentInputProps> = ({ onCommentPost }) => {
    const [comment, setComment] = useState<Comment>({
        content: {
            message: '',
            files: [],
        },
    });

    const { scrollToBottom } = useComment();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const comment: Comment = {
            content: {
                message: event.target.value,
                files: [],
            },
        };
        setComment(comment);
    };

    const {
        files,
        clear,
        onChange: onFileChange,
        onUpload,
        onRemove,
    } = useFileUpload({
        previousUploadedFiles: [],
    });

    const [isUploading, setIsUploading] = useState(false);

    const resetCommentInput = () => {
        return setComment({
            content: {
                message: '',
                files: [],
            },
        });
    };

    const [isLoading, setIsLoading] = useState(false);
    const onPostCommentBtnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        if (!files.length && comment.content.message === '') return;

        let payload: any = {
            content: {
                message: comment.content.message,
            },
        };

        if (files.length > 0) {
            setIsUploading(true);
            const uploadedFiles = await onUpload();
            if (uploadedFiles) {
                payload = {
                    ...payload,
                    content: {
                        ...payload.content,
                        files: uploadedFiles.map(({ name, url }) => ({ name, url })),
                    },
                };
            }
            setIsUploading(false);
        }
        resetCommentInput();
        clear();
        onCommentPost(payload);
        scrollToBottom();
        setIsLoading(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFileChange(event);
    };

    return (
        <div className={`${styles.chat_inputs} flex-shrink-0 pb-5`}>
            <div className={`${styles.input_wraper} overflow-hidden mb-5 w-full rounded-md`}>
                {files.length ? (
                    <div className="py-3.5 px-3.5 flex bg-white  gap-5 flex-wrap border-b">
                        <RenderUploadedFileThumbs
                            files={files}
                            onRemove={onRemove}
                            className="relative h-14 w-14 rounded-md"
                            removeIconClassName="top-0 left-0"
                        />
                    </div>
                ) : null}
                <div className={styles.text_area_wraper}>
                    <textarea
                        onChange={(e: any) => handleChange(e)}
                        placeholder="Type your message here"
                        className="bg-transparent border-none pt-3 h-full w-full focus:outline-none pl-4"
                        name=""
                        value={comment.content.message}
                    ></textarea>
                </div>
            </div>
            <div className="gap-2.5 flex flex-shrink-0 items-center justify-between ">
                <div className="flex gap-3.5 mr-3 flex-shrink-0">
                    <FileUploadInput onChange={handleFileChange}>
                        <img alt="uploader" src="../../../../../static/assets/icons/attachment-image.svg" />
                    </FileUploadInput>
                    {/* <img className="w-6 h-6" src="/static/assets/icons/upload-image.svg" alt="" /> */}
                    {/* <img className="w-6 h-6" src="/static/assets/icons/smiley-face.svg" alt="" /> */}
                </div>
                <button
                    className="flex gap-3 justify-center items-center"
                    onClick={onPostCommentBtnClick}
                    disabled={isUploading}
                >
                    {isLoading && <ClipLoader color="#01896a" size={24} />}
                    <SendIcon />
                    <h3 className="text-dh-green-700">Post a comment</h3>
                </button>
            </div>
        </div>
    );
};

export default CommentInput;
