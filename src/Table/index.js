import React, {useEffect, useState} from "react";
import Select from "../Select";
import SelectPeriod from "../SelectPeriod";


function Table() {
  let [currentCountry, setCountry] = useState('Belarus');
  let [cases, setCases] = useState(0);
  let [deaths, setDeaths] = useState(0);
  let [recovered, setRecovered] = useState(0);
  let [period, setPeriod] = useState('Year');

  function fetchData() {
    let url = '';
    if (currentCountry === 'All') {
      url = `https://disease.sh/v3/covid-19/${currentCountry.toLowerCase()}`;
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${currentCountry.toLowerCase()}`;
    }

    fetch(url).then(response => response.json()).then(data => {

      if (period === 'Year') {
        setCases(data.cases);
        setDeaths(data.deaths);
        setRecovered(data.recovered);
      } else {
        console.log("cases" + data.todayCases)
        setCases(data.todayCases);
        setDeaths(data.todayDeaths);
        setRecovered(data.todayRecovered);
      }
    });
  }

  useEffect(fetchData, [currentCountry, period]);

  const updateCountry = (currentCountry) => {
    setCountry(currentCountry);
  };
  const updatePeriod = (period) => {
    setPeriod(period);
  };

  return (
    <div className='table '>
      <Select country={currentCountry} setCountry={updateCountry}/>
      <SelectPeriod period={period} setPeriod={updatePeriod}/>
      <div className='table-cell'>{cases}<span className='text-table'> cases</span></div>
      <div className='table-cell deaths'>{deaths}<span className='text-table'> deaths</span></div>
      <div className='table-cell recovered'>{recovered}<span className='text-table'> recovered</span></div>
    </div>
  )
}

export default Table;