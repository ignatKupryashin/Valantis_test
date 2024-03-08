import React from 'react';
import {IValantisItem} from "../../../models/IValantisItem";
import {Card} from "antd";
import styles from './ProductItem.module.scss';

interface ProductItemProps {
    item: IValantisItem;
}

const ProductItem = (props: ProductItemProps) => {
    return (
        <Card hoverable={true} className={styles.productItem}>
            <h3 className={styles.name}>{props.item.product}</h3>
                {props.item.brand && <p className={styles.brand}>{props.item.brand}</p>}
                <p className={styles.id}>id: {props.item.id}</p>
            <p className={styles.price}>Цена: {props.item.price}</p>
        </Card>
    );
};

export default ProductItem;