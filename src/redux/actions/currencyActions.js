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

export function deleteCurrencyOptimistic(currency) {
  return { type: types.DELETE_CURRENCY_OPTIMISTIC, currency };
}

export function loadCurrencies() {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return currencyApi
      .getCurrencies()
      .then(({ currencies }) => {
        dispatch(loadCurrenciesSuccess(currencies));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveCurrency(currencyToSave) {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return currencyApi
      .saveCurrency(currencyToSave)
      .then(({ message, currency }) => {
        currencyToSave.id
          ? dispatch(updateCurrencySuccess(currency))
          : dispatch(createCurrencySuccess(currency));
        return message;
      })
      .catch((e) => {
        dispatch(apiCallError(e));
        throw e;
      });
  };
}

export function deleteCurrency(currency) {
  return function (dispatch) {
    dispatch(deleteCurrencyOptimistic(currency));
    return currencyApi.deleteCurrency(currency.id);
  };
}
