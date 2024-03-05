import {MainApi} from "../../http/MainApi";
import {AxiosResponse} from "axios";


interface ValantisResponse {
    result: any
}

export class ProductService {



    static async getAllItems(): Promise<AxiosResponse<ValantisResponse>> {
        return await MainApi.post('', {
            "action": "get_ids"
        });
    }

    static async getItems(ids : string[]): Promise<AxiosResponse<ValantisResponse>> {
        return await MainApi.post('', {
            "action": "get_items",
            "params": {"ids": [...ids]}
        });
    }
}