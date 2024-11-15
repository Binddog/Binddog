// 유저 관련 api
import Axios from "./index";
import Cookies from "js-cookie";

// 회원가입
export const signUp = async (email, password) => {
  const response = await Axios.post("members/sign-up", { email, password });
  return response;
};

// 로그인
export const logIn = async (email, password) => {
  const response = await Axios.post("auths/login", { email, password });
  const { accessToken } = response.data.data;
  console.log("로그인 성공");
  localStorage.setItem("accessToken", accessToken);
  Cookies.set("refreshToken", response.data.data.refreshToken);
  return response.data;
};

// 로그아웃
export const logOut = async (auth) => {
  const response = await Axios.post("auths/logout", {
    params: { Authorization: auth },
  });
  return response.resultCode;
};

// 리프레시
export const refresh = async (accessToken, refreshToken) => {
  const response = await Axios.post("auths/refresh", {
    accessToken,
    refreshToken,
  });
  return response.data;
};
