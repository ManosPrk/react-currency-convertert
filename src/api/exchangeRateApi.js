import { handleResponse, handleError } from "./apiUtils";
const url = "http://127.0.0.1:8000/api/rates";

export function getExchangeRates() {
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}
