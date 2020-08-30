import { handleResponse, handleError } from "./apiUtils";
import { authHeader } from "../helpers/authHelpers";
const baseUrl = "http://localhost:8000";

export function getToken(username, password) {
  return fetch(baseUrl + "/api/login_check", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function register(username, password, email) {
  return fetch(baseUrl + "/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function isTokenValid() {
  return fetch(baseUrl + "/api/test", {
    headers: authHeader(),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function logOut() {
  localStorage.removeItem("user");
}
