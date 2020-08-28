import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/common/Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

function Table({ columns, rows, title, handleOnClick, buttons }) {
  const [currentRows, setCurrentRows] = useState([]);

  function onPageChanged(data) {
    const { currentPage, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    setCurrentRows(rows.slice(offset, offset + pageLimit));
  }

  return (
    <div className="table-container">
      {title && <h1 className="table-header">{title}</h1>}
      <table className="table">
        <thead>
          <tr>
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
          {currentRows.map((row, index) => {
            return (
              <tr key={index}>
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
      <Pagination
        totalRecords={rows.length}
        pageLimit={10}
        reqPageNeighbours={1}
        onPageChanged={onPageChanged}
      />
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default Table;
