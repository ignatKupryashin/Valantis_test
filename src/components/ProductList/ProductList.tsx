import React from 'react';
import {IValantisItem} from "../../models/IValantisItem";
import ProductItem from "./ProductItem/ProductItem";
import styles from "./ProductList.module.scss";

interface ItemListProps {
    data: IValantisItem[]
    startNumber: number
}


const ProductList = (props: ItemListProps) => {

    return (
        <div className={styles.productList}>
            {props.data.map((item) =>   <ProductItem key={item.id} item={item}/>)}
        </div>
    );
};

export default ProductList;