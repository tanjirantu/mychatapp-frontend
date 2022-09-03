import { AxiosError } from 'axios';

export default (err: AxiosError) => {
    // console.error("Error response:");
    // console.error(err.response.data); //
    // console.error(err.response.status); //
    // console.error(err.response.headers); //
    return { data: null, error: err.toString() };
};
