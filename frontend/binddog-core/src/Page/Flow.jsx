import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import blockData from "../block.json";
import BlockFormat from "../Component/BlockFormat";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from "@mui/material/styles";
import BlockList from "../Component/BlockList";

function parsePaths(paths) {
  const blocks = [];
  let inCounter = 1;

  Object.keys(paths).forEach((endpoint) => {
    const methods = paths[endpoint];

    Object.keys(methods).forEach((method) => {
      const { summary, description, operationId, tags } = methods[method];

      blocks.push({
        id: `${inCounter}`,
        position: { x: 50, y: (inCounter) * 70 },
        data: { label: `${operationId}` },
        block_id: operationId,
        method: method.toUpperCase(),
        endpoint,
        name: summary,
        description,
        tags,
        type: "customBlock",
        
      });

      inCounter++;
    });
  });

  return blocks;
}

const parsedBlocks = parsePaths(blockData.paths);

function Flow() {
  const theme = useTheme();
  const initialEdges = []

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  function addNode(item) {
    const newNode = {
      id: `${Date.now()}`, // 새로운 id 값 생성
      type: "customBlock", // customBlock 타입 지정
      position: { x: 50, y: nodes.length * 70 }, // 노드의 위치 지정
      data: {
        method: item.method,
        apiName: item.apiName,
        endpoint: item.endpoint,
      },
    };

    // 새로운 노드를 기존 nodes 상태에 추가
    setNodes((nds) => [...nds, newNode]);
    console.log("Node 추가:", newNode);
  };

  // 노드 타입 정의
  const nodeTypes = {
    customBlock: BlockFormat, // BlockFormat을 customBlock 노드로 사용
  };

  return (
    <Box sx={{ display:'flex', height: "100%", overflow: "hidden"}}>
      <Box sx={{ height: "100%", overflow: "auto" }}>
        <BlockList  name={"APIs"} li={parsedBlocks} addNode={addNode} />
      </Box>
      <Box
        sx={{
          flexGrow: 0.96,
          height: "95%",
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
