import UserAvatar from '../UserAvatar';
import type { File } from '../../types/Comment/File';
import { getFileType } from '../../../../helpers/utils';
import CustomImage from '../CustomImage';

type User = {
    uid: string;
    userType: string;
    meta: {
        companyName: string;
        logo: {
            name: string;
            url: string;
        };
    };
};

type CommentType = {
    sender: User;
    receiver: User;
    content: {
        message: string;
        files: File[];
    };
};

const Comment: React.FC<CommentType> = ({ sender, receiver, content }) => {
    const renderFile = (url: string, alt: string) => {
        const ext = getFileType(url);
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
            return <CustomImage className="w-10 h-10 object-cover rounded" src={url} alt={alt} />;
        }
    };

    return (
        <div className="flex mb-7">
            <div className="flex gap-3.5">
                <UserAvatar name="User" width={55} height={55} src={sender.meta.logo.url} />
                <div className="pt-2">
                    <h4 className="font-bold text-dh-gray-800 mb-1.5">{receiver.meta.companyName}</h4>
                    <h4 className="text-dh-gray-800 font-normal">{content.message}</h4>
                    {content?.files?.length ? (
                        <div className="flex gap-2 pt-2">
                            {content.files.map((file, index) => (
                                <div key={index} className="w-10 h-10">
                                    {renderFile(file.url, file.name)}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Comment;
