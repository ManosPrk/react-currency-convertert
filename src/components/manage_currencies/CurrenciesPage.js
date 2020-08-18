import React, { useEffect, useState } from "react";
import PropTypes, { object } from "prop-types";
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
  const [editableCurrency, setEditableCurrency] = useState({});
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

  function updateFormIsValid() {
    const { name, isoCode } = editableCurrency;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!isoCode) errors.isoCode = "IsoCode is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleUpdate(currency) {
    currency.id = currencies.find((c) => c.name === currency.name).id;
    setEditableCurrency(currency);
    setShowEditForm(true);
  }

  function handleCreate() {
    setEditableCurrency({});
    setShowEditForm(true);
  }

  function handleDelete(currency) {
    deleteCurrency(currencies.find((c) => c.name === currency.name));
  }

  function handleFormSave() {
    event.preventDefault();

    if (!updateFormIsValid()) {
      toast.error("Form Invalid");
      return;
    }

    saveCurrency(editableCurrency).catch((err) => alert(err));
    setEditableCurrency({});
    setShowEditForm(false);
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setEditableCurrency((prevEditableCurrency) => ({
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
            <button className="btn btn-warning" onClick={handleCreate}>
              Create
            </button>
          </div>
          {showEditForm && (
            <TextInputForm
              items={{
                name: editableCurrency.name,
                isoCode: editableCurrency.isoCode,
              }}
              onChange={handleOnChange}
              onSave={handleFormSave}
              errors={errors}
            />
          )}
          <div>
            <Table
              columns={["Name", "ISO code"]}
              rows={currencies.map(({ name, isoCode }) => ({
                name,
                isoCode,
              }))}
              buttons={tableButtons}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ManageCurrencies.propTypes = {
  currencies: PropTypes.array.isRequired,
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
