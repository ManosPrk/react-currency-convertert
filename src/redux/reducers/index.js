import { combineReducers } from "redux";
import currencies from "./currencyReducer";
import exchangeRates from "./exchangeRateReducer";
import selectedExchangeRate from "./selectedRateReducer";
import apiCallsInProgress from "./apiStatusReducer";
import authentication from "./authenticationReducer";

const rootReducer = combineReducers({
  currencies,
  exchangeRates,
  selectedExchangeRate,
  apiCallsInProgress,
  authentication,
});

export default rootReducer;
