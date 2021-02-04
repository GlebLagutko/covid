import React from "react";

function SelectPeriod({period, setPeriod}) {

    return (
        <select value={period} onChange={e => setPeriod(e.target.value)}>
            <option value='Year' key='Year'>Year</option>)
            <option value='OneDay' key='OneDay'>OneDay</option>)
        </select>
    );
}

export default SelectPeriod;