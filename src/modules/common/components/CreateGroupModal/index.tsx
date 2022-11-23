import React, { useState } from 'react';
import { createRoomMutation } from '../../../../api/messages';
import { useGetUsersQuery } from '../../../../api/users';
import { UserResponse } from '../../../../api/users/UserResponse';
import { validateForm } from '../../../../helpers/utils';
import {
    setActiveHeads,
    setMessageHeads,
} from '../../../../reducers/messageReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useDebounce from '../../hooks/useDebounce';
import PlusIcon from '../../icons/PlusIcon';
import Button from '../Button';
import Dialog from '../Dialog';

import TextInput from '../TextInput';
import UserAvatar from '../UserAvatar';

interface ICreateContactModal {
    onClose: () => void;
    isOpen: boolean;
}

const CreateGroupModal: React.FC<ICreateContactModal> = ({
    isOpen,
    onClose,
}) => {
    const [formError, setFormError] = useState<any>({});
    const [search, setSearch] = useState('');
    const [groupName, setGroupName] = useState('');
    const [users, setUsers] = useState<UserResponse[]>([]);
    const dispatch = useAppDispatch();
    const { data: userData } = useAppSelector((state) => state.user);
    const { messageHeads } = useAppSelector((state) => state.messages);
    const value = useDebounce(search, 700);

    const { isFetching, data } = useGetUsersQuery(
        {
            params: {
                search: value ? value : '',
            },
        },
        { skip: value === '' ? true : false }
    );

    const handleCreateRoom = async () => {
        if (userData?.uid === undefined) return;

        const formError = validateForm({
            groupName: groupName,
            search: !!users.length,
        });

        if (Object.keys(formError).length !== 0) {
            return setFormError(formError);
        }

        try {
            const response = await createRoomMutation({
                label: groupName,
                users: users.map((user) => user.uid),
            });

            if (response.statusCode === 200) {
                const _messageHeads = messageHeads.results.filter(
                    (data) => data.uid !== response.result.uid
                );

                dispatch(
                    setMessageHeads({
                        results: [response.result, ..._messageHeads],
                        count: messageHeads.count,
                    })
                );

                dispatch(setActiveHeads(response.result));

                onClose();
            }
        } catch (error) {}
    };

    const handleSelectUser = (user: UserResponse) => {
        const _users = [...users];
        const findIndex = _users.findIndex((__user) => __user.uid === user.uid);
        if (findIndex < 0) {
            _users.push(user);
        } else {
            _users.splice(findIndex, 1);
        }

        setUsers(_users);
    };
    return (
        <Dialog
            className="max-w-xl rounded-md  p-5"
            open={isOpen}
            onClose={onClose}
        >
            <div>
                <div className="flex justify-between ">
                    <h3>Create Group</h3>

                    <div
                        onClick={onClose}
                        className="cursor-pointer select-none  "
                    >
                        <img src="/static/assets/icons/clear.svg" alt="" />
                    </div>
                </div>

                <div>
                    {users.length ? (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {users.map((user) => {
                                return (
                                    <div
                                        className="flex items-center gap-3 bg-gray-200 bg-opacity-75 p-1 rounded-3xl"
                                        key={user.uid}
                                    >
                                        <UserAvatar
                                            name={user.firstName}
                                            height={32}
                                            width={32}
                                            src={user.logo}
                                        />
                                        <div className="pr-3 flex gap-2 items-center">
                                            <p>
                                                {user.firstName +
                                                    ' ' +
                                                    user.lastName}
                                            </p>
                                            <div
                                                onClick={() =>
                                                    handleSelectUser(user)
                                                }
                                                className="cursor-pointer"
                                                style={{
                                                    transform: 'rotate(45deg)',
                                                }}
                                            >
                                                <PlusIcon className="w-5 h-5 overflow-hidden" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                    <div className="mb-2">
                        <TextInput
                            error={formError['groupName']}
                            className="mt-8"
                            label="Group Name"
                            value={groupName}
                            onChange={(event) => {
                                setFormError({
                                    ...formError,
                                    groupName: false,
                                });
                                setGroupName(event.target.value);
                            }}
                        />
                    </div>
                    <div className=" mb-2 mt-6">
                        <TextInput
                            error={formError['search']}
                            className="mt-8"
                            label="Select user by search"
                            value={search}
                            onChange={(event) => {
                                setFormError({
                                    ...formError,
                                    search: false,
                                });
                                setSearch(event.target.value);
                            }}
                        />
                    </div>
                </div>

                {data?.result.users.length && isFetching !== true ? (
                    <h5 className="mb-2 mt-4">Select Contact </h5>
                ) : null}

                <div className="flex gap-2 flex-col">
                    {data?.result.users.map((user) => {
                        return (
                            <div
                                onClick={() => handleSelectUser(user)}
                                key={user.uid}
                                className="bg-gray-100 flex gap-3 hover:bg-opacity-100 items-center cursor-pointer select-none px-3 py-2 bg-opacity-60 rounded-md "
                            >
                                <UserAvatar
                                    className="border"
                                    height={40}
                                    width={40}
                                    src="/static/assets/images/avatar.png"
                                    name=""
                                />
                                <div>
                                    <p className="text-base ">
                                        {user.firstName + ' ' + user.lastName}
                                    </p>
                                    <p className="text-sm text-dh-gray-700">
                                        {user.contact.phoneWithDialCode}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="div flex justify-end">
                    <Button onClick={handleCreateRoom} className="mt-6">
                        Create
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default CreateGroupModal;
