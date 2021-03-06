import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateVariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import JwtDecode from "jwt-decode";

export default function configureStore(initialState) {
  //adds support for redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateVariant()))
  );
}
