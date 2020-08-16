import { combineReducers } from "redux";
import currencies from "./currencyReducer";
import exchangeRates from "./exchangeRateReducer";

const rootReducer = combineReducers({
  currencies,
  exchangeRates,
});

export default rootReducer;
