/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";

function PageItem({ handleClick, pageText, active }) {
  return (
    <>
      <li className={`page-item${active ? " active" : ""}`}>
        <a href="#" onClick={handleClick} className="page-link">
          {pageText}
        </a>
      </li>
    </>
  );
}

PageItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default PageItem;
