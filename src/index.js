import React from "react";
import ReactDOM from "react-dom";

import './index.css';
import List from "./List";
import Chart from "./Chart";
import CovidMap from "./Map";
import Table from "./Table";

const App = () => {


 /*    <Table/>
            <CovidMap/>  */

    return (
        <div className='container'>
        <div className='left'>
            <List/>
            <Table/>
        </div>
            <div className='center'>
                <CovidMap/>
                <Chart/>
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.querySelector("#root"));