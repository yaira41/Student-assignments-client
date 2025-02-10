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
        <span>{header}</span>

        <Box>
          {sortDir &&
            (sortDir === "asc" ? (
              <KeyboardArrowUp color="primary" />
            ) : (
              <KeyboardArrowDown color="primary" />
            ))}
        </Box>

        {isPinable && (
          <Box>
            <IconButton
              size="small"
              onClick={handlePinLeft}
              color={isPinned ? "primary" : "default"}
            >
              {isPinned ? <PushPin /> : <PushPinOutlined />}
            </IconButton>
          </Box>
        )}
      </Box>
    </HeaderContent>
  );
};
