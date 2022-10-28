import httpAdapter from '../../config/http';

const getDeviceUuid = async () => {
    try {
        const response = await httpAdapter.get('/deviceuid');
        if (response.status === 200) {
            return response.data.result;
        }
        return null;
    } catch (ex) {
        console.error(ex);
    }
};

export default getDeviceUuid;
