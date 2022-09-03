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
                isActive={activeFriends[props.friends[0].uid || '']}
                className="flex-shrink-0"
                width={45}
                height={45}
                name={
                    props.friends[0].meta?.firstName &&
                    props.friends[0].meta?.lastName
                        ? `${props.friends[0].meta.firstName} ${props.friends[0].meta.firstName}`
                        : `${props.friends[0].contact.phoneWithDialCode}`
                }
                src={props.friends[0].meta?.logo?.url || ''}
            />
            <div className="w-full">
                <div className="flex justify-between items-start">
                    <h5 className="text-dh-gray-800 mb-1.5">
                        {props.friends[0].meta?.firstName &&
                        props.friends[0].meta?.lastName
                            ? `${props.friends[0].meta.firstName} ${props.friends[0].meta.firstName}`
                            : `${props.friends[0].contact.phoneWithDialCode}`}
                    </h5>
                </div>
                <p className="text-xs font-normal text-dh-gray-700 whitespace-nowrap text-ellipsis overflow-hidden">
                    {props?.lastMessage?.files?.length ||
                    props?.lastMessage?.text ? (
                        <>
                            {props?.lastMessage?.receiver?.uid !== data?.uid
                                ? 'You'
                                : `${props.friends[0].meta.companyName}`}
                            :{' '}
                            {props?.lastMessage?.content?.files?.length
                                ? 'sent an attachment'
                                : props?.lastMessage?.content?.message}
                        </>
                    ) : (
                        'Start conversation'
                    )}
                </p>
            </div>
        </div>
    );
};

export default List;
