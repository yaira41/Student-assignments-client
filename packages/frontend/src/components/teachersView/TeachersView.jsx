import React, { useEffect, useState } from "react";
import TableComponent from "../table/Table.jsx";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import dataService from "../../utils/dataService.js";

const TeachersView = () => {
  let location = useLocation();

  const [classroom] = useState(location.state);
  const [classroomData, setClassroomData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const response = await (
          await dataService.getClassroom(classroom)
        ).json();
        if (response.status === 500) {
          throw new Error();
        }
        setClassroomData(response);
      } catch (err) {
        console.error("Failed to fetch classroom data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassroomData();
  }, []);

  return (
    <div
      style={{
        maxWidth: "100%",
        height: "40rem",
      }}
    >
      <h1 style={{ placeSelf: "center", marginTop: "5rem" }}>
        {" "}
        כיתה {classroom}
      </h1>

      {!isLoading ? (
        classroomData && <TableComponent tableData={classroomData} />
      ) : (
        <CircularProgress
          sx={{ marginTop: "5rem", placeSelf: "center", display: "flex" }}
        />
      )}
    </div>
  );
};

export default TeachersView;
