import React, { useState } from 'react';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import Dialog from '../../../common/components/Dialog';

import 'react-phone-input-2/lib/style.css';
import useDebounce from '../../../common/hooks/useDebounce';
import { useGetUsersQuery } from '../../../../api/users';

type PhoneInput = {
    phone: string;
    countryData: CountryData;
};

const CreateContactModal = () => {
    const [contact, setContact] = useState<PhoneInput>({
        phone: '',
        countryData: {
            dialCode: '',
            countryCode: '',
            format: '',
            name: '',
        },
    });

    const value = useDebounce(contact.phone, 700);

    const { isLoading, data } = useGetUsersQuery(
        {
            params: {
                phone: value ? value : '',
            },
        },
        { skip: !value.replace(contact.countryData.dialCode, '') }
    );

    return (
        <Dialog
            className="max-w-xl rounded-md  p-5"
            open
            onClose={() => console.log('')}
        >
            <div>
                <div className="flex justify-between ">
                    <h3>Create Contact</h3>
                    <div className="cursor-pointer select-none  ">
                        <img src="/static/assets/icons/clear.svg" alt="" />
                    </div>
                </div>

                <div>
                    <div className="mb-7 mt-6">
                        <PhoneInput
                            inputStyle={{
                                border: 'none',
                                backgroundColor: '#F7F7F7',

                                padding: '25px 0px 25px 60px',
                                width: '100%',
                                boxShadow: '0 1px 0 0 #e8e8e8',
                            }}
                            buttonStyle={{
                                border: 'none',
                                width: '60px',
                            }}
                            country={'bd'}
                            value={contact.phone}
                            onChange={(phone, countryData: CountryData) =>
                                setContact({ phone, countryData })
                            }
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default CreateContactModal;
