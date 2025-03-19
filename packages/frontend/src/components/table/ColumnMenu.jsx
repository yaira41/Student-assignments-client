import React from "react";
import { Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";

export const ColumnMenu = ({
  anchorEl,
  onClose,
  columns,
  visibility,
  onColumnToggle,
  onSelectAllToggle,
  tableData,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={onSelectAllToggle}>
        <Checkbox checked={Object.values(visibility).every(Boolean)} />
        <ListItemText primary="בחר הכל" />
      </MenuItem>
      {columns.map((column) => (
        <MenuItem key={column.id} onClick={() => onColumnToggle(column.id)}>
          <Checkbox checked={visibility[column.id] ?? true} />
          <ListItemText
            primary={
              tableData[0][column.id]
                ? `${column.id.replace(/_\d+$/, "")} - ${
                    tableData[0][column.id]
                  }`
                : column.id
            }
          />
        </MenuItem>
      ))}
    </Menu>
  );
};
