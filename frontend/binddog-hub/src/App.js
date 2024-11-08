import "./App.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Docs from "./Page/Docs";
import TopNav from "./Component/TopNav";
import HubList from "./Page/HubList";
import HubFlowList from './Page/HubFlowList';
import Login from "./Page/Login";
import SignUp from "./Page/SignUp";
import Loading from "./Component/Loading";
import { Box, Snackbar, Alert } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userEmail) => {
    setEmail(userEmail);
    setIsLogin(true);
  };

  const handleLogout = () => {
    setEmail("");
    setIsLogin(false);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <TopNav isLogin={isLogin} handleLogout={handleLogout} email={email} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/hubList" element={<HubList />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/hubList/:id" element={<HubFlowList />} />
        </Routes>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="info"
            sx={{
              bgcolor: theme.palette.primary.dark,
              color: "black",
              fontWeight: "bold",
            }}
          >
            로그아웃 되었습니다.
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
