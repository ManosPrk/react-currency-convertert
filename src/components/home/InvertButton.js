import React from "react";
import "../../css/InvertButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function InvertButton({ onInvertClick }) {
  return (
    <div className="form-group" id="invert-button-container">
      <FontAwesomeIcon size="lg" icon={faExchangeAlt} onClick={onInvertClick} />
    </div>
  );
}

InvertButton.propTypes = {
  onInvertClick: PropTypes.func.isRequired,
};

export default InvertButton;
