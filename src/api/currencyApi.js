import { handleResponse, handleError } from "./apiUtils";
import { authHeader } from "../helpers/authHelpers";
const url = "http://localhost:8000/api/currency/";

export function getCurrencies() {
  return fetch(url, { headers: authHeader() })
    .then(handleResponse)
    .catch(handleError);
}

export function saveCurrency(currency) {
  return fetch(url + (currency.id || ""), {
    method: currency.id ? "PUT" : "POST",
    headers: { "content-type": "application/json", ...authHeader() },
    body: JSON.stringify({
      name: currency.name,
      isoCode: currency.isoCode,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCurrency(currencyId) {
  return fetch(url + currencyId, {
    method: "DELETE",
    headers: authHeader(),
  })
    .then(handleResponse)
    .catch(handleError);
}
