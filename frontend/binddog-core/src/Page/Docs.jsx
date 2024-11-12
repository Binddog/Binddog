import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

function Docs() {
  const theme = useTheme();

  const documents = [
    {
      title: "0. 라이브러리란?",
      description: `여러분들의 프로젝트별 플로우를 생성&저장할 수 있는 공간입니다.
      라이브러리에서 자유롭게 만든 여러분들의 플로우는 허브에서 확인할 수 있습니다!`
    },
    {
      title: "사용법 - 1. 프로젝트를 생성합니다.",
      description: `여러분들의 API를 테스트할 프로젝트를 생성합니다.`
    },
    {
      title: "사용법 - 2. 플로우를 생성합니다.",
      description: `생성한 프로젝트 내부에 플로우를 생성합니다.
      한 프로젝트에서 여러 플로우를 생성할 수 있으며, 각각의 플로우는 원하는대로 배치하고, 저장이 가능합니다!`
    },
    {
      title: "사용법 - 3. 블록을 배치하고, 연결합니다.",
      description: `여러분의 API 블록들을 원하는대로 배치하세요!
      배치하고, 선으로 연결한 후 "Run" 버튼을 누르면 통합적인 API 테스트가 가능합니다!`
    },
    {
      title: "사용법 - 4. 플로우를 저장합니다.",
      description: `테스트한 플로우를 저장합니다.
      여러분은 언제든지 저장한 플로우를 불러올 수 있고, 수정하여 다른 테스트를 진행할 수도 있습니다.`
    },
  ]

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: 2,

      }}
    >
      <Typography sx={[theme.typography.h1, { textAlign: "center", color: theme.palette.common.grey }]}>매뉴얼</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography component={Box}
          sx={[theme.typography.sub,
            {
              width: "300px",
              height: "20px",
              padding: "10px",
              textAlign: "center",
              borderRadius: "40px",
              bgcolor: theme.palette.primary.dark,
            }]}
        >
            현재 권장 버전은 1.0.0(Beta) 입니다.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {documents.map((doc, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "30px",
              gap: 3,
            }}
            key={index}
          >
            <Typography sx={theme.typography.h2}>{doc.title}</Typography>
            <Typography sx={[theme.typography.sub, { color: theme.palette.common.grey, whiteSpace: "pre-line", }]}>{doc.description}</Typography>
            <Divider/>
          </Box>
          ))}
      </Box>
    </Box>
  );
}

export default Docs;
