import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function exchangeRateReducer(
  state = initialState.selectedExchangeRate,
  action
) {
  switch (action.type) {
    case types.UPDATE_SELECTED_EXCHANGE_RATE:
      return { ...state, ...action.selectedExchangeRate };
    default:
      return state;
  }
}
