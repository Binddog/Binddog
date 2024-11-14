import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { logIn } from "../api/user";

const LoginPage = ({ onLogin }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleLogin = async () => {
    try {
      const response = await logIn(email, password);
      if (response.resultCode === "SUCCESS") {
        setSnackbarMessage("로그인 성공!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        onLogin(email);

        navigate("/");

        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      } else {
        setSnackbarMessage("로그인 실패! 이메일과 비밀번호를 확인하세요.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("로그인 실패: 서버와의 통신에 문제가 있습니다.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.log(email, password);
      console.error("로그인 실패:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
      onKeyDown={handleKeyDown}
    >
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ ...theme.typography.h2, padding: "20px" }}>
          로그인
        </Typography>
        <TextField
          label="이메일"
          id="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
                borderColor: theme.palette.common.grey,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
          }}
        />
        <TextField
          label="비밀번호"
          id="password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
                borderColor: theme.palette.common.grey,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "20px",
            padding: "10px",
            minHeight: "40px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            },
            fontWeight: theme.fontWeight.bold,
          }}
        >
          로그인하기
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LoginPage;
