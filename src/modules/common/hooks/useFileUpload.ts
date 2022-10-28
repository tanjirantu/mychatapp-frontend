import { useState, useEffect } from 'react';
import uploadAsset from '../../../helpers/uploadAsset';
import { getFileType } from '../../../helpers/utils';

interface IUseFileUpload {
    previousUploadedFiles: { name: string; url: string }[];
    multiple?: boolean;
}

interface IFile extends Partial<File> {
    name?: string;
    url?: string;
}

interface IFileWithType {
    type: string;
    name: string;
    url: string;
}

interface IUseFileUploadReturn {
    files: IFileWithType[];
    onUpload: (files?: IFile[]) => Promise<{ name: string; url: string }[]>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => IFile[];
    clear: () => void;
    onRemove: (index: number) => void;
}

const useFileUpload = ({
    previousUploadedFiles,
    multiple = true,
}: IUseFileUpload): IUseFileUploadReturn => {
    const [files, setFiles] = useState<IFile[]>([]);

    useEffect(() => {
        if (previousUploadedFiles.length) {
            setFiles([...previousUploadedFiles]);
        }
    }, [previousUploadedFiles]);

    const clear = () => {
        setFiles([]);
    };

    const onUpload = async (
        uploadFile?: IFile[]
    ): Promise<{ name: string; url: string }[]> => {
        const _files = uploadFile
            ? uploadFile
            : files.filter((file) => file.lastModified);

        const response = await Promise.all(
            _files.map(async (file) => {
                return await uploadAsset(file as File);
            })
        );

        const filterResponse = response
            .filter((file) => file.isError === false)
            .map(({ filename, url }) => ({ name: filename, url: url || '' }));
        const previousFiles = files
            .filter((file) => !file.lastModified)
            .map(({ name, url }) => ({ name: name || '', url: url || '' }));

        if (uploadFile) {
            return filterResponse;
        }

        return [...previousFiles, ...filterResponse];
    };

    const onChange = ({
        currentTarget: input,
    }: React.ChangeEvent<HTMLInputElement>) => {
        if (input.files === null) return [];
        if (multiple) {
            setFiles([...files, ...input.files]);
            return [...files, ...input.files];
        } else {
            setFiles([...input.files]);
            return [...input.files];
        }
    };

    const onRemove = (index: number) => {
        const _files = [...files];
        _files.splice(index, 1);
        setFiles(_files);
    };

    const genaretedPreviousUploadedTypes = (file: any): IFileWithType => {
        const ext = getFileType(file.url);
        return {
            ...file,
            type: ext,
        };
    };

    const genaretedSelectFilesTypeAndUrl = (): IFileWithType[] => {
        return files.map((file) => {
            if (file.lastModified) {
                const type = getFileType(file.name ? file.name : '') || '';
                const url = URL.createObjectURL(file as File);
                const name = file.name ? file.name : '';

                return {
                    type,
                    url,
                    name,
                };
            } else {
                return genaretedPreviousUploadedTypes(file);
            }
        });
    };

    return {
        files: genaretedSelectFilesTypeAndUrl(),
        onUpload,
        clear,
        onChange,
        onRemove,
    };
};

export default useFileUpload;
