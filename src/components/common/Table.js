import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/common/Table.css";
import Pagination from "./Pagination";

function Table({ columns, rows, title, buttons }) {
  const [currentRows, setCurrentRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 10;

  function onPageChanged(page) {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentPage(page);
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
        pageLimit={pageLimit}
        reqPageNeighbours={1}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
      />
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string,
  buttons: PropTypes.array,
};

export default Table;
