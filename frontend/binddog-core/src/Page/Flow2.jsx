import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import BlockList2 from "../Component/BlockList2";
import Board2 from "../Component/Board2";
import blockData from "../block.json";
import Block2 from "../Component/Block2";
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

// console.log(parsedBlocks);

function Flow2() {
  const theme = useTheme();

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  // const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  const initialEdges = []

  // const [nodes, setNodes, onNodesChange] = useNodesState(parsedBlocks);
  // console.log(nodes)
  const [nodes, setNodes, onNodesChange] = useNodesState(
    parsedBlocks.map(block => ({
      ...block,
      data: {
        method: block.method,
        apiName: block.name,
        endpoint: block.endpoint,
        // 필요한 추가 데이터가 있다면 여기에 넣으세요
      },
    }))
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = (newNode) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      { id: `${Date.now()}`,...newNode }, // 고유한 ID를 추가
    ]);
  };

  // 노드 타입 정의
  const nodeTypes = {
    customBlock: Block2, // Block2를 customBlock 노드로 사용
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
    </div>

    // <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
    //   <Box sx={{ height: "100%", overflow: "auto" }}>
    //     <BlockList2 name={"APIs"} li={parsedBlocks} onAddNode={addNode} />
    //   </Box>
    //   <Box
    //     sx={{
    //       flexGrow: 0.96,
    //       height: "95%",
    //       padding: "10px",
    //     }}
    //   >
    //     <div style={{ width: "100%", height: "100%"}}>
    //       <ReactFlow
    //         nodes={nodes}
    //         edges={edges}
    //         onNodesChange={onNodesChange}
    //         onEdgesChange={onEdgesChange}
    //         onConnect={onConnect}
    //         nodeTypes={nodeTypes}
    //         style={{
    //           bgcolor: theme.palette.primary.main,

    //         }}
    //       >
    //         <Controls />
    //         <MiniMap />
    //         <Background variant="dots" gap={12} size={1} />
    //       </ReactFlow>
    //     </div>
    //     {/* <Board2 blocks={droppedBlocks} onDelete={handleDelete} /> */}
    //   </Box>
    // </Box>

  );
}
export default Flow2;
