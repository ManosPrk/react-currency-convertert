import React from "react";
import "../../css/Home.css";
import CurrencyConverter from "./CurrencyConverter";
import AvailableRates from "./AvailableRates";

export default function Home() {
  return (
    <div className="home">
      <div className="container" id="home-container">
        <CurrencyConverter />
        <AvailableRates />
      </div>
    </div>
  );
}
