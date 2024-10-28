import React from "react";
import { useLocation } from "react-router-dom";

const SignupPage = () => {
  const location = useLocation();

  return (
    <div>
      <h1>회원가입</h1>
    </div>
  );
};

export default SignupPage;
