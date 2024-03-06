import React, {useEffect, useState} from 'react';
import {IValantisItem} from "../../models/IValantisItem";
import {ProductService} from "../../services/ProductService/ProductService";
import ProductList from "../../components/ProductList/ProductList";
import {FilterItem, IFilter} from "../../models/Filter";
import {AxiosError} from "axios";
import Loader from "../../components/Loader/Loader";
import {useDebouncedEffect} from "../../hooks/useDebouncedEffect";

const ProductListPage = () => {

    const [productIdList, setProductIdList] = useState<string[]>([]);
    const [currentProducts, setCurrentProducts] = useState<IValantisItem[]>([]);
    const [productNameFilter, setProductNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(0);
    const [brandFilter, setBrandFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filterItem, setFilterItem] = useState<IFilter>({});

    const itemsPerPage: number = 50;


    useEffect(() => {
        setIsLoading(true);
        getIds().then(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getIds(filterItem).then(() => setIsLoading(false));
    }, [filterItem]);

    useEffect(() => {
        setPagesCount(Math.ceil(productIdList.length / itemsPerPage));
    }, [productIdList]);

    useDebouncedEffect(() => {
        setIsLoading(true);
        getProducts().then(() => setIsLoading(false));
    }, [productIdList, currentPage], 500);
    useDebouncedEffect(() => {
        console.log(productNameFilter)
        const newFilter: IFilter = {};
        productNameFilter.length > 0 && (newFilter.product = productNameFilter);
        setFilterItem(newFilter);
    } ,[productNameFilter], 500)


    const nextPage = () => {
        if (currentPage < (pagesCount - 1)) {
            setIsLoading(true);
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(currentPage)
        }
    }
    const previousPage = () => {
        if (currentPage > 0) {
            setIsLoading(true);
            setCurrentPage(currentPage - 1)
        } else {
            setCurrentPage(0)
        }
    }


    const getIds = async (filter?: IFilter) => {
        try {
            const inputData = await (filter ? ProductService.getFilteredItemsIds(filter) : ProductService.getAllItemsIds());
            if (inputData.status === 200) {
                const netData: string[] = filterIds(inputData.data.result);
                setProductIdList(netData);
            }
        }
        catch (e) {
            console.error((e as AxiosError).message)
        }
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

    const getBrands = async () => {
        try {
            const brandData = await ProductService.getFields({field: FilterItem.BRAND});
            return brandData.data.result as string | null [];
        }
            catch (e) {
                console.error((e as AxiosError).message)
            }
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
                setTimeout(getProducts, 2000)
            }
        }
    }

    return (
        <div>
            {pagesCount > 0 ? <>
                    Текущая страница: {currentPage + 1};
                    <br/>
                <p>filter</p>
                <div>
                    <input type="text" placeholder='Наименование' value={productNameFilter} onChange={(e) => setProductNameFilter(e.target.value)}/>
                </div>
                    <button onClick={previousPage}>PREV PAGE</button>
                    <button onClick={nextPage}>NEXT PAGE</button>
                    {isLoading ? (<Loader/>) : (currentProducts.length > 0 ?
                        <ProductList startNumber={(currentPage * itemsPerPage) + 1}
                                     data={currentProducts}/> : "Нет данных для отрисовки")}
                </>
                :
                <Loader/>
            }
        </div>
    );
};

export default ProductListPage;