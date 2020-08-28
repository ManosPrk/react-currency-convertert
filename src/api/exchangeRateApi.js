import { handleResponse, handleError } from "./apiUtils";
import { authHeader } from "../helpers/authHelpers";
const url = "http://127.0.0.1:8000/api/rates/";

export function getExchangeRates() {
  return fetch(url, { headers: authHeader() })
    .then(handleResponse)
    .catch(handleError);
}

export function saveExchangeRate(exchangeRate) {
  return fetch(url + (exchangeRate.id || ""), {
    method: exchangeRate.id ? "PUT" : "POST",
    headers: { "content-type": "application/json", ...authHeader() },
    body: JSON.stringify(exchangeRate),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteExchangeRate(exchangeRateId) {
  console.log(exchangeRateId);
  return fetch(url + exchangeRateId, {
    method: "DELETE",
    headers: authHeader(),
  })
    .then(handleResponse)
    .catch(handleError);
}
