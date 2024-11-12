import axios from "axios";

const docsAxios = axios.create({
  //TODO: 8082 -> window.location.port 로 수정
  baseURL: `${window.location.protocol}//${window.location.hostname}:8082`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default docsAxios;
