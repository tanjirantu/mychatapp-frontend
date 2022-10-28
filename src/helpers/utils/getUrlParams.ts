import removeNullOrEmpty from '../removeNullOrEmpty';

interface Params {
    [key: string]: any;
}

const getUrlParams = (params: Params | undefined): string => {
    const _params = removeNullOrEmpty(params || {});

    if (_params === undefined) return '';

    let str = '';
    Object.keys(_params).forEach((key) => {
        str += `${key}=${_params[key]}&`;
    });
    return str;
};

export default getUrlParams;
