import * as React from "react";
import { Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Block({ width = "200px", height = "auto" }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: theme.palette.block.get,
        padding: "8px 10px",
        borderRadius: "8px",
        width: width,
        height: height,
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          marginRight: "8px",
          color: theme.palette.common.white,
        }}
      >
        METHOD
      </Typography>
      <Box
        sx={{
          bgcolor: "white",
          color: "black",
          borderRadius: "4px",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography>회원가입회원가입회원</Typography>
      </Box>
    </Card>
  );
}
