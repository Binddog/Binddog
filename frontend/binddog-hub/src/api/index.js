import axios from 'axios';
// import Cookies from 'js-cookie';
// import { enqueueSnackbar } from 'notistack';
import { API_URL } from '../config';  // config.js 파일에서 API_URL을 가져옵니다.

// Axios 인스턴스 생성 및 설정
const Axios = axios.create({
  baseURL: API_URL,  // API URL 설정
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

// // 토큰 갱신 관리 상태 변수
// let isRefreshing = false;
// let refreshSubscribers = [];

// // 토큰 갱신 후 대기 중이던 요청에 새로운 토큰 적용
// function onRefreshed(token) {
//   refreshSubscribers.forEach((callback) => callback(token));
//   refreshSubscribers = [];
// }

// // Axios 요청 인터셉터
// Axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Axios 응답 인터셉터
// Axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 Unauthorized 오류 시 토큰 갱신 처리
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           refreshSubscribers.push((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(Axios(originalRequest));
//           });
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = Cookies.get('refreshToken');
//         const accessToken = localStorage.getItem('accessToken');

//         const { data } = await axios.post(
//           `${API_URL}/auths/refresh`,  // API URL 사용
//           { accessToken, refreshToken },
//         );

//         localStorage.setItem('accessToken', data.data.accessToken);
//         Cookies.set('refreshToken', data.data.refreshToken);

//         Axios.defaults.headers.Authorization = `Bearer ${data.data.accessToken}`;

//         onRefreshed(data.data.accessToken);

//         originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

//         return Axios(originalRequest);
//       } catch {
//         enqueueSnackbar('로그인이 만료되었습니다. 다시 로그인해주세요.', {
//           variant: 'info',
//         });
//         localStorage.clear();
//         Cookies.remove('refreshToken');
//         setTimeout(() => {
//           window.location.href = '/';
//         }, 500);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default Axios;
