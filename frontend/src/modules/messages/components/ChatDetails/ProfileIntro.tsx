import React from 'react';
import UserAvatar from '../../../common/components/UserAvatar';

import styles from './ChatDetails.module.scss';

const ProfileIntro = () => {
    return (
        <>
            <div
                className={`${styles.profile_intro} text-center py-7 flex flex-col items-center px-5`}
            >
                <UserAvatar
                    width={80}
                    height={80}
                    name="Tusher"
                    className="border"
                    src={'/static/assets/images/avatar.png'}
                />
            </div>
        </>
    );
};

export default ProfileIntro;
