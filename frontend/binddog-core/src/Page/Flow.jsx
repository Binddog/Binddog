import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import BlockFormat from "../Component/BlockFormat";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "@mui/material/styles";
import BlockList from "../Component/BlockList";

function parseBlocks(blocks) {
  return blocks.map((block, index) => ({
    id: block.blockId.toString(),
    position: { x: 50, y: index * 70 },
    data: {
      label: block.name,
      method: block.method,
      endpoint: block.endpoint,
      description: block.description,
      tags: block.tags,
    },
    type: "customBlock",
  }));
}

const parsedBlocks = [];
const parsedLinks = [];

function Flow() {
  const theme = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState(parsedBlocks);
  const [edges, setEdges, onEdgesChange] = useEdgesState(parsedLinks);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function addNode(item) {
    const newNode = {
      id: `${Date.now()}`,
      type: "customBlock",
      position: { x: 50, y: nodes.length * 70 },
      data: {
        method: item.method,
        apiName: item.apiName,
        endpoint: item.endpoint,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }

  const nodeTypes = {
    customBlock: BlockFormat,
  };

  return (
    <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Box sx={{ height: "100%", overflow: "auto" }}>
        <BlockList addNode={addNode} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          padding: "10px",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          style={{
            bgcolor: theme.palette.primary.main,
          }}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </Box>
    </Box>
  );
}

export default Flow;
