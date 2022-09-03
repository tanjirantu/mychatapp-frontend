import axios from '../../../config/http';
import { Buyer } from '../types/Buyer';

interface IBuyerResponse {
    result: Buyer;
    statusCode: number;
}

const actionGetBuyerProfile = async (): Promise<Buyer | void> => {
    try {
        const response = await axios.get<IBuyerResponse>(`/buyer/me`);
        if (response.data.statusCode === 200) {
            return response.data.result;
        }
    } catch (error: any) {
        return error;
    }
};

export default actionGetBuyerProfile;
