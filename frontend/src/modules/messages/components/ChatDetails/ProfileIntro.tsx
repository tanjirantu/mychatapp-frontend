import Link from 'next/link';
import React from 'react';
import Button from '../../../common/components/Button';
import UserAvatar from '../../../common/components/UserAvatar';
import { useAppSelector } from '../../../common/hooks';
import styles from './ChatDetails.module.scss';

const ProfileIntro = () => {
    const { activeMessagehead } = useAppSelector((state) => state.messages);

    return (
        <div className={`${styles.profile_intro} text-center py-7 flex flex-col items-center px-5`}>
            <UserAvatar
                width={80}
                height={80}
                name="Tusher"
                src={activeMessagehead?.friends[0]?.meta?.logo?.url || ''}
            />
            <h3 className="mt-2.5">{activeMessagehead?.friends[0]?.meta?.companyName || ''}</h3>
            <p className="mt-2 text-dh-gray-700 font-normal">Dhaka, Bangladesh</p>
            <p className="mt-2 text-dh-gray-800 font-normal mb-5">Hoodies | Trousers | Jackets | Shirts | Denim</p>
            <div className="flex justify-center gap-2">
                <Link href={`agreements?pid=${activeMessagehead?.friends[0]?.uid || ''}`}>
                    <a>
                        <Button size="sm">Agreement</Button>
                    </a>
                </Link>
                <Link href={`/manufacturer/${activeMessagehead?.friends[0]?.uid || ''}`}>
                    <a>
                        <Button color="secondaryGreen" size="sm">
                            View profile
                        </Button>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default ProfileIntro;
