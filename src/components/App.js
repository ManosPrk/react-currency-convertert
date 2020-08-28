import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "../css/App.css";
import Header from "./common/Header";
import Home from "./home/Home";
import { PageNotFound } from "./common/PageNotFound";
import Sidebar from "./common/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageCurrencies from "./manage_currencies/ManageCurrencies";
import ManageRates from "./manage_exchange_rates/ManageRates";
import LoginPage from "./auth/LoginPage";
import PrivateRoute from "./auth/PrivateRoute";
import { connect } from "react-redux";
import { loginRequest } from "../redux/actions/authenticationActions";
import RegistrationPage from "./auth/RegistrationPage";

function App({ authentication, loginRequest }) {
  return (
    <div className="app-container">
      <Header />
      {authentication.loggedIn && <Sidebar />}
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <PrivateRoute path="/currencies">
          <ManageCurrencies />
        </PrivateRoute>
        <PrivateRoute path="/rates">
          <ManageRates />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
