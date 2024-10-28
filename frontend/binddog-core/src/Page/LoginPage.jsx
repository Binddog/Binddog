import React from "react";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();

  return (
    <div>
      <h1>로그인</h1>
    </div>
  );
};

export default LoginPage;
