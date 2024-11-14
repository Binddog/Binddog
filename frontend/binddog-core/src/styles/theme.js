import createTheme from "@mui/material/styles/createTheme";
import "./font.css";

const theme = createTheme({
  fontSize: {
    small: "10px",
    medium: "16px",
    large: "18px",
    larger: "20px",
  },

  fontWeight: {
    medium: 500,
    bold: 700,
    heavy: 900,
  },
  typography: {
    fontFamily: "KOTRA_GOTHIC",
    fontSize: 16,
    fontWeight: 400,
    color: "#121212",
    h1: {
      fontFamily: "KOTRA_GOTHIC",
      fontSize: 48,
      fontWeight: 700,
      color: "#121212",
    },
    h2: {
      fontFamily: "KOTRA_GOTHIC",
      fontSize: 24,
      fontWeight: 700,
      color: "#121212",
    },
    h3: {
      fontFamily: "KOTRA_GOTHIC",
      fontSize: 20,
      fontWeight: 700,
      color: "#121212",
    },
    sub: {
      fontFamily: "KOTRA_GOTHIC",
      fontSize: 16,
      fontWeight: 700,
      color: "#121212",
    },
  },

  method: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "ChosunGu",
    color: "#FCFCFC",
  },
  api: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "ChosunGu",
    color: "#282828",
  },
  endpoint: {
    fontSize: 10,
    fontWeight: 400,
    fontFamily: "ChosunGu",
    color: "#FCFCFC",
  },
  button: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "ChosunGu",
    color: "#FCFCFC",
  },
  // 색상 관련 스타일 정의
  palette: {
    // 주 테마 색상 정의
    primary: {
      main: "#FBF6CF",
      dark: "#F2EDC0",
      light: "#FDFBE9",
    },
    block: {
      GET: "#005CB8",
      POST: "#008726",
      DELETE: "#C70000",
      PUT: "#E7872E",
    },
    button: {
      start: "#ACACAC",
      delete: "#C40000",
      run: "#187A23",
      add: "#6076C4",
    },
    // 텍스트 색상 정의
    text: {
      primary: "#121212",
      secondary: "#535353",
      disabled: "#797979",
    },
    // 구분선 색상 정의
    divider: "rgba(0, 0, 0, 0.12)",
    // 배경 색상 정의
    background: {
      default: "#FDFDFD",
      paper: "#f5f5f5",
    },
    // 작업 요소 색상 정의
    action: {
      active: "#3f51b5", // 활성화된 요소
      hover: "#f5f5f5", // 마우스 호버 시
      selected: "#e0e0e0", // 선택된 요소
      disabled: "#9e9e9e", // 비활성화된 요소
      disabledBackground: "#e0e0e0", // 비활성화된 요소의 배경색
    },
    // 공통 색상 정의
    common: {
      black: "#121212",
      white: "#FCFCFC",
      grey: "#797979",
      lightgrey: "#EBEBEB",
    },
  },
});

export default theme;
