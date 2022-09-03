import React from 'react';
import UserAvatar from '../../../common/components/UserAvatar';
import { useAppSelector } from '../../../common/hooks';
import styles from './MessageLists.module.scss';
const Profile = () => {
    const { data } = useAppSelector((state) => state.user);

    return (
        <div className={`h-20 items-center  px-5 flex ${styles.profile}`}>
            <UserAvatar width={50} height={50} name="Tusher" src={data?.meta?.logo?.url || ''} />
            <h4>{data?.meta?.companyName || ''}</h4>
        </div>
    );
};

export default Profile;
