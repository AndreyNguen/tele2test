import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

type Record = {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
};

type EditFormProps = {
  open: boolean;
  record: Record | null;
  onClose: () => void;
  onSave: () => void;
  onChange: (field: string, value: string) => void;
};

const EditForm: React.FC<EditFormProps> = ({
  open,
  record,
  onClose,
  onSave,
  onChange,
}) => {
  if (!record) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Изменить запись</DialogTitle>
      <DialogContent>
        <TextField
          label="companySigDate"
          name="companySigDate"
          value={record.companySigDate}
          onChange={(e) => onChange("companySigDate", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="companySignatureName"
          name="companySignatureName"
          value={record.companySignatureName}
          onChange={(e) => onChange("companySignatureName", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="documentName"
          name="documentName"
          value={record.documentName}
          onChange={(e) => onChange("documentName", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="documentStatus"
          name="documentStatus"
          value={record.documentStatus}
          onChange={(e) => onChange("documentStatus", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="documentType"
          name="documentType"
          value={record.documentType}
          onChange={(e) => onChange("documentType", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="employeeNumber"
          name="employeeNumber"
          value={record.employeeNumber}
          onChange={(e) => onChange("employeeNumber", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="employeeSigDate"
          name="employeeSigDate"
          value={record.employeeSigDate}
          onChange={(e) => onChange("employeeSigDate", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="employeeSignatureName"
          name="employeeSignatureName"
          value={record.employeeSignatureName}
          onChange={(e) => onChange("employeeSignatureName", e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onSave} color="primary" variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
