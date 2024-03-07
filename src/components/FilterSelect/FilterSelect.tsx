import React, {Dispatch, SetStateAction} from 'react';
import {FilterUnits, FilterValues} from "../../models/Filter";

interface FilterSelectProps {
    currenValue: FilterUnits;
    onChange: Dispatch<SetStateAction<FilterUnits>>
}



const FilterSelect = (props: FilterSelectProps) => {
    return (
        <select value={props.currenValue} onChange={(e) => props.onChange(e.target.value as FilterUnits)}>
            {Object.values(FilterUnits).map((filter) => (
                <option key={filter} value={filter}>
                    {FilterValues[filter]}
                </option>
            ))}
        </select>
    );
};

export default FilterSelect;