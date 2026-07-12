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
import { MoreVert } from "@mui/icons-material";
import { StyledTable, DataCell, TableContainerWrapper } from "./table.styles";
import { TableHeader } from "./TableHeader";
import { ColumnMenu } from "./ColumnMenu";
import {
  getHeadersGroups,
  createSortingFunction,
  processData,
  fuzzyFilter,
  generateBlueShades,
} from "../../utils/tableUtils";

const TableComponent = ({ tableData }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnResizing, setColumnResizing] = useState({});
  const [columnPinning, setColumnPinning] = useState({ left: [], right: [] });

  const getColumnStyle = (
    column,
    backgroundColor = "#ffffff",
    isHeader = false
  ) => {
    const isSerial = column.id === "serialNumber";
    const isName = column.id === "שם התלמידה";
    const isPinned = isSerial || isName;
    const isGroupHeader = column.columnDef?.meta === "groupHeader";

    let rightOffset = undefined;
    if (isSerial) rightOffset = "0px";
    if (isName) rightOffset = "60px";

    return {
      // עמודות אנכיות תופסות הרבה פחות רוחב כעת! (מ-20rem ירדנו ל-4.5rem בשביל המראה האנכי)
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
      backgroundColor:
        backgroundColor !== "#ffffff" && isPinned && !isHeader
          ? "#d3e4ea"
          : backgroundColor,
      textAlign: "center",
      borderRight: isGroupHeader ? "" : "1px solid #4092b140",
      borderBottom: "1px solid #e0e0e0",
      boxShadow: isName ? "4px 0 4px -4px gray inset" : undefined,
    };
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const data = useMemo(() => processData(tableData), [tableData]);
  const subjectsColors = useMemo(
    () => generateBlueShades(Object.keys(data?.[0] || {}).length || 0),
    [data]
  );
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

    Object.entries(getHeadersGroups(tableData)).forEach(
      ([key, values], index) => {
        const group = columnHelper.group({
          id: key,
          meta: "groupHeader",
          header: () => (
            <Box
              sx={{
                padding: "12px 16px",
                marginRight: key !== "כללי" && "10px",
                minWidth: "max-content",
                fontWeight: 600,
                backgroundColor: subjectsColors[index],
              }}
            >
              {key}
            </Box>
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

                if (typeof cellContent === "string") {
                  if (cellContent === "חסר") {
                    return (
                      <span
                        style={{
                          background: "#f35858",
                          padding: "2px 5px",
                          borderRadius: "8px",
                          color: "white",
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
      }
    );

    return columns;
  }, [tableData, subjectsColors, columnHelper]);

  const removeEmptyColumns = () => {
    const newVisibility = {};
    columns.forEach((group) => {
      if (group.columns) {
        group.columns.forEach((col) => {
          if (col.accessorKey) {
            const hasValues = data.some((row) => {
              if (!row["תז"]) {
                return "";
              }
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
    <Box id="mainTable" sx={{ direction: "rtl", width: "100%" }}>
      <Box sx={{ p: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <Button
          variant="contained"
          onClick={removeEmptyColumns}
          style={{ backgroundColor: "rgb(50 129 158 / 70%)" }}
        >
          הסרת עמודות ריקות
        </Button>
        <TextField
          size="small"
          placeholder="סנן שם תלמידה"
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

      <TableContainerWrapper elevation={2}>
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup, groupIndex) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => {
                  // חישוב גבהים דינמי ל-3 שורות הכותרת כדי למנוע חפיפות
                  let topOffset = "0px";
                  if (groupIndex === 1) topOffset = "48px";
                  if (groupIndex === 2) topOffset = "96px";

                  const baseStyle = getColumnStyle(
                    header.column,
                    "#f8fafd",
                    true
                  );
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...baseStyle,
                        top: topOffset,
                        verticalAlign: "bottom", // דואג שהטקסט האנכי יישב יפה מלמטה
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
              const rowBg = index % 2 !== 0 ? "#ffffff" : "#4092b114";
              return (
                <tr key={row.id} style={{ backgroundColor: rowBg }}>
                  {row.getVisibleCells().map((cell) => (
                    <DataCell
                      key={cell.id}
                      style={getColumnStyle(cell.column, rowBg, false)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </DataCell>
                  ))}
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
