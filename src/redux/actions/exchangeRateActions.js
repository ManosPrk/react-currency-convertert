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

export function deleteExchangeRateOptimistic(exchangeRateId) {
  return { type: types.DELETE_EXCHANGE_RATE_OPTIMISTIC, exchangeRateId };
}

export function loadExchangeRates() {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return exchangeRateApi
      .getExchangeRates()
      .then((exchangeRates) => {
        dispatch(loadExchangeRatesSuccess(exchangeRates));
        return exchangeRates;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveExchangeRate(exchangeRate) {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return exchangeRateApi
      .saveExchangeRate(exchangeRate)
      .then((savedExchangeRates) => {
        exchangeRate.id
          ? savedExchangeRates.forEach((rate) =>
              dispatch(updateExchangeRateSuccess(rate))
            )
          : savedExchangeRates.forEach((rate) =>
              dispatch(createExchangeRateSuccess(rate))
            );
        return savedExchangeRates;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        return err;
      });
  };
}

export function deleteExchangeRate(exchangeRateId) {
  return function (dispatch) {
    return exchangeRateApi
      .deleteExchangeRate(exchangeRateId)
      .then((response) => {
        response.ratesDeleted.forEach((rateId) =>
          dispatch(deleteExchangeRateOptimistic(rateId))
        );
        return response.message;
      });
  };
}
