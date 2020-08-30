import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "../common/Table";
import {
  loadExchangeRates,
  deleteExchangeRate,
  saveExchangeRate,
} from "../../redux/actions/exchangeRateActions";
import { loadCurrencies } from "../../redux/actions/currencyActions";
import SaveRateForm from "./SaveRateForm";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

function ManageRates({
  currencies,
  exchangeRates,
  loadExchangeRates,
  loadCurrencies,
  saveExchangeRate,
  deleteExchangeRate,
}) {
  const [exchangeRate, setExchangeRate] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [disableSelection, setDisableSelection] = useState(false);
  const [errors, setErrors] = useState({});
  const tableButtons = [
    {
      text: "Update",
      handleClick: handleUpdate,
      class: "btn-warning",
    },
    {
      text: "Delete",
      handleClick: handleDelete,
      class: "btn-danger",
    },
  ];

  useEffect(() => {
    if (currencies.length === 0) {
      loadCurrencies().catch((err) => toast.error(err.message));
    }

    if (exchangeRates.length === 0) {
      loadExchangeRates().catch((err) => toast.error(err.message));
    }
  }, []);

  function handleUpdate(exchangeRate) {
    setExchangeRate({
      baseId: currencies.find((c) => c.isoCode === exchangeRate.base).id,
      targetId: currencies.find((c) => c.isoCode === exchangeRate.target).id,
      ratio: exchangeRate.ratio,
    });
    setDisableSelection(true);
    setShowEditForm(true);
  }

  function handleCreate() {
    setExchangeRate({ ratio: 1, baseId: 0, targetId: 0 });
    setDisableSelection(false);
    setShowEditForm(true);
  }

  function handleDelete({ id }) {
    deleteExchangeRate(id)
      .then((message) => toast.success(message))
      .catch((err) => toast.error(err.message));
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    setExchangeRate((prevExchangeRate) => ({
      ...prevExchangeRate,
      [name]: value,
    }));
  }

  function handleOnRatioBlur(event) {
    const { name, value } = event.target;
    setExchangeRate((prevExchangeRate) => ({
      ...prevExchangeRate,
      [name]: Number(value.replace(/[^0-9-.]/g, "")) || 0,
    }));
  }

  function formIsValid() {
    const { baseId, targetId, ratio } = exchangeRate;
    const errors = {};

    if (!ratio) errors.ratio = "ratio is required";
    if (!baseId || baseId === 0) errors.baseId = "From is required";
    if (!targetId || targetId === 0) errors.targetId = "To is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleFormSave() {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }

    saveExchangeRate(exchangeRate).then(() =>
      toast.success(
        `Record ${exchangeRate.id ? "updated" : "created"} successfully`
      )
    );
    setExchangeRate({});
    setShowEditForm(false);
  }

  return (
    <div className="content-wrapper">
      <div className="container content-container">
        <div>
          <h1>Manage Rates</h1>
          <button
            style={{ fontSize: "1.5rem" }}
            className="btn btn-warning"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        {showEditForm && (
          <SaveRateForm
            {...exchangeRate}
            currencies={currencies}
            errors={errors}
            handleOnSubmit={handleFormSave}
            handleChange={handleOnChange}
            disableSelect={disableSelection}
            handleOnBlur={handleOnRatioBlur}
          />
        )}
        {exchangeRates.length === 0 ? (
          <Spinner />
        ) : (
          <Table
            columns={["ID", "From", "To", "Ratio"]}
            rows={exchangeRates.map(({ id, base, target, ratio }) => ({
              id,
              base: base.isoCode,
              target: target.isoCode,
              ratio,
            }))}
            buttons={tableButtons}
          />
        )}
      </div>
    </div>
  );
}

ManageRates.propTypes = {
  currencies: PropTypes.array.isRequired,
  exchangeRates: PropTypes.array.isRequired,
  loadExchangeRates: PropTypes.func.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  saveExchangeRate: PropTypes.func.isRequired,
  deleteExchangeRate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  exchangeRates: state.exchangeRates,
  currencies: state.currencies,
});

const mapDispatchToProps = {
  loadCurrencies,
  loadExchangeRates,
  saveExchangeRate,
  deleteExchangeRate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRates);
