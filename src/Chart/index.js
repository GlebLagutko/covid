import React, {useEffect, useState} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area,
} from 'recharts';
import Select from "../Select";


export default function Chart() {

    const [currentData, setData] = useState([]);
    const [currentCountry, setCountry] = useState('All');



    function fetchData() {
        console.log('fetch')
        fetch(`https://disease.sh/v3/covid-19/historical/${currentCountry.toLowerCase()}?lastdays=all`).then(response => response.json()).then(data => {
            const d = [];
            if (currentCountry === 'All') {
                for (const key in data.cases) {
                    d.push({name: key, cases: data.cases[key]})
                }
            } else {
                for (const key in data.timeline.cases) {
                    d.push({name: key, cases: data.timeline.cases[key]})
                }
            }
            setData(d);
        });
    }

    useEffect(() => {
        fetchData();
    }, [currentCountry]);


    const updateCountry = (currentCountry) => {
        setCountry(currentCountry);
    }


    return (
        <div className='chart-div'>
            <Select country={currentCountry} setCountry={updateCountry}/>
            <AreaChart
                width={650}
                height={220}
                data={currentData}
                margin={{
                    top: 10, right: 50, left: 25, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="cases" stroke="#8884d8" fill="#8884d8"/>
            </AreaChart>

        </div>
    );
}
