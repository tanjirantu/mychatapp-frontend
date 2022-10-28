import httpAdapter from '../../config/http';
import { SignInInput } from './types/SignInInput';

const signIn = async (signInInput: SignInInput) => {
    try {
        const response = await httpAdapter.post('/user-signin', signInInput);
        if (response.data.statusCode === 200) {
            return response.data.result;
        }
        return null;
    } catch (ex) {
        console.error(ex);
    }
};

export default signIn;
