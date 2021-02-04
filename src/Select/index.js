import React, {useEffect, useState} from "react";

function Select({country, setCountry}) {
    let [countries, setCountries] = useState([]);


    function fetchCountries() {
        fetch('https://disease.sh/v3/covid-19/jhucsse').then(response => response.json()).then(data => {
            let arr = [];
            data.forEach(el => arr.push(el.country));

            arr = [...new Set(arr)];

            countries = [...arr];
            setCountries(countries);

        });
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    const elems = [<option value={'All'} key={'All'}>All</option>];
    countries.forEach(elem => elems.push(<option value={elem} key={elem}>{elem}</option>))


    return (
        <select value={country} onChange={e => setCountry(e.target.value)}>
            {
                elems.map(el => el)
            }
        </select>
    );
}

export default Select;