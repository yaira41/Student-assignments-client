import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Paper, Button, IconButton, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { StyledTable, DataCell } from "./table.styles";
import { TableHeader } from "./TableHeader";
import { FilterRow } from "./FilterRow";
import { ColumnMenu } from "./ColumnMenu";
import {
  getHeadersGroups,
  createSortingFunction,
  processData,
  fuzzyFilter,
} from "../../utils/tableUtils";

const TableComponent = ({ tableData }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnResizing, setColumnResizing] = useState({});
  const [columnPinning, setColumnPinning] = useState({
    left: [],
    right: [],
  });

  const getColumnStyle = (column, backgroundColor = "#fff") => {
    // const a = columnPinning.left.indexOf(column.id);
    // let aw;
    // if (a > 0) {
    //   aw = table
    //     .getRowModel()
    //     .rows[0].getVisibleCells()
    //     .find((c) => c.column.id === columnPinning.left[a])
    //     .column.getSize();
    // }

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
      backgroundColor,
    };
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const data = useMemo(() => processData(tableData), [tableData]);
  const columnHelper = createColumnHelper();

  const createColumns = () => {
    const columns = [
      columnHelper.accessor("serialNumber", {
        header: "#",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
        size: 50,
        enablePinning: false,
      }),
    ];

    Object.entries(getHeadersGroups(tableData)).forEach(([key, values]) => {
      const group = columnHelper.group({
        id: key,
        header: () => (
          <Box
            sx={{
              padding: "12px 16px",
              // backgroundColor: "#f8f9fa",
              minWidth: "max-content",
              fontWeight: 600,
              backgroundColor: "rgb(215 239 248 / 25%)",
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
            cell: (info) => info.row.original[info.column.id],
            sortingFn: createSortingFunction,
            filterFn: fuzzyFilter,
            size: 200,
          })
        ),
      });
      columns.push(group);
    });

    return columns;
  };

  const columns = useMemo(() => createColumns(), [columnPinning]);

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

  const resetFilters = () => {
    setColumnFilters([]);
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
    <Box id="mainTable" sx={{ direction: "rtl" }}>
      <Paper
        elevation={2}
        sx={{
          overflow: "auto",
          width: "99%",
          height: "99%",
          border: "1px solid gray",
        }}
      >
        <Box sx={{ width: "fit-content", p: 2, display: "flex", gap: 2 }}>
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
          <Button
            variant="contained"
            onClick={resetFilters}
            disabled={columnFilters.length === 0}
            style={{ backgroundColor: "rgb(50 129 158 / 70%)" }}
          >
            נקה סינון
          </Button>
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
        <StyledTable>
          <thead style={{ height: "5rem" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
            {table.getHeaderGroups().map((headerGroup, index) => {
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
            })}
          </thead>
          <tbody
            style={{
              overflowY: "auto",
              height: "13rem !important",
            }}
          >
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <DataCell
                    key={cell.id}
                    style={getColumnStyle(
                      cell.column,
                      index % 2 === 0 ? "#ffffff" : "#f8f9fa"
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
