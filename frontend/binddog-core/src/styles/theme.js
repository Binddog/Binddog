import createTheme from "@mui/material/styles/createTheme";

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

  // 색상 관련 스타일 정의
  palette: {
    // 주 테마 색상 정의
    primary: {
      main: "#FBF6CF",
      dark: "#F2EDC0",
      light: "#FDFBE9",
    },
    block: {
      get: "#253567",
      post: "",
      delete: "",
      put: "",
    },

    // 텍스트 색상 정의
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    // 구분선 색상 정의
    divider: "rgba(0, 0, 0, 0.12)",
    // 배경 색상 정의
    background: {
      default: "#ffffff",
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
      black: "#000000",
      white: "#ffffff",
      grey: "#797979",
    },
  },
});

export default theme;
