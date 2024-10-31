import * as React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function FlowBlock({ flowName }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "370px",
        height: "200px",
        borderRadius: "10px",
        border: "1px solid lightgray",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: "5px",
          overflow: "hidden",
          flex: 1,
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="https://picsum.photos/500/233?random=1"
          alt=""
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography sx={theme.typography.sub}>이름: {flowName}</Typography>
      </Box>
    </Box>
  );
}

export default FlowBlock;
