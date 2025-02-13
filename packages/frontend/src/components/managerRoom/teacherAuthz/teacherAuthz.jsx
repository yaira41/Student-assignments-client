import React, { useMemo, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dataService from "../../../utils/dataService";

function generateClassLabels(classConfig) {
  return Object.entries(classConfig).flatMap(([grade, count]) =>
    Array.from({ length: parseInt(count) }, (_, i) => `${grade}${i + 1}`)
  );
}

const TeacherPermissions = ({ classNumbers }) => {
  generateClassLabels(classNumbers);
  const [idNumber, setIdNumber] = useState("");
  const [openClassDialog, setOpenClassDialog] = useState(false);
  const [tempSelectedClasses, setTempSelectedClasses] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  console.log({ permissions });
  const classOptions = useMemo(
    () => generateClassLabels(classNumbers),
    [classNumbers]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dataService.getTeachersAuthZ();
        const data = await response.json();
        if (typeof data === Array) {
          setPermissions(data || []);
        } else {
          throw new Error(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleOpenClassDialog = (currentClasses = []) => {
    setTempSelectedClasses(currentClasses);
    setOpenClassDialog(true);
  };

  const handleCloseClassDialog = () => {
    setOpenClassDialog(false);
    if (isEditMode) {
      setIdNumber("");
      setIsEditMode(false);
    }
    setTempSelectedClasses([]);
  };

  const handleClassSelect = (classValue) => {
    setTempSelectedClasses((prev) =>
      prev.includes(classValue)
        ? prev.filter((item) => item !== classValue)
        : [...prev, classValue]
    );
  };

  const handleConfirmClasses = async () => {
    let updatedPermissions;

    if (isEditMode) {
      updatedPermissions = permissions.map((item) =>
        item.idNumber === idNumber
          ? { ...item, selectedClasses: tempSelectedClasses }
          : item
      );
    } else {
      if (!idNumber || tempSelectedClasses.length === 0) return;

      if (permissions.find((p) => p.idNumber === idNumber)) {
        updatedPermissions = permissions.map((item) =>
          item.idNumber === idNumber
            ? { ...item, selectedClasses: tempSelectedClasses }
            : item
        );
      } else {
        const newEntry = {
          idNumber,
          selectedClasses: tempSelectedClasses,
        };
        updatedPermissions = [...permissions, newEntry];
      }
    }

    setPermissions(updatedPermissions);
    await dataService.updateTeachersAuthZ(updatedPermissions);

    setIdNumber("");
    setTempSelectedClasses([]);
    setOpenClassDialog(false);
    setIsEditMode(false);
  };

  const handleDelete = (id) => {
    const updatedPermissions = permissions.filter(
      (item) => item.idNumber !== id
    );
    setPermissions(updatedPermissions || []);
    dataService.updateTeachersAuthZ(updatedPermissions);
  };

  const handleEdit = (permission) => {
    setIdNumber(permission.idNumber);
    handleOpenClassDialog(permission.selectedClasses);
    setIsEditMode(true);
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        width: "100%",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          alignItems: "center",
          font: "heebo !important",
        }}
      >
        <TextField
          label="תעודת זהות"
          InputLabelProps={{ shrink: true }}
          size="medium"
          variant="outlined"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          variant="outlined"
          color="primary"
          disabled={!idNumber.trim()}
          onClick={() => handleOpenClassDialog()}
          sx={{ flex: 1 }}
        >
          {tempSelectedClasses.length > 0
            ? `נבחרו ${tempSelectedClasses.length} כיתות`
            : "בחר כיתות"}
        </Button>
      </Box>

      {/* Class Selection Dialog */}
      <Dialog
        open={openClassDialog}
        onClose={handleCloseClassDialog}
        maxWidth="md"
        sx={{ direction: "rtl" }}
        fullWidth
      >
        <DialogTitle>בחר כיתות</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {classOptions.map((classValue) => (
              <Grid item xs={2} key={classValue}>
                <Button
                  variant={
                    tempSelectedClasses.includes(classValue)
                      ? "outlined"
                      : "text"
                  }
                  color="primary"
                  onClick={() => handleClassSelect(classValue)}
                >
                  {classValue}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClasses}>אישור</Button>
          <Button onClick={handleCloseClassDialog}>ביטול</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>תעודת זהות</TableCell>
              <TableCell sx={{ textAlign: "right" }}>כיתות</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions &&
              permissions?.map((row) => (
                <TableRow key={row.idNumber}>
                  <TableCell>{row.idNumber}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        maxWidth: "100%",
                      }}
                    >
                      {row.selectedClasses.map((cls) => (
                        <Chip
                          key={cls}
                          label={cls}
                          sx={{
                            maxWidth: "100%",
                            wordBreak: "break-word",
                            "& .MuiChip-label": {
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(row.idNumber)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherPermissions;
