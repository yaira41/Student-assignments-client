import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../table/Table.jsx";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import dataService from "../../utils/dataService.js";
import "./teachersView.css";
import { Logout } from "@mui/icons-material";

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
    <div className="back-pic2">
      <div
        style={{
          maxWidth: "100%",
          height: "40rem",
          marginRight: "10rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            margin: "4rem 0 0 0",
          }}
        >
          <h1 style={{ margin: "0 1rem 0 0" }}> כיתה {classroom}</h1>
          <Logout
            style={{ margin: "0 0 0 8rem", cursor: "pointer" }}
            color="error"
            fontSize="large"
            onClick={handleClick}
          >
            {" "}
            התנתק
          </Logout>
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
