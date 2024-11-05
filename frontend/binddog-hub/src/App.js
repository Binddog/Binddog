import "./App.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Docs from "./Page/Docs";
import TopNav from "./Component/TopNav";
import HubList from "./Page/HubList";
import Login from "./Page/Login";
import SignUp from "./Page/SignUp";
import Loading from "./Component/Loading"; // Loading 컴포넌트 임포트
import { Box } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 예시로 2초 후에 로딩이 완료되는 효과
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트 렌더링
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
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
