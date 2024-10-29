import * as React from "react";
import { Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Block({ method, apiName }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: theme.palette.block[method],
        padding: "8px 10px",
        borderRadius: "8px",
        width: "200px",
        height: "auto",
      }}
    >
      <Typography
        sx={{
          ...theme.typography.method,
          color: theme.palette.common.white,
          marginRight: "12px",
          width: "50px",
          textAlign: "center",
        }}
      >
        {method}
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
        <Typography sx={theme.typography.api}>{apiName}</Typography>
      </Box>
    </Card>
  );
}
