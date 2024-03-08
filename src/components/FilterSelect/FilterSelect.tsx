import React, {Dispatch, SetStateAction} from 'react';
import {FilterUnits, FilterValues} from "../../models/Filter";
import {Radio, Select} from "antd";
import {JSX} from "react/jsx-runtime";

interface FilterSelectProps {
    currenValue: FilterUnits;
    onChange: Dispatch<SetStateAction<FilterUnits>>;
    className: string;
}



const FilterSelect = (props: FilterSelectProps) => {
    return (
        <Select className={props.className} value={props.currenValue} onChange={(e) => props.onChange(e)}>
            {Object.values(FilterUnits).map((filter) => (
                <Select.Option key={filter} value={filter}>
                    {FilterValues[filter]}
                </Select.Option>
            ))}
        </Select>
    );
};

export default FilterSelect;