import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button, IconButton, Box, TextField } from "@mui/material";
import { MoreVert, School } from "@mui/icons-material";
import {
  StyledTable,
  DataCell,
  TableContainerWrapper,
  SubjectGroupHeader,
} from "./table.styles";
import { TableHeader } from "./TableHeader";
import { ColumnMenu } from "./ColumnMenu";
import {
  getHeadersGroups,
  createSortingFunction,
  processData,
  fuzzyFilter,
} from "../../utils/tableUtils";

// פלטת צבעים מודרנית ורכה למקצועות השונים
const MODERN_PALETTE = [
  { main: "#2a9d8f", light: "rgba(42, 157, 143, 0.08)", text: "#ffffff" },
  { main: "#6a4c93", light: "rgba(106, 76, 147, 0.08)", text: "#ffffff" },
  { main: "#f4a261", light: "rgba(244, 162, 97, 0.08)", text: "#ffffff" },
  { main: "#1d3557", light: "rgba(29, 53, 87, 0.08)", text: "#ffffff" },
  { main: "#e63946", light: "rgba(230, 57, 70, 0.08)", text: "#ffffff" },
  { main: "#457b9d", light: "rgba(69, 123, 157, 0.08)", text: "#ffffff" },
  { main: "#83c5be", light: "rgba(131, 197, 190, 0.08)", text: "#1d3557" },
  { main: "#ffb703", light: "rgba(255, 183, 3, 0.08)", text: "#1d3557" },
];

