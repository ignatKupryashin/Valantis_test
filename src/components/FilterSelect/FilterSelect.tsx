import React, {Dispatch, SetStateAction} from 'react';
import {FilterUnits, FilterValues} from "../../models/Filter";
import {Radio, Select} from "antd";

interface FilterSelectProps {
    currenValue: FilterUnits;
    onChange: Dispatch<SetStateAction<FilterUnits>>
}



const FilterSelect = (props: FilterSelectProps) => {
    return (
        <Select value={props.currenValue} onChange={(e) => props.onChange(e)}>
            {Object.values(FilterUnits).map((filter) => (
                <Select.Option key={filter} value={filter}>
                    {FilterValues[filter]}
                </Select.Option>
            ))}
        </Select>
    );
};

export default FilterSelect;