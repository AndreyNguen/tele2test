import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { HOST } from "../Api/Host";

interface FormAddProps {
  onAddRecord: (newRecord: any) => void;
}

const FormAdd: React.FC<FormAddProps> = ({ onAddRecord }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRecord = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
        formData,
        {
          headers: { "x-auth": token || "" },
        }
      );
      onAddRecord(response.data.data);
      setFormData({
        companySigDate: "",
        companySignatureName: "",
        documentName: "",
        documentStatus: "",
        documentType: "",
        employeeNumber: "",
        employeeSigDate: "",
        employeeSignatureName: "",
      });
      handleClose();
    } catch (err) {
      console.error("Ошибка при добавлении данных");
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Добавить
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить запись</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              label="companySigDate"
              type="datetime-local"
              fullWidth
              name="companySigDate"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.companySigDate}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="companySignatureName"
              fullWidth
              name="companySignatureName"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.companySignatureName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="documentName"
              fullWidth
              name="documentName"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.documentName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="documentStatus"
              fullWidth
              name="documentStatus"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.documentStatus}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="documentType"
              fullWidth
              name="documentType"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.documentType}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="employeeNumber"
              fullWidth
              name="employeeNumber"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.employeeNumber}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="employeeSigDate"
              type="datetime-local"
              fullWidth
              name="employeeSigDate"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.employeeSigDate}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="employeeSignatureName"
              fullWidth
              name="employeeSignatureName"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.employeeSignatureName}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleAddRecord} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormAdd;
