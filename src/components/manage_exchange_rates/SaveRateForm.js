import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import TextInput from "../common/TextInput";

function SaveRateForm({
  baseId,
  targetId,
  ratio,
  disableSelect,
  handleOnSubmit,
  handleOnBlur,
  handleChange,
  currencies,
  errors,
}) {
  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleOnSubmit}>
          <div id="currency-form-row" className="form-row">
            <TextInput
              name="ratio"
              label="Ratio"
              value={ratio}
              onChange={handleChange}
              onBlur={handleOnBlur}
              error={errors.ratio}
            />
            <SelectInput
              name="baseId"
              label="From"
              value={baseId}
              defaultOption="Currency.."
              options={currencies.map((currency) => ({
                value: currency.id,
                text: currency.name,
              }))}
              onChange={handleChange}
              disableSelect={disableSelect}
              error={errors.base}
            />
            <SelectInput
              name="targetId"
              label="To"
              value={targetId}
              defaultOption="Currency.."
              options={currencies.map((currency) => ({
                value: currency.id,
                text: currency.name,
              }))}
              onChange={handleChange}
              disableSelect={disableSelect}
              error={errors.target}
            />
            <div className="form-group">
              <button type="submit" className="btn btn-warning">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

SaveRateForm.propTypes = {
  baseId: PropTypes.number.isRequired,
  targetId: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  disableSelect: PropTypes.bool,
  handleOnSubmit: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired,
  errors: PropTypes.object,
};

export default SaveRateForm;
