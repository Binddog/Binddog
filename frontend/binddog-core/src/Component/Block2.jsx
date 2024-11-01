import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Handle, Position, NodeProps, Node } from '@xyflow/react';

export default function Block2({ data }) {
  const theme = useTheme();

  const { method, apiName, endpoint } = data;

  // 원래 위에 있었던 것
  // method, apiName, endpoint, id, num, position, data, onAddNode

  // const handleAddNode = () => {
  //   if (onAddNode) {
  //     console.log(`Adding node at position: ${position}`);
  //     onAddNode({
  //       // id: `${apiName}`,
  //       position: { x: 300, y: (position) * 70 },
  //       data: { label: `${data}` },
  //       // block_id: apiName,
  //       // endpoint,
  //     });
  //   }
  // };
  
  const handleStyle = { left: 10 };

  // console.log(`id : ${id}, method : ${method}, apiName : ${apiName}, num : ${num}, position : ${position}, data : ${data}`)

  return (
    <Card
      sx={{
        bgcolor: theme.palette.block[method],
        borderRadius: "8px",
        width: "220px",
        padding: "8px 8px 2px",
        cursor: "grab",
      }}
      // onClick={handleAddNode}
    >
      <Handle type="target" position={Position.Left} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            ...theme.method,
          }}
        >
          {method}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              padding: "8px 2px",
              borderRadius: "4px",
              width: "175px",
              mb: "2px",
              display: "flex",
              justifyContent: "center",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }}
          >
            <Typography
              sx={{
                ...theme.api,
              }}
            >
              {apiName}
            </Typography>
          </Box>
          <Typography
            sx={{
              ...theme.endpoint,
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              padding: "5px",
            }}
          >
            {endpoint}
          </Typography>
        </Box>
      </Box>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </Card>
  );
}
