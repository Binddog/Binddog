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
import { Box } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/hubList" element={<HubList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/hubList/:id" element={<HubFlowList />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
