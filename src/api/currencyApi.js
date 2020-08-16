import { handleResponse, handleError } from "./apiUtils";
const url = "http://localhost:8000/api/currency";

export function getCurrencies() {
  return fetch(url).then(handleResponse).catch(handleError);
}
