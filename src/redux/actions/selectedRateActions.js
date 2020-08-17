import * as types from "./actionTypes";

export function updateSelectedExchangeRate(selectedExchangeRate) {
  return { type: types.UPDATE_SELECTED_EXCHANGE_RATE, selectedExchangeRate };
}
