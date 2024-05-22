import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FormAdd from "./FormAdd";
import { HOST } from "../Api/Host";
import EditForm from "./EditForm";

interface TableRecord {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

const Dashboard: React.FC = () => {
  const [rows, setRows] = useState<TableRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<TableRecord | null>(null);

  console.log("rows", rows);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
        {
          headers: { "x-auth": token || "" },
        }
      );
      setRows(response.data.data);
      console.log("token", token);
    } catch (err) {
      setError("Ошибка при получении данных");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = (newRecord: TableRecord) => {
    setRows((prevRows) => [...prevRows, newRecord]);
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        {
          headers: { "x-auth": token || "" },
        }
      );
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении записи", err);
    }
  };

  const handleEditRecord = (record: any) => {
    setCurrentRecord(record);
    setEditDialogOpen(true);
  };

  const handleSaveRecord = async () => {
    if (!currentRecord) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${currentRecord.id}`,
        currentRecord,
        {
          headers: { "x-auth": token || "" },
        }
      );

      if (response.data.error_code === 0) {
        setRows(
          rows.map((row) =>
            row.id === currentRecord.id ? response.data.data : row
          )
        );
        setEditDialogOpen(false);
        setCurrentRecord(null);
      } else {
        console.error("Ошибка при сохранении записи", response.data);
      }
    } catch (err) {
      console.error("Ошибка при сохранении записи", err);
    }
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setCurrentRecord(null);
  };

  const handleChangeRecordField = (field: string, value: string) => {
    if (currentRecord) {
      setCurrentRecord({
        ...currentRecord,
        [field]: value,
      });
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: 20 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>companySigDate</TableCell>
                  <TableCell>companySignatureName</TableCell>
                  <TableCell>documentName</TableCell>
                  <TableCell>documentStatus</TableCell>
                  <TableCell>documentType</TableCell>
                  <TableCell>employeeNumber</TableCell>
                  <TableCell>employeeSigDate</TableCell>
                  <TableCell>employeeSignatureName</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.companySigDate}</TableCell>
                    <TableCell>{row.companySignatureName}</TableCell>
                    <TableCell>{row.documentName}</TableCell>
                    <TableCell>{row.documentStatus}</TableCell>
                    <TableCell>{row.documentType}</TableCell>
                    <TableCell>{row.employeeNumber}</TableCell>
                    <TableCell>{row.employeeSigDate}</TableCell>
                    <TableCell>{row.employeeSignatureName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteRecord(row.id)}
                      >
                        Удалить
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditRecord(row)}
                      >
                        Изменить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <hr />
          <FormAdd onAddRecord={handleAddRecord} />
        </>
      )}
      {error && <p>{error}</p>}
      <EditForm
        open={editDialogOpen}
        record={currentRecord}
        onClose={handleCloseDialog}
        onSave={handleSaveRecord}
        onChange={handleChangeRecordField}
      />
    </Container>
  );
};

export default Dashboard;
