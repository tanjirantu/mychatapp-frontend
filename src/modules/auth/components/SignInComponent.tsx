import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from './SignIn.module.scss';
import classNames from 'classnames';

import Button from '../../common/components/Button';
import ContainerComponent from '../../common/components/ContainerComponent';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import { getOtp, signIn } from '../../../api/auth';
import Dialog from '../../common/components/Dialog';
import { SignInInput } from '../../../api/auth/types/SignInInput';
import { OtpInput } from '../../../api/auth/types/OtpInput';
import Link from 'next/link';
import { setToken } from '../../../libs/authClient';
import toast, { Toaster } from 'react-hot-toast';
import Toast from '../../common/components/Toast';

type CountryData = {
    dialCode: string;
    countryCode: string;
    format: string;
    name: string;
};

type PhoneInput = {
    phone: string;
    countryData: CountryData;
};

const SignInComponent = () => {
    const router = useRouter();
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [deviceUuid, setDeviceUuid] = useState('');
    const [contact, setContact] = useState<PhoneInput>({
        phone: '',
        countryData: {
            dialCode: '',
            countryCode: '',
            format: '',
            name: '',
        },
    });

    const onOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const onLoginBtnSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const {
            countryData: { dialCode },
            phone,
        } = contact;

        const otpInput: OtpInput = {
            dialCode,
            phone: phone.split(dialCode)[1],
        };

        if (contact.phone === '') return setPhoneError('error');
        const { deviceUuid } = await getOtp(otpInput);
        if (deviceUuid) {
            setDeviceUuid(deviceUuid);
            setIsOtpModalOpen(true);
        }
    };

    const onOtpBtnSubmit = async () => {
        const {
            countryData: { dialCode },
            phone,
        } = contact;

        const signInInput: SignInInput = {
            otp,
            deviceUuid,
            dialCode,
            phone: phone.split(dialCode)[1],
        };
        const response = await signIn(signInInput);

        if (response) {
            setIsOtpModalOpen(false);
            setToken({ token: response.token });
            router.push('/');
            return;
        }

        toast.custom(() => (
            <Toast
                title="Error!"
                type="error"
                message="OTP is not correct, try again"
            />
        ));
    };

    return (
        <>
            <ContainerComponent>
                <Toaster position="bottom-center" containerClassName="mb-10" />
                <div className="w-full h-screen flex">
                    <div
                        className={classNames(
                            `${styles.formWrapper} bg-white rounded`
                        )}
                    >
                        <div className="text-4xl font-bold leading-normal tracking-normal not-italic text-black">
                            Get Started
                        </div>
                        <div className="flex items-center mb-5 mt-2">
                            <div className="mr-1 text-lg font-medium">
                                New user?
                            </div>
                            <Link href="/signup">
                                <a className="text-lg font-medium text-teal-700 cursor-pointer">
                                    Create an account
                                </a>
                            </Link>
                        </div>
                        <form onSubmit={onLoginBtnSubmit}>
                            <div className="mb-7">
                                <PhoneInput
                                    inputStyle={{
                                        backgroundColor: '#F7F7F7',
                                        border: `${
                                            phoneError
                                                ? '2px solid red'
                                                : 'none'
                                        }`,
                                        padding: '25px 0px 25px 60px',
                                        width: '380px',
                                        boxShadow: '0 1px 0 0 #e8e8e8',
                                    }}
                                    buttonStyle={{
                                        width: '50px',
                                        border: `${
                                            phoneError
                                                ? '2px solid red'
                                                : 'none'
                                        }`,
                                    }}
                                    country={'bd'}
                                    value={contact.phone}
                                    onChange={(
                                        phone,
                                        countryData: CountryData
                                    ) => setContact({ phone, countryData })}
                                />
                            </div>
                            <Button
                                size="lg"
                                fullWidth={true}
                                color="primary"
                                loading={false}
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </form>
                        <div className="text-xs font-medium mt-6 text-dh-gray-600 tracking-wider text-center leading-snug">
                            Privacy Policy & Terms of Service.
                        </div>
                    </div>
                </div>
            </ContainerComponent>
            <Dialog
                className="w-1/3 rounded shadow-xl"
                open={isOtpModalOpen}
                onClose={() => setIsOtpModalOpen(false)}
            >
                <div className="p-8">
                    <h4 className="text-lg leading-normal tracking-normal not-italic text-black">
                        One time password
                    </h4>
                    <p className="font-normal pt-1">
                        Please check your phone.{' '}
                        <strong className="text-teal-700">Resend</strong>
                    </p>
                    <div className="mt-4 flex w-full">
                        <input
                            onChange={onOtpChange}
                            type="text"
                            className="w-3/4 focus:outline-none border rounded p-2"
                        />
                        <Button
                            onClick={() => onOtpBtnSubmit()}
                            className="w-1/4"
                            size="lg"
                            fullWidth={true}
                            color="primary"
                            loading={false}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default SignInComponent;
