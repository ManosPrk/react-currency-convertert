import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

function TextInputForm({ onSave, onChange, items, errors }) {
  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={onSave} id="text-input-form">
          <div className="form-row">
            {Object.keys(items).map((key) => {
              return (
                <TextInput
                  onChange={onChange}
                  key={key}
                  name={key}
                  value={items[key]}
                  label={key}
                  error={errors[key]}
                />
              );
            })}
          </div>
          <div className="form-row">
            <div className="form-group col">
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

TextInputForm.propTypes = {
  items: PropTypes.object.isRequired,
};

export default TextInputForm;
