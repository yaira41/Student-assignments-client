import { styled, Paper } from "@mui/material";

export const TableContainerWrapper = styled(Paper)({
  overflow: "auto",
  width: "95%",
  maxHeight: "43rem",
  margin: "0 auto",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",

  /* פסי גלילה בולטים וברורים למשתמש */
  "&::-webkit-scrollbar": {
    width: "12px",
    height: "12px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f9f9f9",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#a5cfdf",
    borderRadius: "8px",
    border: "3px solid #f9f9f9",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#32819e",
  },
});

export const StyledTable = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  tableLayout: "auto",

  "& thead": {
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  "& th": {
    position: "sticky",
    borderBottom: "2px solid #4092b140",
    padding: 0,
  },
});

export const HeaderCell = styled("th")({
  backgroundColor: "#f8fafd",
  position: "relative",
  padding: 0,
  userSelect: "none",
});

export const HeaderContent = styled("div")({
  padding: "12px 4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background-color 0.2s",
  boxSizing: "border-box",
  "&:hover": {
    backgroundColor: "#eff5f8",
  },
});

export const DataCell = styled("td")({
  padding: "12px 8px",
  fontSize: "0.875rem",
  transition: "background-color 0.2s",
  whiteSpace: "nowrap",
});
