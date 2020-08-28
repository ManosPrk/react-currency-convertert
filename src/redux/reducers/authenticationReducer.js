import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authenticationReducer(
  state = initialState.authentication,
  action
) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, ...action.authentication };
    case types.REGISTER_SUCCESS:
      return action.authentication;
    case types.LOGIN_FAILURE:
      return { ...state, loggedIn: false };
    case types.LOGOUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}
