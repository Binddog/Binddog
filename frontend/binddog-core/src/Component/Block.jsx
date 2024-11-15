import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Block({
  method,
  apiName,
  endpoint,
  id,
  addNode,
  pathVariable,
  parameter,
  request,
  response,
}) {
  const theme = useTheme();
  const handleClick = () => {
    addNode({
      apiName,
      method,
      endpoint,
      pathVariable,
      parameter,
      request,
      response,
    });
  };

  return (
    <Card
      sx={{
        bgcolor: theme.palette.block[method],
        borderRadius: "8px",
        width: "240px",
        padding: "8px 8px 2px",
        cursor: "grab",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          sx={{ ...theme.method, width: "110px", textAlign: "center" }}
        >
          {method}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              padding: "8px 2px",
              borderRadius: "4px",
              width: "175px",
              mb: "2px",
              display: "flex",
              justifyContent: "center",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }}
          >
            <Typography sx={{ ...theme.api }}>{apiName}</Typography>
          </Box>
          <Typography
            sx={{
              ...theme.endpoint,
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              padding: "5px",
            }}
          >
            {endpoint}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
