import React, {Dispatch, SetStateAction} from 'react';
import FilterSelect from "../FilterSelect/FilterSelect";
import {Input} from "antd";
import {FilterUnits} from "../../models/Filter";
import styles from "./FilterBlock.module.scss"


interface FilterBlockProps {
    currentFilterOption: FilterUnits;
    setCurrentFilterOption: Dispatch<SetStateAction<FilterUnits>>;
    currentFilterValue: string | number;
    setCurrentFilterValue: Dispatch<SetStateAction<string | number>>
}



const FilterBlock = (props: FilterBlockProps) => {
    const filterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.currentFilterOption === FilterUnits.PRICE) {
            props.setCurrentFilterValue(Number(e.target.value))
        } else {
            props.setCurrentFilterValue(e.target.value)
        }
    }

    return (
        <div className={String(styles.filterBlock)}>
            <FilterSelect currenValue={props.currentFilterOption} onChange={props.setCurrentFilterOption} className={styles.filterOption}/>
            <Input type={props.currentFilterOption === 'price' ? "number" : "text"}
                   disabled={props.currentFilterOption === FilterUnits.NO_FILTER} value={props.currentFilterValue}
                   onChange={(e) => filterChangeHandler(e)}
                    className={styles.filterText}
            />
        </div>
    );
};

export default FilterBlock;