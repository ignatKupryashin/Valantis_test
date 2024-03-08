import React from 'react';
import {IValantisItem} from "../../../models/IValantisItem";
import {Card} from "antd";
import styles from "./ProductItem.module.scss"

interface ProductItemProps {
    item: IValantisItem;
}

const ProductItem = (props: ProductItemProps) => {
    return (
        <div className={styles.productItem}>
            <Card hoverable={true}>
                {props.item.id}
                {props.item.brand}
                {props.item.product}
                {props.item.price}
            </Card>
        </div>
    );
};

export default ProductItem;