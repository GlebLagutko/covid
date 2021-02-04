import React, {useEffect, useState} from "react";


import ListItem from "../ListItem";
import SearchBar from "../SearchBar";


function List() {
  const [countryMap, setCountryMap] = useState(new Map());
  let [input, setInput] = useState('');
  let [mapOfCountriesDefault, setMapDefault] = useState(new Map());

  function fetchData() {
    fetch('https://disease.sh/v3/covid-19/countries').then(response => response.json()).then(data => {
      const map = new Map();
      data.forEach(elem => map.set(elem.country, elem.cases));
      setMapDefault(map);
      setCountryMap(map);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const updateInput = (input) => {
    const filteredKeys = Array.from(mapOfCountriesDefault.keys()).filter(country => {
      return country.toLowerCase().includes(input.toLowerCase())
    });

    const currentMap = new Map();
    for (const key of mapOfCountriesDefault.keys()) {
      if (filteredKeys.includes(key))
        currentMap.set(key, mapOfCountriesDefault.get(key))
    }
    setInput(input);
    setCountryMap(currentMap);
  };

  const elems = [];
  for (const key of countryMap.keys()) {
    elems.push(<ListItem country={key} count={mapOfCountriesDefault.get(key)} key={key}/>)
  }

  return <div className='list-div '>
    <SearchBar
      keyword={input}
      setKeyword={updateInput}
    />
    <ul className='list'>

      {
        elems.map(el => el)
      }
    </ul>
  </div>
}

export default List;