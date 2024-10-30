import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Block from "./Block";
import blocks from "../block.json";

function BlockList({ li = blocks, name }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "250px",
        bgcolor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "column",
        padding: "50px",
        alignItems: "flex-start",
        gap: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          ...theme.typography,
          color: theme.palette.text.primary,
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {name}
      </Typography>
      {li.map((item) => (
        <Block
          key={item.block_id}
          method={item.method}
          apiName={item.name}
          endpoint={item.endpoint}
        />
      ))}
    </Box>
  );
}

export default BlockList;
