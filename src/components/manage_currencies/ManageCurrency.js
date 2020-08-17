import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputForm from "../common/TextInputForm";

const ManageCurrency = () => {
  return (
    <div>
      <TextInputForm />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

ManageCurrency.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCurrency);
