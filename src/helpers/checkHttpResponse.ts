import { AxiosResponse } from 'axios';

export default (response: AxiosResponse) => {
    if (!response) return { data: null, error: 'Server not responding. Please try agin!' };
    return {
        data: response.data,
        error: null,
    };
};
