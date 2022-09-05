import React, { useState } from 'react';
import Button from '../../../common/components/Button';
import UserAvatar from '../../../common/components/UserAvatar';
import CreateContactModal from '../CreateContactModal';
import styles from './ChatDetails.module.scss';

const ProfileIntro = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <CreateContactModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
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
                    <Button
                        onClick={() => setModalOpen(true)}
                        className="mt-6"
                        size="md"
                    >
                        Create new contact
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProfileIntro;
