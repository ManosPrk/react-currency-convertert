import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes, { object } from "prop-types";
import "../../css/CurrencyConverter.css";
import { loadCurrencies } from "../../redux/actions/currencyActions";
import { loadExchangeRates } from "../../redux/actions/exchangeRateActions";
import { formatCurrency } from "../../helpers/formatHelpers";
import CurrencyConverterForm from "./CurrencyConverterForm";
import ConverterResults from "./ConverterResults";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import { set } from "lodash";

function CurrencyConverter({
  exchangeRates,
  loadExchangeRates,
  currencies,
  loadCurrencies,
}) {
  const [exchangeRate, setExchangeRate] = useState({});
  const [conversionResultData, setConversionResultData] = useState({});
  const [baseAmount, setBaseAmount] = useState(1);
  const [disableConversion, setDisableConversion] = useState(false);

  useEffect(() => {
    if (currencies.length === 0) {
      loadCurrencies().catch((err) => alert(err));
    }

    if (exchangeRates.length === 0) {
      loadExchangeRates().catch((err) => alert(err));
    }
  }, []);

  useEffect(() => {
    const { base, target } = exchangeRate;
    if (!base || !target) {
      setDisableConversion(true);
      return;
    }
    const existingRate = exchangeRates.some(
      (e) => e.base.id === base && e.target.id === target
    );
    if (!existingRate) {
      setDisableConversion(true);
      toast.error(`Cant find a rate for these currencies`);
      return;
    }
    setDisableConversion(false);
  }, [exchangeRate]);

  function handleOnSubmit(event) {
    event.preventDefault();
    const { ratio, base, target } = exchangeRates.find(
      (e) =>
        e.base.id === exchangeRate.base && e.target.id === exchangeRate.target
    );
    setConversionResultData((prevResultData) => ({
      ...prevResultData,
      base,
      target,
      baseAmount,
      targetAmount: baseAmount * ratio,
    }));
  }

  function handleOnCurrencyChange(event) {
    const { name, value } = event.target;
    setExchangeRate((prevExchangeRate) => ({
      ...prevExchangeRate,
      [name]: parseInt(value) || 0,
    }));
  }

  function handleOnAmountChange(event) {
    const { value } = event.target;
    setBaseAmount(value);
  }

  function handleOnBlur(event) {
    const { value } = event.target;
    setBaseAmount(Number(value.replace(/[^0-9-.]/g, "")));
  }

  function handleInvertClick() {
    setExchangeRate((prevExchangeRate) => ({
      ...prevExchangeRate,
      base: exchangeRate.target,
      target: exchangeRate.base,
    }));
  }

  return (
    <div className="container" id="currency-converter-container">
      {currencies.length === 0 ? (
        <Spinner />
      ) : (
        <CurrencyConverterForm
          base={exchangeRate.base}
          target={exchangeRate.target}
          baseAmount={formatCurrency(
            baseAmount,
            currencies.find((c) => c.id === exchangeRate.base)
          )}
          currencies={currencies}
          onCurrencyChange={handleOnCurrencyChange}
          onMoneyChange={handleOnAmountChange}
          handleOnBlur={handleOnBlur}
          handleOnSubmit={handleOnSubmit}
          handleInvertClick={handleInvertClick}
          disableSubmitButton={disableConversion}
        />
      )}
      {Object.keys(conversionResultData).length > 0 && (
        <ConverterResults {...conversionResultData} />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currencies: state.currencies,
    exchangeRates: state.exchangeRates,
  };
}

const mapDispatchToProps = {
  loadExchangeRates,
  loadCurrencies,
};

CurrencyConverter.propTypes = {
  currencies: PropTypes.array.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  loadExchangeRates: PropTypes.func.isRequired,
  exchangeRates: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
