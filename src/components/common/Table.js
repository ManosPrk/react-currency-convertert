import React from "react";
import PropTypes from "prop-types";
import "../../css/common/Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Table({ columns, rows, title, handleOnClick, buttons }) {
  return (
    <div className="table-container">
      {title && <h1 className="table-header">{title}</h1>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            {columns.map((column) => {
              return (
                <th key={column} scope="col">
                  {column}
                </th>
              );
            })}
            {buttons.map((button) => (
              <th key={button.text}></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                {Object.values(row).map((item) => (
                  <td key={item}>{item}</td>
                ))}
                {buttons.map((button) => {
                  return (
                    <td key={button.text}>
                      <button
                        className={`btn ${button.class}`}
                        onClick={() => button.handleClick(row)}
                        name={button.text}
                      >
                        {button.text}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default Table;
