import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { getProject } from "../api/hubProject";

function Home() {
  const theme = useTheme();

  // 요청이 잘 오는지 확인을 해보기 위해 적어놓음(추후 삭제 예정)
  getProject().then(response => {
    console.log(response);
  });

  return (
    <Box
      sx={{
        padding: "30px",
      }}
    >
      <Typography sx={theme.typography.h1}>이건 메인 페이지</Typography>
    </Box>
  );
}

export default Home;
