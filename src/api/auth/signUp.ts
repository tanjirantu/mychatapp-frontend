import httpAdapter from '../../config/http';
import { SignUpInput } from './types/SignUpInput';

const signUp = async (signUpInput: SignUpInput) => {
    try {
        const response = await httpAdapter.post('/user-signup', signUpInput);
        if (response.data.statusCode === 200) {
            return response.data.result;
        }
        return null;
    } catch (ex) {
        console.error(ex);
    }
};

export default signUp;
