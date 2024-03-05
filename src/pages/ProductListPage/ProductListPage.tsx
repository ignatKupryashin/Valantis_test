import React, {useEffect, useState} from 'react';
import {IValantisItem} from "../../models/IValantisItem";
import {ProductService} from "../../services/ProductService/ProductService";
import ProductList from "../../components/ProductList/ProductList";

const ProductListPage = () => {

    const [productIdList, setProductIdList] = useState<string[]>([]);
    const [currentProducts, setCurrentProducts] = useState<IValantisItem[]>([]);

    const itemsPerPage: number = 50;

    let numberOfPages = 0;

    useEffect(() => {
        try {
            getIds()
        } catch (e) {
            console.error(e)
        }
    }, []);

    useEffect(() => {
        console.log(productIdList);
        console.log(currentProducts);
        getProducts();
        numberOfPages = productIdList.length / itemsPerPage;
        console.log(numberOfPages)
    }, [productIdList]);


    const getIds = async () => {
        const inputData = await ProductService.getAllItems();
        setProductIdList(inputData.data.result as string[]);

    }


    const getProducts = async () => {
        if (productIdList.length > 0) {
            const data = await ProductService.getItems(productIdList.slice(0, 100));
            if (data.status === 200) {
                setCurrentProducts(data.data.result as IValantisItem[])
            }
        }
    }

    return (
        <div>
            {currentProducts.length > 0 ?  <ProductList data={currentProducts}/> : "Нет данных для отрисовки"}
        </div>
    );
};

export default ProductListPage;