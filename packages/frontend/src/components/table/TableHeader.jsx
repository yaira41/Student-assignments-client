import React from "react";
import { Box } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown, Star } from "@mui/icons-material";
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
  const isVertical = !isSerial && !isName;

  const isFinalGrade =
    typeof header === "string" && header.includes("ציון סופי");

  const handleSort = (e) => {
    if (e.target.closest("button")) return;
    column.toggleSorting();
  };

  return (
    <HeaderContent
      onClick={handleSort}
      style={{
        height: isVertical ? "150px" : "100%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isVertical ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
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
                  maxHeight: "130px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: isFinalGrade ? 800 : 600,
                  fontSize: "0.82rem",
                  color: "#475569",
                }
              : {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "180px",
                  fontWeight: 600,
                  color: isFinalGrade ? "#1e293b" : "#475569",
                }
          }
          title={header}
        >
          {header}
          {isFinalGrade && (
            <Star
              sx={{
                fontSize: "0.9rem",
                color: "#f59e0b",
                marginBottom: "0.3rem",
                transform: isVertical ? "rotate(90deg)" : "none",
              }}
            />
          )}
        </span>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "18px",
          }}
        >
          {sortDir &&
            (sortDir === "asc" ? (
              <KeyboardArrowUp sx={{ color: "#457b9d" }} fontSize="small" />
            ) : (
              <KeyboardArrowDown sx={{ color: "#457b9d" }} fontSize="small" />
            ))}
        </Box>
      </Box>
    </HeaderContent>
  );
};
