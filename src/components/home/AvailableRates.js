import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import "../../css/AvailableRates.css";
import { loadExchangeRates } from "../../redux/actions/exchangeRateActions";
import Table from "../common/Table";
import { identity } from "lodash";

function AvailableRates({ exchangeRates }) {
  return (
    <div id="available-rates-container">
      <h1>Available Rates</h1>
      {exchangeRates.length > 0 && (
        <Table
          rows={exchangeRates.map((e) => [
            e.base.isoCode,
            e.target.isoCode,
            parseFloat(e.ratio).toFixed(4),
          ])}
          columns={["From", "To", "Ratio"]}
        />
      )}
    </div>
  );
}

AvailableRates.propTypes = {
  exchangeRates: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  exchangeRates: state.exchangeRates,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRates);
