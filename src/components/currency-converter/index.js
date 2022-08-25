import React from "react";
import {
  exchangeRates,
  defaultCurrency,
  defaultInput,
} from "../../data/exchangeRates";
import { preventNegative } from "../../utils/preventNegative";
import "./styles.css";

function CurrencyConvertor() {
  return (
    <div>
      <div className="layout-row justify-content-space-evenly min-height mt-75">
        <div className="layout-column w-35 pa-30 card">
          <select className="mb-10" data-testid="select-currency">
            <option>CAD</option>
          </select>
          <input
            className="h-50"
            type="number"
            value="0"
            onKeyDown={preventNegative}
            placeholder="Enter value in USD"
            data-testid="input-value"
          />
        </div>

        <div className="layout-column w-35 pa-30 card">
          <h3 className="mb-10 mt-0">USD</h3>
          <input
            className="h-50"
            type="number"
            value="81.049"
            readOnly
            data-testid="converted-value"
          />
        </div>
      </div>

      <div className="layout-row justify-content-center pa-20">
        <button data-testid="clear-values">Clear Input</button>
      </div>
    </div>
  );
}

export default CurrencyConvertor;
