import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Docs from "./Page/Docs";
import TopNav from "./Component/TopNav";
import FlowList from "./Page/FlowList";
import { Box } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100svh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      
      >
        {/* <h1>모든 것이 보여지는 바닥 레이어</h1> */}
        <TopNav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/flowList" element={<FlowList />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
