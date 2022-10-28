import { getFileType } from '../../../../helpers/utils';
import { IFileThumb } from './IFileThumb';

const FileThumb: React.FC<IFileThumb> = ({ url, name, onClick }): JSX.Element => {
    const renderFileThumb = () => {
        const ext = getFileType(url);
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
            return (
                <img
                    className="w-full h-full cursor-pointer object-cover rounded"
                    src={url}
                    alt={name}
                    onClick={() => onClick(ext)}
                />
            );
        }
        if (ext === 'pdf') {
            return (
                <a href={url} download target="_blank" rel="noreferrer">
                    <div className="w-full h-[140px] p-4 bg-[#f2f2f2] cursor-pointer rounded-md">
                        <div className="bg-white rounded-full w-12 h-12 flex justify-center items-center">
                            <img
                                className="w-6 h-6 object-cover rounded"
                                src="/static/assets/icons/pdf.svg"
                                // onClick={() => onClick(ext)}
                            />
                        </div>
                        <span className="text-[#2a2a2e] font-medium mt-7">{name}</span>
                    </div>
                </a>
            );
        }
        if (ext === 'doc' || ext === 'docx') {
            return (
                <a href={url} download target="_blank" rel="noreferrer">
                    <div className="w-full h-[140px] p-4 bg-[#f2f2f2] cursor-pointer rounded-md">
                        <div className="bg-white rounded-full w-12 h-12 flex justify-center items-center">
                            <img
                                className="w-6 h-6 object-cover rounded"
                                src="/static/assets/icons/word.svg"
                                onClick={() => onClick(ext)}
                            />
                        </div>
                        <span className="text-[#2a2a2e] font-medium mt-7">{name}</span>
                    </div>
                </a>
            );
        }
    };
    return <>{renderFileThumb()}</>;
};

export default FileThumb;
