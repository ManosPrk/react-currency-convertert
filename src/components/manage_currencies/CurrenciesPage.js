import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "../common/Table";
import {
  loadCurrencies,
  saveCurrency,
  deleteCurrency,
} from "../../redux/actions/currencyActions";
import TextInput from "../common/TextInput";
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
    const { Name, IsoCode } = editableCurrency;
    const errors = {};

    if (!Name) errors.Name = toast.error("Name is required");
    if (!IsoCode) errors.IsoCode = toast.error("IsoCode is required");

    return Object.keys(errors).length === 0;
  }

  function handleUpdate(currency) {
    currency.id = currencies.find((c) => c.name === currency.Name).id;
    setEditableCurrency(currency);
    setShowEditForm(true);
  }

  function handleDelete(currency) {}

  function handleFormSave() {
    event.preventDefault();
    saveCurrency(
      currencies.find((c) => c.id === editableCurrency.id)
    ).catch((err) => alert(err));
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
          <h1 style={{ marginBottom: "2rem" }}>Manage Currencies</h1>
          {showEditForm && (
            <TextInputForm
              items={{
                Name: editableCurrency.Name,
                IsoCode: editableCurrency.IsoCode,
              }}
              onChange={handleOnChange}
              onSave={handleFormSave}
            />
          )}
          <div>
            <Table
              columns={["Name", "ISO code"]}
              rows={currencies.map(({ name, isoCode }) => ({
                Name: name,
                IsoCode: isoCode,
              }))}
              updateRecord
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
