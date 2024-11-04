import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Docs from "./Page/Docs";
import TopNav from "./Component/TopNav";
import HubList from "./Page/HubList";
import Login from "./Page/Login";
import SignUp from "./Page/SignUp";
import { Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100%",
          // textAlign: "center",
          display: "flex",
          flexDirection: "column",
          overhubX: "hidden",
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
