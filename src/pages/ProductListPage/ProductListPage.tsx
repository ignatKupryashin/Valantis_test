import React, {useEffect, useState} from 'react';
import {IValantisItem} from "../../models/IValantisItem";
import {ProductService} from "../../services/ProductService/ProductService";
import ProductList from "../../components/ProductList/ProductList";
import {Filter, FilterUnits} from "../../models/Filter";
import {AxiosError} from "axios";
import Loader from "../../components/Loader/Loader";
import {useDebouncedEffect} from "../../hooks/useDebouncedEffect";
import FilterSelect from "../../components/FilterSelect/FilterSelect";

const ProductListPage = () => {

    // const [productIdList, setProductIdList] = useState<string[]>([]);
    const [currentProducts, setCurrentProducts] = useState<IValantisItem[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filterItem, setFilterItem] = useState<Filter>({});
    const [currentFilterOption, setCurrentFilterOption] = useState<FilterUnits>(FilterUnits.NO_FILTER);
    const [currentFilterValue, setCurrentFilterValue] = useState<string | number>('');
    const [productIdList, setProductIdList] = useState<string[]>([])

    const itemsPerPage: number = 50;
    const [totalPagesCount, setTotalPagesCount] = useState(1);


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
    }, [productIdList, currentPage], 300)


    // useEffect(() => {
    //     setIsLoading(true);
    //     getIds(filterItem).then(() => setIsLoading(false));
    // }, [filterItem]);

    // useEffect(() => {
    //     setTotalPagesCount(Math.ceil(productIdList.length / itemsPerPage));
    // }, [productIdList]);

    useDebouncedEffect(() => {
        setIsLoading(true);
        getProducts().then(() => setIsLoading(false));
    }, [currentPage], 500);

    // useDebouncedEffect(() => {
    //     console.log(productNameFilter)
    //     const newFilter: Filter = {};
    //     productNameFilter.length > 0 && (newFilter.product = productNameFilter);
    //     setFilterItem(newFilter);
    // } ,[productNameFilter], 500);
    //
    // useEffect(() => {
    //
    // }, []);


    const nextPage = () => {
        console.log(productIdList);
        if (currentPage < (totalPagesCount - 1)) {
            setIsLoading(true);
            setCurrentPage(currentPage + 1)
        }
    }
    const previousPage = () => {
        if (currentPage > 0) {
            setIsLoading(true);
            setCurrentPage(currentPage - 1)
        }
    }

    const checkPages = () => {
        setCurrentPage(0);
    }


    const getIds = async (filter?: Filter) => {
        try {
            const inputData = await (filter ? ProductService.getFilteredItemsIds(filter) : ProductService.getAllItemsIds());
            if (inputData.status === 200) {
                const filteredData = filterIds(inputData.data.result);
                setProductIdList(filteredData);
                getTotalPages(filteredData);
                checkPages();
            }
        } catch (e) {
            console.error((e as AxiosError).message);
            setTimeout(() => getIds(filter), 1000)
        }
    }


    const getTotalPages = (data: any[]) => {
        setTotalPagesCount(Math.ceil(data.length / itemsPerPage));
    }

    const filterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentFilterOption === FilterUnits.PRICE) {
            setCurrentFilterValue(Number(e.target.value))
        }
        else {
            setCurrentFilterValue(e.target.value)
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

    const getProducts = async () => {
        if (productIdList.length > 0) {
            try {
                const data = await ProductService.getProducts(productIdList.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage));
                if (data.status === 200) {
                    setCurrentProducts(filterProducts(data.data.result));
                }
            } catch (e) {
                console.error((e as AxiosError).message)
                setTimeout(getProducts, 1000)
            }
        } else setCurrentProducts([]);
    }

    return (
        <div>
            {totalPagesCount > 0 ? <> Страница: {currentPage + 1} из {totalPagesCount}; </> : <>Данных с указанными
                параметрами не найдено</>}
            <br/>
            <p>filter</p>
            <div>
                <FilterSelect currenValue={currentFilterOption} onChange={setCurrentFilterOption}/>
                <input type={currentFilterOption === 'price' ? "number" : "text"}
                       disabled={currentFilterOption === FilterUnits.NO_FILTER} value={currentFilterValue}
                       onChange={(e) => filterChangeHandler(e)}/>
            </div>
            <button onClick={previousPage}>PREV PAGE</button>
            <button onClick={nextPage}>NEXT PAGE</button>
            {isLoading ? (<Loader/>) : (currentProducts.length > 0 ?
                <ProductList startNumber={(currentPage * itemsPerPage) + 1}
                             data={currentProducts}/> : "Нет данных для отрисовки")}
        </div>
    );
};

export default ProductListPage;