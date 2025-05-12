import React from "react";
import { Box, IconButton } from "@mui/material";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  PushPin,
  PushPinOutlined,
} from "@mui/icons-material";
import { HeaderContent } from "./table.styles";

export const TableHeader = ({
  column,
  header,
  isPinned = false,
  onTogglePin,
}) => {
  const sortDir = column.getIsSorted();
  const isPinable = header === "שם התלמידה";

  const handlePinLeft = () => {
    onTogglePin("left");
  };

  const handleSort = (e) => {
    // Prevent sort when clicking the pin button

    if (e.target.closest("button")) return;

    column.toggleSorting();
  };

  return (
    <HeaderContent onClick={handleSort}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "200px",
          }}
          title={header}
        >
          {header.length > 15 ? `${header.substring(0, 15)}...` : header}
        </span>

        <Box>
          {sortDir &&
            (sortDir === "asc" ? (
              <KeyboardArrowUp color="primary" />
            ) : (
              <KeyboardArrowDown color="primary" />
            ))}
        </Box>
      </Box>
    </HeaderContent>
  );
};
