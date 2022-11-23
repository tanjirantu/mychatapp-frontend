import http from '../../../../config/http';
import React, { useMemo } from 'react';
import FileUploadInput from '../../../common/components/FileUploadInput';
import UserAvatar from '../../../common/components/UserAvatar';
import { useAppSelector } from '../../../common/hooks';
import useFileUpload from '../../../common/hooks/useFileUpload';
import styles from './MessageLists.module.scss';

const Profile = () => {
    const { data } = useAppSelector((state) => state.user);

    const previousUploadedFiles = useMemo(() => {
        return data?.logo?.name ? [{ url: data.logo.url, name: '' }] : [];
    }, [data?.uid]);
    const { files, onChange, onUpload } = useFileUpload({
        previousUploadedFiles: previousUploadedFiles,
        multiple: false,
    });

    const handleFileInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = onChange(event);

        const fileUpoadResponse = await onUpload(files);
        http.put('/user/me', {
            logo: fileUpoadResponse[0],
        });
    };

    return (
        <div
            className={`h-20 items-center mb-3 mt-3  px-5 flex ${styles.profile}`}
        >
            <FileUploadInput onChange={handleFileInputChange} multiple={false}>
                <div className="relative w-full h-full overflow-hidden rounded-full">
                    <UserAvatar
                        className="border"
                        width={65}
                        height={65}
                        name="Tusher"
                        src={files[0]?.url || ''}
                    />
                    <div className="absolute h-6 flex justify-center text-white text-sm font-normal  bg-opacity-30 bg-black w-full left-0  right-0 bottom-0">
                        Edit
                    </div>
                </div>
            </FileUploadInput>
            <div>
                {data !== null ? (
                    <div>
                        <h4 className="mb-2 text-dh-gray-800">
                            {data?.firstName
                                ? data.firstName
                                : '' + ' ' + data?.lastName
                                ? data?.lastName
                                : ''}
                        </h4>
                        <p className="text-dh-gray-700">
                            {data?.contact.phoneWithDialCode}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
