import getFileType from './utils/getFileType';
import axios from '../config/http';
import convertToBlob from './utils/convertToBlob';

const uploadAsset = async (file: File) => {
    try {
        const filename = getFileType(file.name);
        const { name, url } = await axios
            .get(`/uploads/signed-url?ext=${filename}`)
            .then((response: any) => response.data?.result);
        const blobData = await convertToBlob(file);
        await fetch(url, {
            method: 'PUT',
            body: blobData,
        });
        return {
            isError: false,
            filename: name,
            url: `${process.env.NEXT_PUBLIC_SPACES_URL}/${name}`,
        };
    } catch (error) {
        return {
            isError: true,
        };
    }
};

export default uploadAsset;