const TableComponent = ({ tableData }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnResizing, setColumnResizing] = useState({});
  const [columnPinning, setColumnPinning] = useState({ left: [], right: [] });

  const data = useMemo(() => processData(tableData), [tableData]);

  // מיפוי קבוע של קבוצות מקצועות לצבעים כדי לשמור על עקביות
  const groupColors = useMemo(() => {
    const groups = Object.keys(getHeadersGroups(tableData) || {});
    const mapping = {};
    groups.forEach((groupName, index) => {
      // אם יש יותר מקצועות מצבעים, חוזרים על הצבעים בעזרת פעולת שארית (Mod)
      mapping[groupName] = MODERN_PALETTE[index % MODERN_PALETTE.length];
    });
    return mapping;
  }, [tableData]);

  const getColumnStyle = (
    column,
    backgroundColor = "#ffffff",
    isHeader = false,
    groupName = ""
  ) => {
    const isSerial = column.id === "serialNumber";
    const isName = column.id === "שם התלמידה";
    const isPinned = isSerial || isName;
    const isGroupHeader = column.columnDef?.meta === "groupHeader";

    let rightOffset = undefined;
    if (isSerial) rightOffset = "0px";
    if (isName) rightOffset = "60px";

    // קביעת הרקע לעמודות עם הילה (Glow) בהתאם למקצוע שלהן
    let finalBg = backgroundColor;
    if (!isHeader && !isPinned && groupName && groupColors[groupName]) {
      finalBg = groupColors[groupName].light;
    } else if (isPinned && !isHeader) {
      finalBg = "#f4f8fa"; // גוון נקי לעמודות המוצמדות
    }

    return {
      width: isSerial ? "60px" : isName ? "200px" : "4.5rem",
      minWidth: isSerial ? "60px" : isName ? "200px" : "4.5rem",
      position: isPinned ? "sticky" : isHeader ? "sticky" : "relative",
      right: rightOffset,
      left: undefined,
      zIndex: isPinned
        ? isGroupHeader
          ? 6
          : 5
        : isHeader
        ? isGroupHeader
          ? 4
          : 3
        : 1,
      backgroundColor: finalBg,
      textAlign: "center",
      borderRight: isGroupHeader ? "" : "1px solid rgba(64, 146, 177, 0.15)",
      borderBottom: "1px solid #eef2f5",
      boxShadow: isName ? "4px 0 8px -4px rgba(0,0,0,0.15) inset" : undefined,
    };
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const columnHelper = createColumnHelper();

  const columns = useMemo(() => {
    const columns = [
      columnHelper.accessor("serialNumber", {
        id: "serialNumber",
        header: "#",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
        size: 60,
        enablePinning: false,
      }),
    ];

    Object.entries(getHeadersGroups(tableData)).forEach(([key, values]) => {
      const currentColors = groupColors[key] || {
        main: "#f8fafd",
        text: "#333",
      };

      const group = columnHelper.group({
        id: key,
        meta: "groupHeader",
        header: () => (
          <SubjectGroupHeader
            style={{
              backgroundColor: currentColors.main,
              color: currentColors.text,
            }}
          >
            {key}
          </SubjectGroupHeader>
        ),
        columns: values.map(({ accessorKey, header }) =>
          columnHelper.accessor(accessorKey, {
            header: ({ column }) => (
              <TableHeader
                column={column}
                header={header}
                isPinned={
                  column.id === "שם התלמידה" || column.id === "serialNumber"
                }
                onTogglePin={() => {}}
              />
            ),
            cell: (info) => {
              const cellContent = info.row.original[info.column.id];
              const isFinalGrade =
                header &&
                typeof header === "string" &&
                header.includes("ציון סופי");

              if (info.column.id === "שם התלמידה") {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1,
                    }}
                  >
                    <School sx={{ fontSize: "1.1rem", color: "#457b9d" }} />
                    <span style={{ fontWeight: 600, color: "#2b2d42" }}>
                      {cellContent}
                    </span>
                  </Box>
                );
              }

              if (typeof cellContent === "string") {
                if (cellContent === "חסר") {
                  return (
                    <span
                      style={{
                        background: "#e63946",
                        padding: "4px 8px",
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}
                    >
                      {cellContent}
                    </span>
                  );
                }
              } else if (
                typeof cellContent === "number" &&
                !isNaN(cellContent)
              ) {
                if (cellContent > 0 && cellContent < 1) {
                  return cellContent;
                } else if (
                  isFinalGrade &&
                  cellContent !== undefined &&
                  cellContent !== null &&
                  cellContent !== ""
                ) {
                  return (
                    <span
                      style={{
                        // fontWeight: "800",
                        fontSize: "0.95rem",
                        // color: "#0f172a",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(0,0,0,0.06)",
                        display: "inline-block",
                      }}
                    >
                      {Math.round(cellContent)}
                    </span>
                  );
                }
                return Math.round(cellContent);
              }
              return cellContent;
            },
            sortingFn: createSortingFunction,
            filterFn: fuzzyFilter,
            size: 80,
          })
        ),
      });
      columns.push(group);
    });

    return columns;
  }, [tableData, groupColors, columnHelper]);

  const removeEmptyColumns = () => {
    const newVisibility = {};
    columns.forEach((group) => {
      if (group.columns) {
        group.columns.forEach((col) => {
          if (col.accessorKey) {
            const hasValues = data.some((row) => {
              if (!row["תז"]) return "";
              return row[col.accessorKey];
            });
            newVisibility[col.accessorKey] = hasValues;
          }
        });
      }
    });
    setColumnVisibility(newVisibility);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnResizing,
      columnPinning,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnResizingChange: setColumnResizing,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  const handleColumnToggle = (columnId) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: prev[columnId] !== undefined ? !prev[columnId] : false,
    }));
  };

  const handleSelectAllToggle = () => {
    const allVisible = Object.values(columnVisibility).every(Boolean);
    const newVisibility = {};
    table.getAllLeafColumns().forEach((column) => {
      newVisibility[column.id] = !allVisible;
    });
    setColumnVisibility(newVisibility);
  };

  return (
    <Box id="mainTable" sx={{ direction: "rtl", width: "100%", p: 1 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <IconButton
          onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          sx={{ backgroundColor: "#f0f4f8" }}
        >
          <MoreVert />
        </IconButton>
        <Button
          variant="contained"
          onClick={removeEmptyColumns}
          sx={{
            backgroundColor: "#457b9d",
            textTransform: "none",
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#1d3557" },
          }}
        >
          הסרת עמודות ריקות
        </Button>
        <TextField
          size="small"
          placeholder="חיפוש שם תלמידה..."
          variant="outlined"
          sx={{
            minWidth: "240px",
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
          value={
            table
              .getHeaderGroups()[1]
              ?.headers?.find((x) => x.id === "שם התלמידה")
              ?.column?.getFilterValue() || ""
          }
          onChange={(e) =>
            table
              .getHeaderGroups()[1]
              ?.headers?.find((x) => x.id === "שם התלמידה")
              ?.column.setFilterValue(e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
        />
      </Box>

      <ColumnMenu
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        columns={table.getAllLeafColumns()}
        visibility={columnVisibility}
        onColumnToggle={handleColumnToggle}
        onSelectAllToggle={handleSelectAllToggle}
        tableData={tableData}
        columnPinning={columnPinning}
        onColumnPinning={() => {}}
      />

      <TableContainerWrapper elevation={0}>
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup, groupIndex) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => {
                  let topOffset = "0px";
                  if (groupIndex === 1) topOffset = "48px";
                  if (groupIndex === 2) topOffset = "96px";

                  // מציאת שם הקבוצה (המקצוע) לצורך העברת הצבע הנכון
                  const groupName = header.column.parent?.id || "";

                  const baseStyle = getColumnStyle(
                    header.column,
                    "#ffffff",
                    true,
                    groupName
                  );
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...baseStyle,
                        top: topOffset,
                        verticalAlign: "bottom",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              const rowBg =
                index % 2 !== 0 ? "#ffffff" : "rgba(240, 244, 248, 0.4)";
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const groupName = cell.column.parent?.id || "";
                    return (
                      <DataCell
                        key={cell.id}
                        style={getColumnStyle(
                          cell.column,
                          rowBg,
                          false,
                          groupName
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </DataCell>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </TableContainerWrapper>
    </Box>
  );
};

export default TableComponent;
