import * as types from "./actionTypes";
import * as currencyApi from "../../api/currencyApi";
import { beginApiCAll, apiCallError } from "./apiStatusActions";

export function loadCurrenciesSuccess(currencies) {
  return { type: types.LOAD_CURRENCIES_SUCCESS, currencies };
}

export function updateCurrencySuccess(currency) {
  return { type: types.UPDATE_CURRENCY_SUCCESS, currency };
}

export function createCurrencySuccess(currency) {
  return { type: types.CREATE_CURRENCY_SUCCESS, currency };
}

export function deleteCurrencySuccess(currency) {
  return { type: types.DELETE_CURRENCY_OPTIMISTIC, currency };
}

export function loadCurrencies() {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return currencyApi
      .getCurrencies()
      .then((currencies) => {
        dispatch(loadCurrenciesSuccess(currencies));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
