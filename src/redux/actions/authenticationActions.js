import * as types from "./actionTypes";
import * as authApi from "../../api/authApi";
import { beginApiCAll, apiCallError } from "./apiStatusActions";

export function loginSuccess(authentication) {
  return { type: types.LOGIN_SUCCESS, authentication };
}

export function registerSuccess(authentication) {
  return { type: types.REGISTER_SUCCESS, authentication };
}

export function loginFailed() {
  return { type: types.LOGIN_FAILURE };
}

export function logout() {
  return { type: types.LOGOUT };
}

export function loginRequest(user) {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return authApi
      .getToken(user.username, user.password)
      .then(({ token }) => {
        user.token = token;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(loginSuccess({ loggedIn: true }));
        return user;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        dispatch(loginFailed());
        throw err;
      });
  };
}

export function registerRequest(user) {
  return function (dispatch) {
    dispatch(beginApiCAll());
    return authApi
      .register(user.username, user.password, user.email)
      .then((message) => {
        dispatch(registerSuccess({ user }));
        return message;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function logOut() {
  return function (dispatch) {
    dispatch(logout());
    authApi.logOut();
  };
}
