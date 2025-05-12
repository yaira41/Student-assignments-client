import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Paper, Button, IconButton, Box, TextField } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { StyledTable, DataCell } from "./table.styles";
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
  const [columnPinning, setColumnPinning] = useState({
    left: ["שם התלמידה"],
    right: [],
  });

  const getColumnStyle = (column, backgroundColor = "#ffffff") => {
    const a = column.parent === undefined ? true : false;
    // console.log(column);

    return {
      width: `20rem`,
      boxShadow: columnPinning.left.includes(column.id)
        ? "4px 0 4px -4px gray inset"
        : undefined,
      position: columnPinning.left.includes(column.id) ? "sticky" : "relative",
      left: undefined,
      right: columnPinning.left.includes(column.id)
        ? `${column.getAfter("left")}px`
        : undefined,

      zIndex: columnPinning.left.includes(column.id) ? 1 : 0,
      backgroundColor:
        backgroundColor !== "#ffffff" && columnPinning.left.includes(column.id)
          ? "#d3e4ea"
          : backgroundColor,
      opacity: columnPinning.left.includes(column.id) ?? "100%",
      textAlign: "center",
      borderRight: a ? "" : "1px solid #4092b140",
      borderBottom: "none",
    };
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const data = useMemo(() => processData(tableData), [tableData]);
  const subjectsColors = useMemo(
    () => generateBlueShades(Object.keys(data?.[0]).length || 0),
    [data]
  );
  const columnHelper = createColumnHelper();

  const createColumns = () => {
    const columns = [
      columnHelper.accessor("serialNumber", {
        header: "",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
        size: 50,
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
                    columnPinning.left.includes(column.id) ||
                    columnPinning.right.includes(column.id)
                  }
                  onTogglePin={(side) => handleColumnPinning(column.id, side)}
                />
              ),
              cell: (info) => {
                const cellContent = info.row.original[info.column.id];
                let grade;

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
                } else if (!isNaN(cellContent)) {
                  grade = Math.round(cellContent);
                }
                return grade ? grade : cellContent;
              },
              sortingFn: createSortingFunction,
              filterFn: fuzzyFilter,
              size: 200,
            })
          ),
        });
        columns.push(group);
      }
    );

    return columns;
  };

  // const columns = useCallback(() => createColumns(), [columnPinning]);
  const columns = createColumns();

  const handleColumnPinning = (columnId, side) => {
    setColumnPinning((prev) => {
      const leftIndex = prev.left.indexOf(columnId);
      const rightIndex = prev.right.indexOf(columnId);

      if (leftIndex !== -1 || rightIndex !== -1) {
        // If already pinned, unpin
        return {
          left: prev.left.filter((id) => id !== columnId),
          right: prev.right.filter((id) => id !== columnId),
        };
      }

      // Pin to the specified side
      return {
        ...prev,
        [side]: [...prev[side], columnId],
      };
    });
  };

  const removeEmptyColumns = () => {
    const newVisibility = {};
    columns.forEach((group) => {
      if (group.columns) {
        group.columns.forEach((col) => {
          if (col.accessorKey) {
            const hasValues = data.some((row) => row[col.accessorKey]);
            newVisibility[col.accessorKey] = hasValues;
          }
        });
      }
    });
    setColumnVisibility(newVisibility);
  };

  // const resetFilters = () => {
  //   setColumnFilters([]);
  // };

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
    <Box id="mainTable" sx={{ direction: "rtl" }}>
      <Box
        sx={{
          width: "fit-content",
          p: 2,
          display: "flex",
          gap: 2,
          marginRight: "-2rem",
        }}
      >
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
          sx={{ height: "20px !important" }}
          margin="normal"
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
              .headers?.find((x) => x.id === "שם התלמידה")
              .column.setFilterValue(e.target.value)
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
        onColumnPinning={handleColumnPinning}
      />
      <Paper
        elevation={2}
        sx={{
          overflow: "auto",
          width: "93%",
          height: "43rem",
          margin: "0 0 20px 0",
        }}
      >
        <StyledTable>
          <thead style={{ height: "5rem" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={getColumnStyle(header.column)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
            {/* {table.getHeaderGroups().map((headerGroup, index) => {
              if (headerGroup.id !== "0") {
                return (
                  <FilterRow
                    key={"filter-row" + index}
                    headers={headerGroup.headers}
                    style={(column) => getColumnStyle(column)}
                  />
                );
              } else {
                return <></>;
              }
            })} */}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: index % 2 !== 0 ? "#ffffff" : "#4092b114",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <DataCell
                    key={cell.id}
                    style={getColumnStyle(
                      cell.column,
                      index % 2 !== 0 ? "#ffffff" : "#4092b114"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataCell>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Paper>
    </Box>
  );
};

export default TableComponent;
