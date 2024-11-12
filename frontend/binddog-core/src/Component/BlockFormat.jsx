import {React, useState} from "react";
import { Card, Typography, Box, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Handle, Position } from "@xyflow/react";
import ConnectionBox from './ConnectionBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// ReactFlow 안에 생기는 블록 커스텀 포맷
export default function BlockFormat({ data }) {
  const theme = useTheme();

  

  const [toggleParams, setToggleParams] = useState(false);

  const clickToggle = () => {
    setToggleParams(!toggleParams);
  }

  const handleStyle1 = toggleParams ? { top: 45, left: 57 } : {};
  const handleStyle2 = toggleParams ? { top: 45, right: 57 } : {};

  // JSON 데이터에서 전달받은 추가적인 속성을 구조 분해 할당
  const {
    method,
    apiName,
    endpoint,
    header,
    parameter,
    pathVariable,
    response,
  } = data;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Card
        sx={{
          bgcolor: theme.palette.block[method],
          borderRadius: "8px",
          width: "240px",
          padding: "8px 10px 2px",
          cursor: "grab",
          boxShadow: "-4px 4px 2px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Handle type="target" position={Position.Left} style={handleStyle1} />
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
              width: "110px",
              textAlign: "center"
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
              <Typography sx={theme.api}>{apiName}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography
                sx={{
                ...theme.endpoint, padding: "5px",
                overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap", maxWidth: "150px",
                }}
              >
                {endpoint}
              </Typography>
              <IconButton sx={{color: theme.palette.common.white, scale: "70%", }} onClick={clickToggle}>
                <AddCircleOutlineIcon/>
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* 추가 속성 렌더링 */}
        <Box>
          {header && (
            <Typography sx={theme.api}>
              Header: {JSON.stringify(header)}
            </Typography>
          )}
          {parameter && (
            <Typography sx={theme.api}>
              Parameter: {JSON.stringify(parameter)}
            </Typography>
          )}
          {pathVariable && (
            <Typography sx={theme.api}>
              Path Variable: {JSON.stringify(pathVariable)}
            </Typography>
          )}
          {response && (
            <Typography sx={theme.api}>
              Response: {JSON.stringify(response)}
            </Typography>
          )}
        </Box>

        <Handle type="source" position={Position.Right} style={handleStyle2} id="a" />
      </Card>

      {toggleParams && <ConnectionBox />}
      
    </Box>
  );
}
