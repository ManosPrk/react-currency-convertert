import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "../common/Table";
import {
  loadCurrencies,
  saveCurrency,
  deleteCurrency,
} from "../../redux/actions/currencyActions";
import TextInputForm from "../common/TextInputForm";
import { toast } from "react-toastify";

function ManageCurrencies({
  currencies,
  loadCurrencies,
  saveCurrency,
  deleteCurrency,
}) {
  const [currency, setCurrency] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
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
      loadCurrencies().catch((err) => alert(err));
    }
  }, []);

  function formIsValid() {
    const { name, isoCode } = currency;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!isoCode) errors.isoCode = "IsoCode is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleUpdate(currency) {
    currency.id = currencies.find((c) => c.name === currency.name).id;
    setCurrency(currency);
    setShowEditForm(true);
  }

  function handleCreate() {
    setCurrency({ name: "", isoCode: "" });
    setShowEditForm(true);
  }

  function handleDelete(currency) {
    deleteCurrency(currencies.find((c) => c.name === currency.name));
  }

  function handleFormSave() {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }

    saveCurrency(currency)
      .then((message) => toast.success(message))
      .catch((message) => toast.error(message));
    setCurrency({});
    setShowEditForm(false);
  }

  function handleOnChange(event) {
    const { name, value } = event.target;

    setCurrency((prevEditableCurrency) => ({
      ...prevEditableCurrency,
      [name]: value,
    }));
  }

  return (
    <div className="content-wrapper">
      {currencies.length > 0 && (
        <div className="container content-container">
          <div>
            <h1>Manage Currencies</h1>
            <button
              style={{ fontSize: "1.5rem" }}
              className="btn btn-warning"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
          {showEditForm && (
            <TextInputForm
              items={{
                name: currency.name,
                isoCode: currency.isoCode,
              }}
              onChange={handleOnChange}
              onSave={handleFormSave}
              errors={errors}
            />
          )}
          <Table
            columns={["ID", "Name", "ISO code"]}
            rows={currencies}
            buttons={tableButtons}
          />
        </div>
      )}
    </div>
  );
}

ManageCurrencies.propTypes = {
  currencies: PropTypes.array.isRequired,
  currency: PropTypes.object.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  saveCurrency: PropTypes.func.isRequired,
  deleteCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.currencies,
});

const mapDispatchToProps = {
  loadCurrencies,
  saveCurrency,
  deleteCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCurrencies);
