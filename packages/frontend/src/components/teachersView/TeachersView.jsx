import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../table/Table.jsx";
import { useLocation } from "react-router-dom";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import dataService from "../../utils/dataService.js";
import { Logout } from "@mui/icons-material";
import "./teachersView.css";

const TeachersView = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
  };

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
  }, [classroom]);

  return (
    <div
      className="back-pic2"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "2rem",
          }}
        >
          <h1 style={{ margin: 0 }}> כיתה {classroom}</h1>
          <Tooltip title="התנתק">
            <IconButton
              style={{ cursor: "pointer" }}
              color="error"
              onClick={handleClick}
            >
              <Logout fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>

        {!isLoading ? (
          classroomData && <TableComponent tableData={classroomData} />
        ) : (
          <CircularProgress
            sx={{ marginTop: "5rem", placeSelf: "center", display: "flex" }}
          />
        )}
      </div>
    </div>
  );
};

export default TeachersView;
