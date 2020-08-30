import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../css/AvailableRates.css";
import Table from "../common/Table";
import { updateSelectedExchangeRate } from "../../redux/actions/selectedRateActions";

function AvailableRates({ exchangeRates, updateSelectedExchangeRate }) {
  const handleSelectRate = (selectedRate) => {
    const { base, target } = exchangeRates.find(
      (e) =>
        e.base.isoCode === selectedRate.base &&
        e.target.isoCode === selectedRate.target
    );
    updateSelectedExchangeRate({ base: base.id, target: target.id });
  };

  const buttons = [
    {
      text: "Select",
      handleClick: handleSelectRate,
      class: "btn-warning",
    },
  ];

  return (
    <>
      {exchangeRates.length > 0 && (
        <div id="available-rates-container">
          <Table
            rows={exchangeRates.map((e) => ({
              base: e.base.isoCode,
              target: e.target.isoCode,
              ratio: parseFloat(e.ratio).toFixed(4),
            }))}
            columns={["From", "To", "Ratio"]}
            buttons={buttons}
            handleOnClick={handleSelectRate}
            title={"Available Rates"}
          />
        </div>
      )}
    </>
  );
}

AvailableRates.propTypes = {
  exchangeRates: PropTypes.array.isRequired,
  selectedExchangeRate: PropTypes.object.isRequired,
  updateSelectedExchangeRate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  exchangeRates: state.exchangeRates,
  selectedExchangeRate: state.selectedExchangeRate,
});

const mapDispatchToProps = {
  updateSelectedExchangeRate,
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRates);
