import React from "react";
import App from "./App";
import { render, fireEvent, cleanup } from "@testing-library/react";
import {
  exchangeRates,
  defaultCurrency,
  defaultInput,
} from "./data/exchangeRates";

import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

afterEach(() => {
  cleanup();
});

let selectCurrency, inputValue, convertedValue, clearValues;
beforeEach(() => {
  let { getByTestId } = renderApp();
  selectCurrency = getByTestId("select-currency");
  inputValue = getByTestId("input-value");
  convertedValue = getByTestId("converted-value");
  clearValues = getByTestId("clear-values");
});

const index = (curr) =>
  exchangeRates.findIndex((item) => item.currency === curr);

const defaultConvertedValue = exchangeRates[index(defaultCurrency)].rate;

describe("Validation of initial Inputs", () => {
  it("should have correct initial values in the input boxes", () => {
    expect(inputValue).toHaveValue(defaultInput);
    expect(convertedValue).toHaveValue(defaultConvertedValue);
  });

  it("should have correct initial option in the select menu", () => {
    expect(selectCurrency.options[0]).toHaveTextContent(defaultCurrency);
  });
});

describe("Functionality of select menu and input fields", () => {
  it("should have 5 currencies in the select menu", () => {
    expect(selectCurrency.options[0]).toHaveTextContent("INR");
    expect(selectCurrency.options[1]).toHaveTextContent("CAD");
    expect(selectCurrency.options[2]).toHaveTextContent("EUR");
    expect(selectCurrency.options[3]).toHaveTextContent("AUD");
    expect(selectCurrency.options[4]).toHaveTextContent("NZD");
  });

  it("should calculate the converted value upto 3 decimal places on currency change", () => {
    fireEvent.change(selectCurrency, { target: { value: "AUD" } });
    expect(convertedValue).toHaveValue(
      parseFloat(
        (exchangeRates[index("AUD")].rate * inputValue.value).toFixed(3)
      )
    );
  });

  it("should calculate the converted value upto 3 decimal places on changing the input value", () => {
    fireEvent.change(inputValue, { target: { value: 23 } });
    expect(convertedValue).toHaveValue(
      parseFloat(
        (exchangeRates[index(selectCurrency.value)].rate * 23).toFixed(3)
      )
    );
  });

  it('should reset the input to 1 and give the conversion in the current currency on "Reset" button click', () => {
    fireEvent.click(clearValues);
    expect(inputValue).toHaveValue(defaultInput);
    expect(convertedValue).toHaveValue(
      parseFloat(
        (
          exchangeRates[index(selectCurrency.value)].rate * defaultInput
        ).toFixed(3)
      )
    );
  });

  it("should change the placeholder text according to currency", () => {
    fireEvent.change(selectCurrency, { target: { value: "AUD" } });
    expect(inputValue.placeholder).toBe("Enter value in AUD");
  });
});
