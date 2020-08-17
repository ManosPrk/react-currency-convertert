import { combineReducers } from "redux";
import currencies from "./currencyReducer";
import exchangeRates from "./exchangeRateReducer";
import selectedExchangeRate from "./selectedRateReducer";

const rootReducer = combineReducers({
  currencies,
  exchangeRates,
  selectedExchangeRate,
});

export default rootReducer;
