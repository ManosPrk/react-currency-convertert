import * as types from "./actionTypes";
import * as exchangeRateApi from "../../api/exchangeRateApi";
import { beginApiCAll, apiCallError } from "./apiStatusActions";

export function loadExchangeRatesSuccess(exchangeRates) {
  return { type: types.LOAD_EXCHANGE_RATES_SUCCESS, exchangeRates };
}

export function updateExchangeRateSuccess(exchangeRate) {
  return { type: types.UPDATE_EXCHANGE_RATE_SUCCESS, exchangeRate };
}

export function createExchangeRateSuccess(exchangeRate) {
  return { type: types.CREATE_EXCHANGE_RATE_SUCCESS, exchangeRate };
}

export function deleteExchangeRateSuccess(exchangeRate) {
  return { type: types.DELETE_EXCHANGE_RATE_OPTIMISTIC, exchangeRate };
}

export function loadExchangeRates() {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return exchangeRateApi
      .getExchangeRates()
      .then((exchangeRates) => {
        dispatch(loadExchangeRatesSuccess(exchangeRates));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
