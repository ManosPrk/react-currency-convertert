console.log(user);
const user = JSON.parse(localStorage.getItem("user")) || null;

export default {
  currencies: [],
  exchangeRates: [],
  selectedExchangeRate: {},
  apiCallsInProgress: 0,
  authentication: user ? { user, loggedIn: true } : {},
};
