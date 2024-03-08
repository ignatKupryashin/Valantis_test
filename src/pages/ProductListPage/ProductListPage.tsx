import React, {useEffect, useState} from 'react';
import {IValantisItem} from "../../models/IValantisItem";
import {ProductService} from "../../services/ProductService/ProductService";
import ProductList from "../../components/ProductList/ProductList";
import {Filter, FilterUnits} from "../../models/Filter";
import {AxiosError} from "axios";
import Loader from "../../components/Loader/Loader";
import {useDebouncedEffect} from "../../hooks/useDebouncedEffect";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import {Button, Divider, Input} from "antd";
import styles from './ProductListPage.module.scss'
import PageSwitcher from "../../components/PageSwitcher/PageSwitcher";
import FilterBlock from "../../components/FilterBlock/FilterBlock";

const ProductListPage = () => {

    const [currentProducts, setCurrentProducts] = useState<IValantisItem[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentFilterOption, setCurrentFilterOption] = useState<FilterUnits>(FilterUnits.NO_FILTER);
    const [currentFilterValue, setCurrentFilterValue] = useState<string | number>('');
    const [productIdList, setProductIdList] = useState<string[]>([])
    const [totalPagesCount, setTotalPagesCount] = useState(1);

    const itemsPerPage: number = 50;

    useEffect(() => {
        setIsLoading(true);
        getIds();
    }, []);

    useEffect(() => {
        setCurrentFilterValue('');
    }, [currentFilterOption]);

    useDebouncedEffect(() => {
        setIsLoading(true);
        if (currentFilterValue === '' || currentFilterValue === 0) {
            getIds();
        } else (
            getIds({
                [currentFilterOption]: currentFilterValue
            })
        )
    }, [currentFilterValue], 1500);

    useDebouncedEffect(() => {
        getProducts().then(() => setIsLoading(false));
    }, [productIdList, currentPage], 1500)

    const getIds = async (filter?: Filter) => {
        try {
            const inputData = await (filter ? ProductService.getFilteredItemsIds(filter) : ProductService.getAllItemsIds());
            if (inputData.status === 200) {
                const filteredData = filterIds(inputData.data.result);
                setProductIdList(filteredData);
                getTotalPages(filteredData);
                setCurrentPage(0);
            }
        } catch (e) {
            console.error((e as AxiosError).message);
            //повторить запрос в случае ошибки
            setTimeout(() => getIds(filter), 1000)
        }
    }

    const getTotalPages = (data: any[]) => {
        setTotalPagesCount(Math.ceil(data.length / itemsPerPage));
    }

    const filterProducts = (data: IValantisItem[]): IValantisItem[] => {
        const uniqueIds = new Set<string>;
        const result: IValantisItem[] = [];
        data.forEach((item) => {
            if (!uniqueIds.has(item.id)) {
                uniqueIds.add(item.id);
                result.push(item);
            }
        })
        return result;
    }
    const filterIds = (data: string[]): string[] => {
        return [...new Set(data).keys()]
    }

    const getProducts = async () => {
        if (productIdList.length > 0) {
            try {
                const data = await ProductService.getProducts(productIdList.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage));
                if (data.status === 200) {
                    setCurrentProducts(filterProducts(data.data.result));
                }
            } catch (e) {
                console.error((e as AxiosError).message)
                //повторить запрос в случае ошибки
                setTimeout(getProducts, 1000)
            }
        } else setCurrentProducts([]);
    }

    return (
        <div>
<h1 className={styles.heading}>Тестовое задание <span className={styles.highlight}>Валантис</span></h1>
           <FilterBlock currentFilterOption={currentFilterOption} currentFilterValue={currentFilterValue} setCurrentFilterOption={setCurrentFilterOption} setCurrentFilterValue={setCurrentFilterValue}/>
            {currentProducts.length > 0 && <PageSwitcher totalPagesCount={totalPagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsLoading={setIsLoading}/>}
           <Divider/>
            <div className={styles.listBlock}>
                {isLoading ? (<Loader/>) : (currentProducts.length > 0 ?
                    <ProductList startNumber={(currentPage * itemsPerPage) + 1}
                                 data={currentProducts}/> : "Товаров с указанными параметрами не найдено")}
            </div>
        </div>
    );
};

export default ProductListPage;