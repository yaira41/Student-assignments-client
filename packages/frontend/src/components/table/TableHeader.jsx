import React from "react";
import { Box } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { HeaderContent } from "./table.styles";

export const TableHeader = ({
  column,
  header,
  isPinned = false,
  onTogglePin,
}) => {
  const sortDir = column.getIsSorted();
  const isSerial = column.id === "serialNumber";
  const isName = column.id === "שם התלמידה";

  // רק עמודות הנתונים הרגילות (לא המוצמדות) יהיו לאורך
  const isVertical = !isSerial && !isName;

  const handleSort = (e) => {
    if (e.target.closest("button")) return;
    column.toggleSorting();
  };

  return (
    <HeaderContent
      onClick={handleSort}
      style={{
        height: isVertical ? "160px" : "100%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isVertical ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          height: "100%",
        }}
      >
        <span
          className="notranslate"
          translate="no"
          style={
            isVertical
              ? {
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "nowrap",
                  maxHeight: "140px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 500,
                }
              : {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "180px",
                }
          }
          title={header}
        >
          {header}
        </span>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {sortDir &&
            (sortDir === "asc" ? (
              <KeyboardArrowUp color="primary" fontSize="small" />
            ) : (
              <KeyboardArrowDown color="primary" fontSize="small" />
            ))}
        </Box>
      </Box>
    </HeaderContent>
  );
};
