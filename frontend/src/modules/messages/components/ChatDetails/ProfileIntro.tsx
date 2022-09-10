import React from 'react';
import Button from '../../../common/components/Button';
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

                <div className="flex justify-center gap-2">
                    <Button className="mt-6" size="md">
                        Create new contact
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProfileIntro;
