import {MainApi} from "../../http/MainApi";
import {AxiosResponse} from "axios";
import {IValantisItem} from "../../models/IValantisItem";
import {FilterItem, IFilter} from "../../models/Filter";


interface ValantisResponse<T> {
    result: T
}

export interface getFieldsParams{
    "field"?: FilterItem,
    "offset"?: number,
    "limit"?: number
}

export class ProductService {

    static async getAllItemsIds(): Promise<AxiosResponse<ValantisResponse<string[]>>> {
        return await MainApi.post('', {
            "action": "get_ids"
        });
    }

    static async getFilteredItemsIds(filter: IFilter): Promise<AxiosResponse<ValantisResponse<string[]>>> {
        return await MainApi.post('', {
            "action": "filter",
            // "filter": filter
            "params": {"product": "изумрудами", "price": 33700}
        })
    }

    static async getProducts(ids : string[]): Promise<AxiosResponse<ValantisResponse<IValantisItem[]>>> {
        return await MainApi.post('', {
            "action": "get_items",
            "params": {"ids": [...ids]}
        });
    }


    // Придумать как типизировать ответ
    static async getFields(params: getFieldsParams): Promise<AxiosResponse<ValantisResponse<any[]>>> {
        return await MainApi.post('', {
           "action": "get_fields",
            "params": params
        })
    }

}