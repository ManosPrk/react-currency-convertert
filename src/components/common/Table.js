import React from "react";
import "../../css/common/Table.css";
import InvertButton from "../home/InvertButton";

function Table({
  columns,
  rows,
  updateRecord = false,
  deleteRecord = false,
  selectRecord = false,
  handleSelect,
  handleUpdate,
  handleDelete,
}) {
  return (
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
          {selectRecord && <th>Select</th>}
          {updateRecord && <th>Update</th>}
          {deleteRecord && <th>Delete</th>}
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
              {selectRecord && (
                <td>
                  <button onClick={handleSelect(row)}>Select</button>
                </td>
              )}
              {updateRecord && (
                <td>
                  <button onClick={handleUpdate(row)}>Update</button>
                </td>
              )}
              {deleteRecord && (
                <td>
                  <button onClick={handleDelete(row)}>Delete</button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
