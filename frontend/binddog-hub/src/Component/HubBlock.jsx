import { React, useState } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function HubBlock({ inId, flowName }) {
  const theme = useTheme();

  // 이미지 로딩을 확인하기 위한 상태
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "370px",
        height: "200px",
        borderRadius: "10px",
        border: "1px solid lightgray",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: "5px",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {!imageLoaded && (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imageLoaded ? "block" : "none",
          }}
          src="https://picsum.photos/500/233?random=1"
          alt=""
          // 이미지 로드 완료 시 상태 업데이트
          onLoad={() => setImageLoaded(true)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={theme.typography.sub}>이름: {flowName}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default HubBlock;
