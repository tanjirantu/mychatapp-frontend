import React, { useState } from 'react';
import CreateContactModal from '../../../common/components/CreateContactModal';
import CreateGroupModal from '../../../common/components/CreateGroupModal';
import Dropdown from '../../../common/components/Dropdown';
import PlusIcon from '../../../common/icons/PlusIcon';

const OverflowOption = () => {
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="absolute bottom-6 right-6 z-50">
            <CreateContactModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <CreateGroupModal
                isOpen={groupModalOpen}
                onClose={() => setGroupModalOpen(false)}
            />
            <Dropdown className="relative">
                <Dropdown.Menu>
                    {({ toggle, open }) => {
                        return (
                            <div
                                onClick={() => toggle(!open)}
                                className=" w-14 h-14 cursor-pointer flex justify-center items-center bg-teal-700 rounded-full"
                            >
                                <PlusIcon
                                    style={{
                                        transition: "200ms all",
                                        transform: open
                                            ? 'rotate(45deg)'
                                            : 'rotate(0deg)',
                                    }}
                                    className="w-8 h-8 text-white fill-current"
                                />
                            </div>
                        );
                    }}
                </Dropdown.Menu>
                <Dropdown.Item>
                    {({}) => {
                        return (
                            <div className="absolute text-base font-medium text-dh-gray-800 rounded-xl w-[200px] right-2 p-1.5 bg-white shadow-lg  bottom-[calc(100%+20px)]">
                                <div
                                    onClick={() => setModalOpen(true)}
                                    className="w-full cursor-pointer rounded-md hover:bg-gray-100 px-5 py-2.5"
                                >
                                    Create Contact
                                </div>
                                <div
                                    onClick={() => setGroupModalOpen(true)}
                                    className="w-full cursor-pointer rounded-md  hover:bg-gray-100 px-5 py-2.5"
                                >
                                    Create Group
                                </div>
                            </div>
                        );
                    }}
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default OverflowOption;
