import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
}

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(Axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const accessToken = localStorage.getItem("accessToken");

        const { data } = await Axios.post("/auths/refresh", {
          accessToken,
          refreshToken,
        });

        // 토큰 저장
        localStorage.setItem("accessToken", data.data.accessToken);
        Cookies.set("refreshToken", data.data.refreshToken);

        // 헤더 업데이트
        Axios.defaults.headers.Authorization = `Bearer ${data.data.accessToken}`;
        onRefreshed(data.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

        return Axios(originalRequest);
      } catch (err) {
        console.warn("로그인이 만료되었습니다. 다시 로그인해주세요.");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
