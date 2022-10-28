import httpAdapter from '../../config/http';

const getUser = async () => {
    try {
        const response = await httpAdapter.get('/user/me');
        if (response.status === 200) {
            return response.data.result;
        }
        return null;
    } catch (ex) {
        console.error(ex);
    }
};

export default getUser;
