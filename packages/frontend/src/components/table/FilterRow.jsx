import React from "react";
import { TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FilterCell = styled(Box)(({ theme }) => ({
  padding: "8px",
  backgroundColor: "#f8f9fa",
  boxShadow: "inherit",
  // borderBottom: "1px solid #e0e0e0",
  // borderRight: "1px solid #e0e0e0",
}));

export const FilterRow = ({ headers, style }) => {
  return (
    <tr>
      {headers.map((header) =>
        header.id === "שם התלמידה" ? (
          <td key={header.id} style={style(header.column)}>
            <FilterCell>
              {!header.isPlaceholder && (
                <TextField
                  size="small"
                  fullWidth
                  placeholder="סנן..."
                  value={header.column.getFilterValue() || ""}
                  onChange={(e) => header.column.setFilterValue(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              )}
            </FilterCell>
          </td>
        ) : (
          <></>
        )
      )}
    </tr>
  );
};
