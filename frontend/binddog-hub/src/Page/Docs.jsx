import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

function Docs() {
  const theme = useTheme();

  const documents = [
    { title: "1. 단계별 어쩌고", description: "1의 내용입니다람쥐" },
    { title: "2. 단계별 어쩌고", description: "2의 내용입니다람쥐" },
    { title: "3. 단계별 어쩌고", description: "3의 내용입니다람쥐" },
    { title: "4. 단계별 어쩌고", description: "4의 내용입니다람쥐" },
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
            현재 권장 버전은 1.0.5 입니다.
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
            <Typography sx={[theme.typography.sub, { color: theme.palette.common.grey, }]}>{doc.description}</Typography>
            <Divider/>
          </Box>
          ))}
      </Box>
    </Box>
  );
}

export default Docs;
