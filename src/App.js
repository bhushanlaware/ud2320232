import React from 'react';
import './App.css';
import 'h8k-components';
import CurrencyConvertor from "./components/currency-converter/index";

const title = "Currency Converter";

const App = () => {
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <CurrencyConvertor />
        </div>
    );
}

export default App;
