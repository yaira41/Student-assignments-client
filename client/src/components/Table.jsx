import React from 'react';

const tableStyle = {
    border: "1px solid black",
    borderCollapse: "collapse",
  };
  
  const tdStyle = {
    border: "1px solid black",
  };
  
  export const Table = ({ id, columns, data }) => (
    <table style={tableStyle}>
      <tbody>
        <tr>
          {columns.map(({ path, name }) => (
            <th style={tdStyle} key={path}>{name}</th>
          ))}
        </tr>
        {data.map((rowData) => (
          <tr key={rowData[id]}>
            {columns.map(({ path }) => (
              <td style={tdStyle} key={path}>
                {rowData[path]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );