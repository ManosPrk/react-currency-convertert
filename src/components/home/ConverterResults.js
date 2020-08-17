import React from "react";
import PropTypes from "prop-types";
import "../../css/ConverterResults.css";
import { formatCurrency } from "../../helpers/formatHelpers";

function ConverterResults({ base, target, baseAmount, targetAmount }) {
  return (
    <div id="conversion-result-wrapper" className="row justify-content-center">
      <div id="conversion-result" className="">
        <div className="base-currency-wrapper">
          <span className="base-amount">
            {formatCurrency(baseAmount, base)}
          </span>
          {" ="}
        </div>
        <div className="target-currency-wrapper d-flex">
          <span className="target-amount">
            {formatCurrency(targetAmount, target)}
          </span>
        </div>
      </div>
    </div>
  );
}

ConverterResults.propTypes = {
  base: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  baseAmount: PropTypes.number.isRequired,
  targetAmount: PropTypes.number.isRequired,
};

export default ConverterResults;
