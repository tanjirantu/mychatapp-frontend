import axios from '../../../config/http';
import { Buyer } from '../types/Buyer';

interface IBuyerResponse {
    result: Buyer;
    statusCode: number;
}

const actionLogoutBuyer = async (): Promise<Buyer | void> => {
    try {
        const response = await axios.get<IBuyerResponse>(`/logout-buyer`);
        if (response.data.statusCode === 200) {
            return response.data.result;
        }
    } catch (error: any) {
        console.log(error.toString());
    }
};

export default actionLogoutBuyer;
