import React from "react";
import { Table as TableStrap } from "react-bootstrap";
import { useTable } from "react-table";
import PropTypes from "prop-types";

function Table({
  columns,
  data,
  className,
  rowProps,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    }
  );

  return (
    <TableStrap
      hover
      responsive
      {...getTableProps()}
      className={`background-color-white-1 mt-m ${className}`}
    >
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, headerIndex) => (
              <th
                key={headerIndex}
                data-testid={column.testId || ""}
                className={`font-t-table-header`}
              >
                {column.headerCell || column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              {...(rowProps && rowProps(row))}
              key={i}
            >
              {row.cells.map((cell, j) => (
                <td
                  key={j}
                  className={`font-t2-table-regular`}
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </TableStrap>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  className: PropTypes.string,
  rowProps: PropTypes.func,
};

export default Table;
