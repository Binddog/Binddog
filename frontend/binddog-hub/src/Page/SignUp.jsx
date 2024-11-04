import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

function Docs() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "30px",
      }}
    >
      <Typography sx={theme.typography.h2}>이건 회원가입 페이지</Typography>
    </Box>
  );
}

export default Docs;
