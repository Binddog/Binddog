import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { getProject } from "../api/hubProject";

function Home() {
  const theme = useTheme();

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
