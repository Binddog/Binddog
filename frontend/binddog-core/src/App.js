import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Projects from "./Page/Projects";
import FlowList from "./Page/FlowList";
import Flow from "./Page/Flow";
import TopNav from "./Component/TopNav";
import Loading from "./Component/Loading";
import PrivateRoute from "./PrivateRoute";
import { Box, Snackbar, Alert } from "@mui/material";
import { refresh } from "../src/api/user";
import Cookies from "js-cookie";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");
    if (token && storedEmail) {
      setIsLogin(true);
      setEmail(storedEmail);
    } else {
      setIsLogin(false);
      setEmail("");
    }

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 세션 확인 로직
  useEffect(() => {
    const checkSession = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (accessToken && refreshToken) {
        try {
          await refresh();
        } catch (error) {
          console.error("Session expired. Logging out...");
          handleLogout();
        }
      }
    };

    const interval = setInterval(checkSession, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (userEmail) => {
    setEmail(userEmail);
    setIsLogin(true);
    localStorage.setItem("email", userEmail);
  };

  const handleLogout = () => {
    setEmail("");
    setIsLogin(false);
    localStorage.clear();
    Cookies.remove("refreshToken");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  if (loading) return <Loading />;

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
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/projects"
            element={
              <PrivateRoute isLogin={isLogin}>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <PrivateRoute isLogin={isLogin}>
                <FlowList />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/flows/:flowId"
            element={
              <PrivateRoute isLogin={isLogin}>
                <Flow />
              </PrivateRoute>
            }
          />
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
