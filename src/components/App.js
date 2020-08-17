import React from "react";
import { Route, Switch } from "react-router-dom";
import "../css/App.css";
import Header from "./common/Header";
import Home from "./home/Home";
import { PageNotFound } from "./common/PageNotFound";
import Sidebar from "./common/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrenciesPage from "./manage_currencies/CurrenciesPage";
import ManageCurrency from "./manage_currencies/ManageCurrency";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <Switch>
        <Route exact path="/currencies" component={CurrenciesPage} />
        <Route exact path="/currencies/:slug" component={ManageCurrency} />
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
