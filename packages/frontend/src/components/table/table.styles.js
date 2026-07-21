import { styled, Paper } from "@mui/material";

export const TableContainerWrapper = styled(Paper)({
  overflow: "auto",
  width: "98%",
  maxHeight: "45rem",
  margin: "0 auto",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",

  /* פסי גלילה חלקים ומודרניים יותר */
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f7fafc",
    borderRadius: "12px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#cbd5e1",
    borderRadius: "12px",
    border: "2px solid #f7fafc",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#94a3b8",
  },
});

export const StyledTable = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  tableLayout: "auto",
  fontFamily: "system-ui, -apple-system, sans-serif",

  "& thead": {
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  "& th": {
    position: "sticky",
    borderBottom: "1px solid #cbd5e1",
    padding: 0,
  },
});

export const SubjectGroupHeader = styled("div")({
  padding: "10px 14px",
  margin: "4px 6px",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "0.9rem",
  textAlign: "center",
  letterSpacing: "0.3px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  minWidth: "max-content",
});

export const HeaderContent = styled("div")({
  padding: "12px 4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
});

export const DataCell = styled("td")({
  padding: "10px 8px",
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#334155",
  transition: "all 0.15s ease",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
});
