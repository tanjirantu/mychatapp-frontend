import { useRouter } from 'next/router';
import React from 'react';
import { MeesageHead } from '../../../../api/messages/Response';
import { setActiveHeads } from '../../../../reducers/messageReducer';
import UserAvatar from '../../../common/components/UserAvatar';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import styles from './MessageLists.module.scss';
const List: React.FC<MeesageHead> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { activeMessagehead, activeFriends } = useAppSelector(
        (state) => state.messages
    );
    const { data } = useAppSelector((state) => state.user);

    const selectMessageHead = () => {
        dispatch(setActiveHeads(props));
        router.push(`/messages?uid=${props.uid}`);
    };
    return (
        <div
            className={`${styles.list}
        ${props?.uid === activeMessagehead?.uid ? styles.active : ''}
        flex items-center gap-3 cursor-pointer`}
            onClick={selectMessageHead}
        >
            <UserAvatar
                activeIndicator
                // isActive={activeFriends[props.friends[0].uid || '']}
                className="flex-shrink-0"
                width={45}
                height={45}
                name={''}
                src={''}
            />
            <div className="w-full">
                <div className="flex justify-between items-start">
                    <h5 className="text-dh-gray-800 mb-1.5">""</h5>
                </div>
            </div>
        </div>
    );
};

export default List;
