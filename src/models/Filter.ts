export enum FilterUnits {
    NO_FILTER = 'no filter',
    BRAND = 'brand',
    PRICE = 'price',
    PRODUCT = 'product'
}

export enum FilterValues {
    'price' = 'Цена',
    'product' = 'Наименование',
    'brand' = 'Бренд',
    'no filter' = '--Без фильтра--'
}

export type Filter = {
    [K in FilterUnits]?: K extends 'price' ? number : string | undefined;
};

