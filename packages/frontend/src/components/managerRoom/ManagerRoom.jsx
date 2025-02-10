import { useState } from "react";
import * as xlsx from "xlsx";
import dataService from "../../utils/dataService";
import { classes } from "../../utils/utils";
import useClassNumbers from "../../customHooks/useClassNumbers";
import TeacherPermissions from "./teacherAuthz/teacherAuthz";
import { Button, CircularProgress } from "@mui/material";
import "./managerRoom.css";

export const ManagerRoom = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [loadingStates, setLoadingStates] = useState({
    excel: false,
    classesNumbers: false,
  });
  const [uploadStatus, setUploadStatus] = useState({
    excel: null,
    classesNumbers: null,
  });
  const { classNumbers, setClassNumbers } = useClassNumbers(dataService);

  const handleClassNumberChange = (event, classRoom) => {
    const value = event.target.value.replace(/\D/g, "");
    setClassNumbers((prev) => ({
      ...prev,
      [classRoom]: value,
    }));
  };

  const updateClassNumbers = async () => {
    setLoadingStates((prev) => ({ ...prev, classesNumbers: true }));

    try {
      await dataService.updateClassesNumbers(classNumbers);
      setUploadStatus((prev) => ({ ...prev, classesNumbers: true }));
    } catch (error) {
      console.error("Failed to update class numbers:", error);
      setUploadStatus((prev) => ({ ...prev, classesNumbers: false }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, classesNumbers: false }));
    }
  };

  const handleExcelFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const workbook = xlsx.read(buffer);
      setExcelFile(workbook);
    } catch (error) {
      console.error("Failed to read Excel file:", error);
    }
  };

  const uploadExcelFile = async () => {
    if (!excelFile) return;

    setLoadingStates((prev) => ({ ...prev, excel: true }));

    try {
      for (const sheetName of excelFile.SheetNames) {
        const sheet = excelFile.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        await dataService.writeNewExcel(sheetName, jsonData);
      }

      setUploadStatus((prev) => ({ ...prev, excel: true }));
    } catch (error) {
      console.error("Failed to upload Excel file:", error);
      setUploadStatus((prev) => ({ ...prev, excel: false }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, excel: false }));
    }
  };

  return (
    <div className="manager-room-page">
      {/* Excel File Upload Section */}
      <h1>חלון ניהול</h1>
      <section className="file-upload-container">
        <input
          type="file"
          onChange={handleExcelFileUpload}
          accept=".csv, .xlsx, .xls"
        />
        <Button
          onClick={uploadExcelFile}
          disabled={loadingStates.excel || !excelFile}
          className="update-button"
          size="small"
          loadingPosition="start"
          variant="contained"
          startIcon={
            loadingStates.excel ? <CircularProgress size={20} /> : null
          }
        >
          {loadingStates.excel ? "" : "עדכן אקסל"}
        </Button>

        {uploadStatus.excel === true && (
          <div className="success-msg">האקסל עלה בהצלחה</div>
        )}
        {uploadStatus.excel === false && (
          <div className="error-msg">
            חלה שגיאה בעת העלאת האקסל. אנא נסו שנית.
          </div>
        )}
      </section>

      {/* Classes Numbers Input Section */}
      <section className="classes-numbers-container">
        {classes.map((classRoom) => (
          <div key={classRoom} className="input-group">
            <label htmlFor={classRoom}>{classRoom}</label>
            <input
              type="text"
              id={classRoom}
              value={classNumbers[classRoom] || "0"}
              placeholder="מספר כיתות"
              onChange={(e) => handleClassNumberChange(e, classRoom)}
            />
          </div>
        ))}

        <Button
          onClick={updateClassNumbers}
          disabled={loadingStates.classesNumbers}
          className="update-button"
          size="small"
          loadingPosition="start"
          variant="contained"
          startIcon={
            loadingStates.classesNumbers ? <CircularProgress size={20} /> : null
          }
        >
          {loadingStates.classesNumbers ? "" : "עדכן"}
        </Button>

        {uploadStatus.classesNumbers === true && (
          <div className="success-msg">מספר הכיתות לכל שכבה עודכן בהצלחה</div>
        )}
        {uploadStatus.classesNumbers === false && (
          <div className="error-msg">
            חלה שגיאה בעדכון מספר הכיתות לשכבה. אנא נסו שנית
          </div>
        )}
      </section>

      <TeacherPermissions classNumbers={classNumbers} />
    </div>
  );
};

export default ManagerRoom;
