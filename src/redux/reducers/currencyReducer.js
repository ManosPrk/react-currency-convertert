import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function currencyReducer(
  state = initialState.currencies,
  action
) {
  switch (action.type) {
    case types.CREATE_CURRENCY_SUCCESS:
      return [...state, { ...action.currency }];
    case types.LOAD_CURRENCIES_SUCCESS:
      return action.currencies;
    case types.UPDATE_CURRENCY_SUCCESS:
      return state.map((currency) =>
        currency.id === action.currency.id ? action.currency : currency
      );
    case types.DELETE_CURRENCY_OPTIMISTIC:
      return state.filter((currency) => currency.id !== action.currency.id);
    default:
      return state;
  }
}
