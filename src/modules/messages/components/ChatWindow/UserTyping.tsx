import React from 'react';
import UserAvatar from '../../../common/components/UserAvatar';
import styles from './ChatWindow.module.scss';

interface IUserTyping {
    name: string;
    url: string;
}

const UserTyping: React.FC<IUserTyping> = ({ name, url }) => {
    return (
        <div className="flex gap-3.5">
            <UserAvatar width={35} height={35} name={name} src={url} />
            <div className={`${styles.typing} bg-dh-gray-200 flex items-center`}>
                <div className={styles.typing__dot}></div>
                <div className={styles.typing__dot}></div>
                <div className={styles.typing__dot}></div>
            </div>
        </div>
    );
};

export default UserTyping;
