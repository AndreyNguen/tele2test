import {
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOST } from "../Api/Host";

type LoginPageProps = {
  //   login: string;
  //   password: string;
};

const LoginPage: React.FC<LoginPageProps> = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${HOST}/ru/data/v3/testmethods/docs/login`,
        {
          username: login,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
      console.log("response", response.data);
    } catch (error) {
      console.error("Error:", error);
      setError("Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Stored token", token);

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            name="userName"
            value={login}
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            name="password"
            value={password}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </>
      )}
      {error && (
        <Snackbar
          open
          autoHideDuration={6000}
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </Container>
  );
};

export default LoginPage;
