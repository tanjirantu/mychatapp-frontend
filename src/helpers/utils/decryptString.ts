import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_ENCRYPTOR_SECRET;

const decryptString = (str: string) => {
    if (secretKey) {
        const decodedStr = decodeURIComponent(str);
        return AES.decrypt(decodedStr, secretKey).toString(enc.Utf8);
    }
    return null;
};

export default decryptString;
