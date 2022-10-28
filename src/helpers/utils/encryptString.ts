import AES from 'crypto-js/aes';

const secretKey = process.env.NEXT_PUBLIC_ENCRYPTOR_SECRET;

const encryptString = (str: string) => {
    if (secretKey) {
        const cipherText = AES.encrypt(str, secretKey);
        return encodeURIComponent(cipherText.toString());
    }
    return null;
};

export default encryptString;
