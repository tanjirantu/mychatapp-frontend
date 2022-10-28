import httpAdapter from '../../config/http';
import { OtpInput } from './types/OtpInput';

const getOtp = async (otpInput: OtpInput) => {
    try {
        const response = await httpAdapter.post('/get-otp', otpInput);
        if (response.status === 200) {
            return response.data.result;
        }
        return null;
    } catch (ex) {
        console.error(ex);
    }
};

export default getOtp;
