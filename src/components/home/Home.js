import React from "react";
import "../../css/Home.css";
import CurrencyConverter from "./CurrencyConverter";
import AvailableRates from "./AvailableRates";

export default function Home() {
  return (
    <div className="content-wrapper">
      <div className="container content-container">
        <CurrencyConverter />
        <AvailableRates />
      </div>
    </div>
  );
}
