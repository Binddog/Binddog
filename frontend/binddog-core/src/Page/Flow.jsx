import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
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
import RunButton from "./../Component/Buttons/RunButton";
import SaveButton from "../Component/Buttons/SaveButton";

const parsedBlocks = [];
const parsedLinks = [];

function Flow() {
  const theme = useTheme();
  const location = useLocation();
  const flowName = location.state?.flowName;
  console.log("Received flowName:", flowName);

  const [nodes, setNodes, onNodesChange] = useNodesState(parsedBlocks);
  const [edges, setEdges, onEdgesChange] = useEdgesState(parsedLinks);
  const [logBox, setLogBox] = useState([{title:'야호'}, {title:'안녕'}]);

  const addLog = (newItem) => {
    setLogBox((prevLog) => [...prevLog, newItem]);
  }

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

  console.log(logBox);

  return (
    <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          borderRight: "1px solid lightgrey",
        }}
      >
        <BlockList name={flowName} addNode={addNode} />
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
            display: "flex",
            // flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              borderRadius: "8px",
              padding: "10px 20px",
              width: "20%",
              height: "50px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <RunButton />
            <SaveButton />
          </Box>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          {logBox.length > 0 && (
            <Box
              sx={{
                position: "fixed",
                left: "33.5%",
                bottom: "5%",
                width: "60%",
                height: "200px",
                zIndex: 50,
                border: `${theme.palette.common.grey} solid 1px`,
                borderRadius: "10px",
                overflowX: "hidden",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.common.grey,
                  borderRadius: "10px",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: theme.palette.common.white,
                  opacity: "0.8",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {logBox.map((item) => (
                  <Typography
                    sx={[theme.api]}
                  >
                    {item.title}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </ReactFlow>
      </Box>
    </Box>
  );
}

export default Flow;
