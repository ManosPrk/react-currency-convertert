import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ children, authentication, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  authentication: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}
export default connect(mapStateToProps)(PrivateRoute);
