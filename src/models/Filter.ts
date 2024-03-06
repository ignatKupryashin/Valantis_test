export enum FilterItem {
    BRAND = 'brand',
    ID = 'id',
    PRICE = 'price',
    PRODUCT = 'product'
}

export interface IFilter {
    brand?: string,
    id?: string,
    price?: number,
    product?: string
}

