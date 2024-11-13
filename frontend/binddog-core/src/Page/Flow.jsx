import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import StartSign from "../Component/Buttons/StartSign";
import { getFlow } from "../api/libraryFlow"; // getFlow 함수 import

const parsedBlocks = [
  {
    id: "0",
    type: "startSign",
    position: { x: 50, y: 50 },
    data: {},
  },
];
const parsedLinks = [];

function Flow() {
  const theme = useTheme();
  const location = useLocation();
  const flowName = location.state?.flowName;
  const { projectId, flowId } = useParams();
  console.log("Received flowName:", flowName);

  const [nodes, setNodes, onNodesChange] = useNodesState(parsedBlocks);
  const [edges, setEdges, onEdgesChange] = useEdgesState(parsedLinks);
  const [logBox, setLogBox] = useState([]);

  // Convert flowData to ReactFlow nodes and edges
  const convertToNodes = (blocks) =>
    blocks.map((block) => ({
      id: `${block.blockId}`, // ReactFlow requires string IDs
      type: "customBlock",
      position: {
        x: block.position.x,
        y: block.position.y,
      },
      data: {
        method: block.method,
        endpoint: block.endpoint,
        apiName: block.name,
      },
    }));

  const convertToEdges = (links) =>
    links.map((link) => ({
      id: `edge-${link.fromBlockId}-${link.toBlockId}`, // Unique edge ID
      source: `${link.fromBlockId}`, // Source node ID
      target: `${link.toBlockId}`, // Target node ID
      type: "smoothstep", // Optional edge type
    }));

  const reloadNode = (newNodes, newEdges) => {
    setNodes((prevNodes) => [...prevNodes, ...newNodes]); // 기존 노드 뒤에 새 노드 추가
    setEdges((prevEdges) => [...prevEdges, ...newEdges]); // 기존 엣지 뒤에 새 엣지 추가
  };

  const addLog = (newItem) => {
    setLogBox((prevLog) => [...prevLog, newItem]);
  };

  const restartLog = () => {
    setLogBox([]);
  };

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

  const handleNodesChange = useCallback(
    (changes) => {
      // StartSign 노드의 삭제와 위치 변경 요청을 제외하고 처리
      const filteredChanges = changes.filter((change) => {
        // StartSign 노드의 삭제 및 위치 변경 무시
        if (
          change.id === "0" &&
          (change.type === "remove" || change.type === "position")
        ) {
          return false;
        }
        return true;
      });

      // 필터링된 changes만 기존 onNodesChange에 전달
      onNodesChange(filteredChanges);
    },
    [onNodesChange]
  );

  const nodeTypes = {
    customBlock: BlockFormat,
    startSign: StartSign,
  };

  console.log(nodes);

  useEffect(() => {
    const fetchFlowData = async () => {
      try {
        const response = await getFlow(projectId, flowId);
        const flowData = response.data; // Assuming `flowData` is under `data`
        const newNodes = convertToNodes(flowData.blocks);
        const newEdges = convertToEdges(flowData.links);
        reloadNode(newNodes, newEdges);
      } catch (error) {
        console.error("Error fetching flow data:", error);
        // 에러 발생 시에도 start-sign 노드 추가
      }
    };

    fetchFlowData();
  }, [projectId, flowId]);

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
          onNodesChange={handleNodesChange}
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
            <SaveButton projectId={projectId} flowId={flowId} />
          </Box>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          {logBox.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                left: "16%",
                bottom: "5%",
                width: "70%",
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
                  <Typography sx={[theme.api]}>{item.title}</Typography>
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
