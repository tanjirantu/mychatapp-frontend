import React, { useEffect, useRef } from 'react';
import formatMessageTime from '../../../../helpers/utils/formatMessageTime';
import styles from './ChatWindow.module.scss';

type File = {
    name: string;
    url: string;
    fileType?: string;
    originalFilename?: string;
};
interface IRightChatText {
    message: string;
    files: [] | File[];
    name: string;
    url: string;
    date: string;
}

const PDF_THUMB = '/static/assets/icons/pdf.svg';
const WORD_THUMB = '/static/assets/icons/word.svg';

const RightChatText: React.FC<IRightChatText> = ({ message, files, date }) => {
    const messageTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageTextRef.current) {
            messageTextRef.current.innerHTML = message.replace(/\n/g, '<br />');
        }
    }, [message]);

    return (
        <div className={`flex flex-row-reverse items-end gap-3.5 mb-3`}>
            <div className="relative">
                <div className="flex flex-col gap-2.5 ">
                    <div
                        className={`bg-dh-green-700 flex flex-col gap-3  text-white font-normal  rounded-xl rounded-br-none self-end ${styles.right_text}`}
                    >
                        {files?.length
                            ? files.map((file, index) => {
                                  return file?.fileType === 'pdf' ||
                                      file?.fileType === 'doc' ||
                                      file?.fileType === 'docx' ||
                                      file?.fileType === 'ppt' ||
                                      file?.fileType === 'pptx' ? (
                                      file?.fileType === 'pdf' ? (
                                          <div key={index} className="flex gap-2 justify-start items-start mb-2">
                                              <img src={PDF_THUMB} alt="" />
                                              {file?.originalFilename}
                                          </div>
                                      ) : (
                                          <div key={index} className="flex gap-2 justify-start items-start mb-2">
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
                <h5 className="text-dh-gray-500 text-opacity-90 text-xs   whitespace-nowrap right-0 font-normal mt-1.5 text-right absolute">
                    {formatMessageTime(date)}
                </h5>
            </div>
        </div>
    );
};

export default RightChatText;
