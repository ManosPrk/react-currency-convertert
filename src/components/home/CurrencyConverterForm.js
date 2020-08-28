import React from "react";
import "../../css/CurrencyConverterForm.css";
import SelectInput from "../common/SelectInput";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import InvertButton from "./InvertButton";

function CurrencyConverterForm({
  fromCurrencies,
  toCurrencies,
  base,
  target,
  baseAmount,
  handleOnSubmit,
  handleInvertClick,
  onCurrencyChange,
  handleOnAmountChange,
  handleOnBlur,
}) {
  return (
    <div className="row">
      <div className="form-wrapper">
        <form onSubmit={handleOnSubmit}>
          <div id="currency-form-row" className="form-row">
            <TextInput
              name="baseAmount"
              label="Amount"
              value={baseAmount}
              onChange={handleOnAmountChange}
              onBlur={handleOnBlur}
            />
            <SelectInput
              name="base"
              label="From"
              value={base}
              defaultOption="Currency.."
              options={fromCurrencies.map((currency) => ({
                value: currency.id,
                text: currency.name,
              }))}
              onChange={onCurrencyChange}
            />
            <InvertButton onInvertClick={handleInvertClick} />
            <SelectInput
              name="target"
              label="To"
              value={target}
              defaultOption="Currency.."
              options={toCurrencies.map((currency) => ({
                value: currency.id,
                text: currency.name,
              }))}
              onChange={onCurrencyChange}
            />
            <div className="form-group">
              <button type="submit" className="btn btn-warning">
                Convert
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

CurrencyConverterForm.propTypes = {
  fromCurrencies: PropTypes.array.isRequired,
  toCurrencies: PropTypes.array.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  handleOnAmountChange: PropTypes.func.isRequired,
  handleInvertClick: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  target: PropTypes.number,
  base: PropTypes.number,
  baseAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CurrencyConverterForm;
