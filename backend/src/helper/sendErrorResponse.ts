import ErrorCode  from './errorCode';

export default (errorEnum: string) => {

    console.info('⚠️', JSON.stringify(errorEnum, null, 4));
    return ErrorCode(<string>errorEnum);
};