import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Docs from "./Page/Docs";
import SignupPage from "./Page/SignupPage";
import LoginPage from "./Page/LoginPage";
import TopNav from "./Component/TopNav";
import FlowList from './Page/FlowList';

function App() {
  return (
    <div className="App">
      {/* <h1>모든 것이 보여지는 바닥 레이어</h1> */}
      <TopNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/flowList" element={<FlowList />} />
      </Routes>
    </div>
  );
}

export default App;
