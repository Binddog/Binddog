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
import { signUp } from "../api/user";

const SignUpPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const validateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRequirements.test(password)) {
      setPasswordError(
        "비밀번호는 최소 8자 이상이며 대소문자, 숫자 및 특수문자를 포함해야 합니다."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validatePasswordConfirm = () => {
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    setPasswordConfirmError("");
    return true;
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    if (value.length <= 16) {
      setPassword(value);
    }
  };

  const handlePasswordConfirmChange = (e) => {
    const { value } = e.target;
    if (value.length <= 16) {
      setPasswordConfirm(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmValid = validatePasswordConfirm();

    if (isEmailValid && isPasswordValid && isPasswordConfirmValid) {
      try {
        const response = await signUp(email, password);
        if (response.data.resultCode === "SUCCESS") {
          setSnackbarMessage("회원가입 성공");
          setSnackbarSeverity("success");
          console.log("회원가입 성공:", response.data);
          setSnackbarOpen(true);

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setSnackbarMessage("회원가입 실패: 서버 에러가 발생했습니다.");
          setSnackbarSeverity("error");
          console.log("회원가입 실패:", response.data);
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarMessage("회원가입 실패: 서버와의 통신에 문제가 있습니다.");
        setSnackbarSeverity("error");
        console.error("회원가입 실패:", error);
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("회원가입 실패: 입력 정보를 확인해주세요.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ ...theme.typography.h2, padding: "20px" }}>
          회원가입
        </Typography>
        <TextField
          label="이메일"
          id="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.dark,
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
            "& .MuiFormHelperText-root": {
              fontSize: theme.fontSize.small,
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
          onChange={handlePasswordChange}
          onBlur={validatePassword}
          error={Boolean(passwordError)}
          helperText={passwordError}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.dark,
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
            "& .MuiFormHelperText-root": {
              fontSize: theme.fontSize.small,
            },
          }}
        />
        <TextField
          label="비밀번호 확인"
          id="passwordConfirm"
          type="password"
          variant="outlined"
          fullWidth
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          onBlur={validatePasswordConfirm}
          error={Boolean(passwordConfirmError)}
          helperText={passwordConfirmError}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.dark,
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
            "& .MuiFormHelperText-root": {
              fontSize: theme.fontSize.small,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
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
          회원가입하기
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpPage;
