import React from 'react';
import {IValantisItem} from "../../models/IValantisItem";
import ProductItem from "./ProductItem/ProductItem";

interface ItemListProps {
    data: IValantisItem[]
}


const ProductList = (props: ItemListProps) => {

    return (
        <div>
            {props.data.map((item) => <ProductItem item={item}/>)}
        </div>
    );
};

export default ProductList;