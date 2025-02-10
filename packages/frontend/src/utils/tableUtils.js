const GENERAL = "כללי";

export const getHeadersGroups = (data) => {
  if (!data?.length) return {};

  const mainSubjectGroups = groupHeaders(data[0]);
  const generalKeys = getGeneralKeys(data);
  const generalGroup = {
    [GENERAL]: generalKeys.map((key) => {
      if (key === "ת.ז.") {
        return {
          accessorKey: "תז",
          header: key,
        };
      }
      return {
        accessorKey: key,
        header: key,
      };
    }),
  };

  return { ...generalGroup, ...mainSubjectGroups };
};

const groupHeaders = (input) => {
  return Object.entries(input).reduce((groups, [key, value]) => {
    const categoryKey = key.replace(/_\d+$/, "");

    if (!groups[categoryKey]) {
      groups[categoryKey] = [];
    }

    groups[categoryKey].push({
      accessorKey: key,
      header: value,
    });

    return groups;
  }, {});
};

const getGeneralKeys = (data) => {
  if (!data || data.length < 2) return [];

  const firstObjectKeys = new Set(Object.keys(data[0]));

  const uniqueKeys = data.slice(1).reduce((keys, item) => {
    Object.keys(item).forEach((key) => {
      if (!firstObjectKeys.has(key) && key !== "__EMPTY") {
        keys.add(key);
      }
    });
    return keys;
  }, new Set());

  return Array.from(uniqueKeys);
};

export const createSortingFunction = (rowA, rowB, columnId) => {
  const a = rowA.original[columnId];
  const b = rowB.original[columnId];

  const numA = Number(a);
  const numB = Number(b);

  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB;
  }

  if (isNaN(numB)) return 1;
  if (isNaN(numA)) return -1;

  return (a ?? "").localeCompare(b ?? "");
};

export const processData = (tableData) => {
  const filteredData = tableData.slice(1);
  return filteredData.map((student) => {
    const { __empty, ...rest } = student;
    if (rest["ת.ז."]) {
      rest["תז"] = rest["ת.ז."]; // Convert Hebrew ID field
      delete rest["ת.ז."];
    }
    return rest;
  });
};

export const fuzzyFilter = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  if (value == null) return false;

  const searchValue = filterValue.toLowerCase();
  const cellValue = String(value).toLowerCase();

  return cellValue.includes(searchValue);
};
