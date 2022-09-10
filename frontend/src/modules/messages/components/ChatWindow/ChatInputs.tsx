/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatWindow.module.scss';
import { flushSync } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { setMessage as setStoreMessage } from '../../../../reducers/messageReducer';
import dynamic from 'next/dynamic';
import data from '@emoji-mart/data/sets/1/facebook.json';

import FileUploadInput from '../../../common/components/FileUploadInput';
import useFileUpload from '../../../common/hooks/useFileUpload';
import RenderUploadedFileThumbs from '../../../common/components/FileUploadInput/RenderUploadedFileThumbs';
import Dropdown from '../../../common/components/Dropdown';
import { getFileType } from '../../../../helpers/utils';
import useDebounce from '../../../common/hooks/useDebounce';
import createDOMPurify from 'dompurify';
import { MessageType } from '../../../common/hooks/useMessage';

const NoSSRPicker = dynamic(
    () => {
        // @ts-ignore
        return import('@emoji-mart/react');
    },
    {
        ssr: true,
    }
);

interface ChatInputProps {
    scrollToBottom: (type: 'smooth' | 'auto') => void;
    onChatSubmit: (message: MessageType) => void;

    startTyping: (userUid: string) => void;
    stopTyping: (userUid: string) => void;
}

const ChatInputs: React.FC<ChatInputProps> = ({
    scrollToBottom,
    onChatSubmit,
    startTyping,
    stopTyping,
}) => {
    const { activeMessagehead } = useAppSelector((state) => state.messages);
    const { data: user } = useAppSelector((state) => state.user);
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch();
    const [isTyping, setIsTyping] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.maxWidth =
                inputRef.current.offsetWidth + 'px';
        }
    }, []);

    const {
        clear,
        files,
        onChange: onFileChange,
        onUpload,
        onRemove,
    } = useFileUpload({
        previousUploadedFiles: [],
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFileChange(event);
    };

    const sendMessageHandler = async () => {
        if (inputRef.current) {
            inputRef.current.innerHTML = message;
        }

        if (!activeMessagehead?.uid) return;

        const filesWithFileType: any = [];

        const uploadedFiles = await onUpload();

        if (uploadedFiles?.length) {
            uploadedFiles?.map((file, idx) => {
                const fileType = getFileType(file?.url);
                filesWithFileType.push({
                    ...file,
                    fileType: fileType,
                    originalFilename: files[idx]?.name,
                });
            });
        }
        if (message || filesWithFileType?.length) {
            flushSync(() => {
                onChatSubmit({
                    roomUid: activeMessagehead.uid || '',
                    text: message,
                    files: files,
                    senderUid: user?.uid || '',
                });

                dispatch(
                    setStoreMessage({
                        data: {
                            uid: new Date().toISOString(),
                            files: [...filesWithFileType],
                            text: message,
                            roomUid: activeMessagehead.uid,
                            senderUid: user?.uid || '',

                            createdAt: new Date().toISOString(),
                        },
                        params: {
                            uid: activeMessagehead?.users[0].uid || '',
                        },
                    })
                );
            });

            scrollToBottom('smooth');
            setMessage('');
            clear();
            if (inputRef.current) {
                inputRef.current.innerHTML = '';
            }
        }
    };

    //detect is user typing in certain time
    useDebounce(message, 3000, {
        onChangeStart() {
            if (!isTyping && message.length) {
                setIsTyping(true);
                startTyping(activeMessagehead?.users[0].uid || '');
            }
        },

        onChange() {
            if (isTyping) {
                setIsTyping(false);
                stopTyping(activeMessagehead?.users[0].uid || '');
            }
        },
    });

    useEffect(() => {
        setMessage('');
        clear();
        if (inputRef.current) {
            inputRef.current.innerHTML = '';
        }
    }, [activeMessagehead?.uid]);

    function textFromDiv(selector: string) {
        return selector
            .replace(/<div>/g, ' \n ')
            .replace(/<\/div>/g, '')
            .replace(/<br>/g, ' \n ');
    }

    const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
        const text = textFromDiv(event.currentTarget.innerHTML);
        const cleanText = createDOMPurify.sanitize(text, {
            ALLOWED_ATTR: ['style'],
        });
        setMessage(cleanText);
    };
    return (
        <div
            className={`${styles.chat_inputs} py-3 flex-shrink-0 relative border-t border-dh-gray-200`}
        >
            {files.length ? (
                <div className="flex bg-white w-full gap-5 flex-wrap px-6 pb-4 pt-2">
                    <RenderUploadedFileThumbs
                        files={files}
                        onRemove={onRemove}
                        className="relative h-14 w-14 rounded-md border border-dh-gray-300"
                        removeIconClassName="-top-2 -right-2"
                    />
                </div>
            ) : null}
            <div className="gap-2.5 flex flex-shrink-0 items-end pl-6 pr-3">
                <div className="flex gap-3.5 mr-3 flex-shrink-0 pb-2  ">
                    <FileUploadInput
                        onChange={handleFileChange}
                        accept="image/*"
                    >
                        <img
                            className="w-6 h-6 cursor-pointer"
                            src="/static/assets/icons/message-img.png"
                            alt=""
                        />
                    </FileUploadInput>
                    <FileUploadInput
                        onChange={handleFileChange}
                        accept=".pdf, .doc, .docx, .ppt, pptx, .zip"
                    >
                        <img
                            className="w-6 h-6 cursor-pointer"
                            src="/static/assets/icons/message-assets.png"
                            alt=""
                        />
                    </FileUploadInput>

                    <Dropdown>
                        <Dropdown.Menu>
                            {({ toggle, open }) => (
                                <div onClick={() => toggle(!open)}>
                                    <img
                                        className="w-6 h-6 cursor-pointer"
                                        src="/static/assets/icons/message-emoji.png"
                                        alt=""
                                    />
                                </div>
                            )}
                        </Dropdown.Menu>
                        <Dropdown.Item>
                            {() => (
                                <div className="absolute -top-[425px]">
                                    <NoSSRPicker
                                        // @ts-ignore

                                        data={data}
                                        onEmojiSelect={(emoji: any) => {
                                            setMessage(
                                                message?.concat(emoji?.native)
                                            );
                                        }}
                                        previewPosition="none"
                                        set="google"
                                    />
                                </div>
                            )}
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div
                    onInput={handleInputChange}
                    ref={inputRef}
                    contentEditable
                    aria-multiline
                    aria-label="Write a message…"
                    data-placeholder={!message ? 'Write a message…' : ''}
                    role="textbox"
                    className={`${styles.input_wraper} relative text-sm overflow-hidden border-none outline-none px-2.5 pt-2.5  flex-grow-0 w-full`}
                ></div>

                <img
                    onClick={sendMessageHandler}
                    className={`h-8 w-8 mb-1 cursor-pointer select-none`}
                    src="/static/assets/icons/message-send.png"
                    alt="send"
                />
            </div>
        </div>
    );
};

export default ChatInputs;
