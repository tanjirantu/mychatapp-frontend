import React, { useState } from 'react';
import styles from './ChatDetails.module.scss';
// import SharedFile from './SharedFile';
// import SharedMedia from './SharedMedia';
import dynamic from 'next/dynamic';
import SharedFile from './SharedFile';
import SharedMedia from './SharedMedia';

const NoSSRProfileInfo = dynamic(() => import('./ProfileIntro'), {
    ssr: false,
});

const ChatDetails = () => {
    const [tab, setTab] = useState('media');

    const handleMediaClick = () => {
        setTab('media');
    };

    const handleFilesClick = () => {
        setTab('files');
    };
    return (
        <div className={`${styles.container} flex flex-col flex-shrink-0`}>
            {/* <NoSSRProfileInfo /> */}
            <div className="flex px-1 py-2">
                <button
                    onClick={handleMediaClick}
                    className={`text-lg font-medium px-5 py-1 w-full ${tab === 'media'
                            ? 'border-dh-green-700 border-b-2 text-dh-green-800'
                            : 'border-dh-gray-300 border-b-2'
                        }`}
                >
                    Photo
                </button>
                <button
                    onClick={handleFilesClick}
                    className={`btext-lg font-medium px-5 py-1 w-full ${tab === 'files'
                            ? 'border-dh-green-700 border-b-2 text-dh-green-800'
                            : 'border-dh-gray-300 border-b-2'
                        }`}
                >
                    Files
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {tab === 'files' ? <SharedFile /> : null}
                {tab === 'media' ? <SharedMedia /> : null}
            </div>
        </div>
    );
};

export default ChatDetails;
