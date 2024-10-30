import React from "react";
import { Box } from "@mui/material";
import BlockList from "../Component/BlockList";
import Board from "../Component/Board";
import blockData from "../block.json";

function parsePaths(paths) {
  const blocks = [];

  Object.keys(paths).forEach((endpoint) => {
    const methods = paths[endpoint];

    Object.keys(methods).forEach((method) => {
      const { summary, description, operationId, tags } = methods[method];

      blocks.push({
        block_id: operationId,
        method: method.toUpperCase(),
        endpoint,
        name: summary,
        description,
        tags,
      });
    });
  });

  return blocks;
}

const parsedBlocks = parsePaths(blockData.paths);

function Flow() {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      <BlockList name={"APIs"} li={parsedBlocks} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "16px",
        }}
      >
        <Board />
      </Box>
    </Box>
  );
}

export default Flow;
