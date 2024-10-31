import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

function Board() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        borderRadius: "10px",
      }}
      bgcolor={theme.palette.background.paper}
    >
      <Typography sx={theme.title}>보드</Typography>
    </Box>
  );
}

export default Board;
