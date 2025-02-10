import { styled } from "@mui/material";

export const StyledTable = styled("table")({
  width: "100%",
  height: "99%",
  overflowX: "auto",
  borderCollapse: "separate",
  borderSpacing: 0,
  "& th, & td": {
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
  },
});

export const HeaderCell = styled("th")({
  backgroundColor: "#fff",
  position: "relative",
  padding: 0,
  userSelect: "none",
});

export const HeaderContent = styled("div")({
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

export const DataCell = styled("td")({
  padding: "12px 16px",
  fontSize: "0.875rem",
});
