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
import { getFlow } from "../api/libraryFlow";
import Divider from "@mui/material/Divider";

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
  const flowDescription = "description";
  const { projectId, flowId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState(parsedBlocks);
  const [edges, setEdges, onEdgesChange] = useEdgesState(parsedLinks);
  const [logBox, setLogBox] = useState([]);

  // pathValue 수정하는 로직
  const updateNodeData = (inputKey, value, targetid) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        // 해당 node의 apiName이 targetApiName과 일치하는지 확인
        if (node.id === targetid) {
          const updatedPathValue = new Map(node.data.pathValue);
          // 기존의 pathValue가 inputKey를 포함하면 값만 수정, 포함하지 않으면 새로 추가
          updatedPathValue.set(inputKey, value);

          return {
            ...node,
            data: {
              ...node.data,
              pathValue: updatedPathValue,
            },
          };
        }
        // apiName이 일치하지 않으면 기존 node를 그대로 반환
        return node;
      })
    );
  };

  // paramValue 수정하는 로직
  const updateParamsData = (inputKey, value, targetid) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        // 해당 node의 apiName이 targetApiName과 일치하는지 확인
        if (node.id === targetid) {
          const updatedParamsValue = new Map(node.data.paramValue);
          // 기존의 paramValue가 inputKey를 포함하면 값만 수정, 포함하지 않으면 새로 추가
          updatedParamsValue.set(inputKey, value);

          return {
            ...node,
            data: {
              ...node.data,
              paramValue: updatedParamsValue,
            },
          };
        }
        // apiName이 일치하지 않으면 기존 node를 그대로 반환
        return node;
      })
    );
  };

  // headerValue 수정하는 로직
  const updateHeadersData = (key, value, targetid) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === targetid) {
          const updatedHeadersValue = new Map(node.data.headerValue);
          updatedHeadersValue.set(key, value);

          return {
            ...node,
            data: {
              ...node.data,
              headerValue: updatedHeadersValue,
            },
          };
        }
        return node;
      })
    );
  };

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
        header: block.header ? new Map(Object.entries(block.header)) : new Map(), // Object -> Map 변환
        parameter: block.parameter ? new Map(Object.entries(block.parameter)) : new Map(), // Object -> Map 변환
        pathVariable: block.pathVariable ? new Map(Object.entries(block.pathVariable)) : new Map(), // Object -> Map 변환
        request: block.request ? new Map(Object.entries(block.request)) : new Map(), // Object -> Map 변환
        response: block.response ? new Map(Object.entries(block.response)) : new Map(), // Object -> Map 변환
        pathValue: block.pathValue ? new Map(Object.entries(block.pathValue)) : new Map(),
        paramValue: block.paramValue ? new Map(Object.entries(block.paramValue)) : new Map(),
        headerValue: block.headerValue ? new Map(Object.entries(block.headerValue)) : new Map(),
        updateNodeData,
        updateParamsData,
        updateHeadersData,
      },
    }));

  const convertToEdges = (links) =>
    links.map((link) => ({
      id: `edge-${link.fromBlockId}-${link.toBlockId}`, // Unique edge ID
      source: `${link.fromBlockId}`, // Source node ID
      target: `${link.toBlockId}`, // Target node ID
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

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  function addNode(item) {
    const newNode = {
      id: `${Date.now()}`,
      type: "customBlock",
      position: { x: 50, y: nodes.length * 70 },
      data: {
        method: item.method,
        apiName: item.apiName,
        endpoint: item.endpoint,
        header: item.header,
        parameter: item.parameter,
        pathVariable: item.pathVariable,
        pathValue: item.pathValue, // pathVariable 입력한 값들이 들어갈 예정
        request: item.request,
        response: item.response,
        paramValue: item.paramValue,
        headerValue: item.headerValue,
        updateNodeData,
        updateParamsData,
        updateHeadersData,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }

  const handleNodesChange = useCallback(
    (changes) => {
      // StartSign 노드의 삭제와 위치 변경 요청을 제외하고 처리
      const filteredChanges = changes.filter((change) => {
        // StartSign 노드의 삭제 및 위치 변경 무시
        if (change.id === "0" && (change.type === "remove" || change.type === "position")) {
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

  useEffect(() => {
    const fetchFlowData = async () => {
      try {
        const response = await getFlow(projectId, flowId);
        const flowData = response.data; // Assuming `flowData` is under `data`
        const newNodes = convertToNodes(flowData.blocks || []);
        const newEdges = convertToEdges(flowData.links || []);
        reloadNode(newNodes, newEdges);
      } catch (error) {
        console.error("Error fetching flow data:", error);
      }
    };

    fetchFlowData();
  }, [projectId, flowId]);

  console.log(nodes);

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
          defaultEdgeOptions={{ type: "smoothstep" }}
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
            <RunButton nodes={nodes} edges={edges} addLog={addLog} restartLog={restartLog} />
            <SaveButton
              projectId={projectId}
              flowId={flowId}
              title={flowName}
              description={flowDescription}
              nodes={nodes}
              edges={edges}
            />
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
                  bgcolor: theme.palette.common.white,
                  opacity: "0.8",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {logBox.map((item, index) => (
                  <Box>
                    <Box
                      sx={{
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography key={index} sx={[theme.api]}>
                        {JSON.stringify(item)}
                      </Typography>
                    </Box>
                    <Box>
                      <Divider
                        sx={{
                          borderBottomWidth: 2,
                          bgcolor: theme.palette.common.lightgrey,
                        }}
                      />
                    </Box>
                  </Box>
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
