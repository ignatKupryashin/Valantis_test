import React from 'react';
import {IValantisItem} from "../../../models/IValantisItem";

interface ProductItemProps {
    item: IValantisItem;
}

const ProductItem = (props: ProductItemProps) => {
    return (
        <div>
            {props.item.id} - {props.item.brand} - {props.item.product} - {props.item.price}
        </div>
    );
};

export default ProductItem;