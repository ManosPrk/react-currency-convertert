import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function exchangeRateReducer(
  state = initialState.exchangeRates,
  action
) {
  switch (action.type) {
    case types.CREATE_EXCHANGE_RATE_SUCCESS:
      return [...state, { ...action.exchangeRate }];
    case types.LOAD_EXCHANGE_RATES_SUCCESS:
      return action.exchangeRates;
    case types.UPDATE_EXCHANGE_RATE_SUCCESS:
      return state.map((exchangeRate) =>
        exchangeRate.id === action.exchangeRate.id
          ? action.exchangeRate
          : exchangeRate
      );
    case types.DELETE_EXCHANGE_RATE_OPTIMISTIC:
      return state.filter(
        (exchangeRate) => exchangeRate.id !== action.exchangeRate.id
      );
    default:
      return state;
  }
}
