import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

function TextInputForm({ onSave, onChange, items }) {
  return (
    <div className="row">
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
                />
              );
            })}
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

TextInputForm.propTypes = {
  items: PropTypes.object.isRequired,
};

export default TextInputForm;
