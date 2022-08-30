import { isNullOrEmptyArray, isArray } from './utils';
import ErrorCode  from './errorCode';

export default (result: any, statusCode = 200, message = 'SUCCESS', responseEmptyArray = false) => {

    try {
        const response = { message, statusCode };
        if (result === true) {
            return response;
        }
        else if (responseEmptyArray) {
            return {
                ...response,
                result
            };
        }
        else if (isNullOrEmptyArray(result)) {
            return ErrorCode();
        }
        else if (!isNullOrEmptyArray(result)) {
            //logResult(result);
            return {
                ...response,
                result
            };
        }
        
        return response;
    }
    catch (err) {

        console.error('FAILED TO SEND RESPONSE');
        console.error(err);
    }
};

const logResult = (result: any) => {

    try {

        console.log(`💕 Sent ${isArray(result) ? 'With Length ' + result.length : ''}`);
    }
    catch (err) {

        console.error(err);
    }
};