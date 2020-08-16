import React from "react";
import "../../css/CurrencyConverterForm.css";
import SelectInput from "../common/SelectInput";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import InvertButton from "./InvertButton";

function CurrencyConverterForm({
  currencies,
  base,
  target,
  baseAmount,
  handleOnSubmit,
  handleInvertClick,
  onCurrencyChange,
  onMoneyChange,
  handleOnBlur,
  disableSubmitButton,
}) {
  return (
    <div className="row">
      <div className="currency-form-wrapper">
        <form onSubmit={handleOnSubmit}>
          <div className="form-row">
            <TextInput
              name="baseAmount"
              label="Amount"
              value={baseAmount}
              onChange={onMoneyChange}
              onBlur={handleOnBlur}
            />
            <SelectInput
              name="base"
              label="From"
              value={base}
              defaultOption="Currency.."
              options={currencies.map((currency) => ({
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
              options={currencies.map((currency) => ({
                value: currency.id,
                text: currency.name,
              }))}
              onChange={onCurrencyChange}
            />
            <div className="form-group">
              <button
                type="submit"
                disabled={disableSubmitButton}
                className="btn btn-warning"
              >
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
  currencies: PropTypes.arrayOf(PropTypes.object),
  handleOnSubmit: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  onMoneyChange: PropTypes.func.isRequired,
  handleInvertClick: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  target: PropTypes.number,
  base: PropTypes.number,
  baseAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disableSubmitButton: PropTypes.bool,
};

export default CurrencyConverterForm;
