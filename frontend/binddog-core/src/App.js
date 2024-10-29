import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme"; // 경로 확인
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Docs from "./Page/Docs";
import TopNav from "./Component/TopNav";
import FlowList from './Page/FlowList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <h1>모든 것이 보여지는 바닥 레이어</h1> */}
        <TopNav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
