import React, { useEffect, useRef } from 'react';
import UserAvatar from '../../../common/components/UserAvatar';
import styles from './ChatWindow.module.scss';
import formatMessageTime from '../../../../helpers/utils/formatMessageTime';

type File = {
    name: string;
    url: string;
    fileType?: string;
    originalFilename?: string;
};

interface ILeftChatText {
    message: string;
    name: string;
    url: string;
    files: [] | File[];
    date: string;
}

const PDF_THUMB = '/static/assets/icons/pdf.svg';
const WORD_THUMB = '/static/assets/icons/word.svg';

const LeftChatText: React.FC<ILeftChatText> = ({ message, name, url, files, date }) => {
    const messageTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageTextRef.current) {
            messageTextRef.current.innerHTML = message.replace(/\n/g, '<br />');
        }
    }, [message]);

    return (
        <div className={`flex gap-3.5 mb-3`}>
            <UserAvatar width={35} height={35} name={name} src={url} />
            <div className="relative">
                <div className="flex flex-col gap-2.5">
                    <div
                        className={`bg-dh-gray-200 font-normal flex flex-col gap-3  rounded-xl rounded-tl-none self-start ${styles.left_text}`}
                    >
                        {files?.length
                            ? files.map((file, index) => {
                                  return file?.fileType === 'pdf' ||
                                      file?.fileType === 'doc' ||
                                      file?.fileType === 'docx' ||
                                      file?.fileType === 'ppt' ||
                                      file?.fileType === 'pptx' ? (
                                      file?.fileType === 'pdf' ? (
                                          <div key={index} className="flex gap-2 justify-start items-start">
                                              <img src={PDF_THUMB} alt="" />
                                              {file?.originalFilename}
                                          </div>
                                      ) : (
                                          <div key={index} className="flex gap-2 justify-start items-start">
                                              <img src={WORD_THUMB} alt="" />
                                              {file?.originalFilename}
                                          </div>
                                      )
                                  ) : (
                                      <div key={index} className="w-80 bg-dh-gray-300 rounded-md overflow-hidden">
                                          <img
                                              className="object-fill min-w-full min-h-full"
                                              src={file?.url}
                                              alt="img"
                                          />
                                      </div>
                                  );
                              })
                            : null}
                        {message.length ? <div ref={messageTextRef}></div> : null}
                    </div>
                </div>
                <h5 className="text-dh-gray-500 text-opacity-90 text-xs absolute font-normal mt-1.5 whitespace-nowrap left-0">
                    {formatMessageTime(date)}
                </h5>
            </div>
        </div>
    );
};

export default LeftChatText;
