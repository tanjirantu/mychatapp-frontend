import React, { useState } from 'react';
import Dialog from '../Dialog';

import 'react-phone-input-2/lib/style.css';
import useDebounce from '../../hooks/useDebounce';
import { useGetUsersQuery } from '../../../../api/users';
import UserAvatar from '../UserAvatar';
import { createRoomMutation } from '../../../../api/messages';
import {
    setActiveHeads,
    setMessageHeads,
} from '../../../../reducers/messageReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import TextInput from '../TextInput';

interface ICreateContactModal {
    onClose: () => void;
    isOpen: boolean;
}

const CreateContactModal: React.FC<ICreateContactModal> = ({
    isOpen,
    onClose,
}) => {
    const [search, setSearch] = useState('');

    const dispatch = useAppDispatch();
    const { data: userData } = useAppSelector((state) => state.user);
    const { messageHeads } = useAppSelector((state) => state.messages);
    const value = useDebounce(search, 700);

    const { isFetching, data } = useGetUsersQuery(
        {
            params: {
                phone: value ? value : '',
            },
        },
        { skip: value === '' ? true : false }
    );

    const handleCreateRoom = async (uid: string) => {
        if (userData?.uid === undefined) return;
        try {
            const response = await createRoomMutation({
                label: uid,
                users: [uid],
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

    return (
        <Dialog
            className="max-w-xl rounded-md  p-5"
            open={isOpen}
            onClose={onClose}
        >
            <div>
                <div className="flex justify-between ">
                    <h3>Search Contact</h3>
                    <div
                        onClick={onClose}
                        className="cursor-pointer select-none  "
                    >
                        <img src="/static/assets/icons/clear.svg" alt="" />
                    </div>
                </div>

                <div>
                    <div className=" mb-2 mt-6">
                        <TextInput
                            className="mt-8"
                            label="Search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
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
                                onClick={() => handleCreateRoom(user.uid)}
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
            </div>
        </Dialog>
    );
};

export default CreateContactModal;
