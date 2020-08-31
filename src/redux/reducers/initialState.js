import { getStorageUser } from "../../helpers/authHelpers";

const user = getStorageUser();

export default {
  currencies: [],
  exchangeRates: [],
  selectedExchangeRate: {},
  apiCallsInProgress: 0,
  authentication: user ? { user, loggedIn: true } : {},
};
