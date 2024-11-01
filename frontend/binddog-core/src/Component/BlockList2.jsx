import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Block2 from "./Block2";
import blocks from "../block.json";

function BlockList2({ li = blocks, name, onAddNode }) {
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
        overflow: "auto",
      }}
    >
      <Typography
        sx={{
          ...theme.typography.h3,
          marginBottom: "20px",
        }}
      >
        {name}
      </Typography>
      {li.map((item, index) => (
        <Block2
          key={item.block_id}
          id={item.block_id}
          method={item.method}
          apiName={item.name}
          endpoint={item.endpoint}
          num={index + 1}
          position={(index + 1) * 70}
          data={item.block_id}
          onAddNode={onAddNode}
        />
      ))}
    </Box>
  );
}

export default BlockList2;
