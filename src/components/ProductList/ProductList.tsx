import React from 'react';
import {IValantisItem} from "../../models/IValantisItem";
import ProductItem from "./ProductItem/ProductItem";

interface ItemListProps {
    data: IValantisItem[]
    startNumber: number
}


const ProductList = (props: ItemListProps) => {

    return (
        <div>
            <ol start={props.startNumber}>
                {props.data.map((item) =>   <li><ProductItem item={item} key={item.id}/></li>)}
            </ol>
        </div>
    );
};

export default ProductList;