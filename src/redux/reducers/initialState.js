const user = JSON.parse(sessionStorage.getItem("user")) || null;

export default {
  currencies: [],
  exchangeRates: [],
  selectedExchangeRate: {},
  apiCallsInProgress: 0,
  authentication: user ? { user, loggedIn: true } : {},
};
