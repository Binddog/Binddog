import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNav from '../Component/SideNav';
import { Box, Card } from '@mui/material';
import { useTheme } from "@mui/material/styles";

function FlowList() {
  const theme = useTheme();

  const li = ['제목1', '제목2', '제목3']

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        // bgcolor: 'skyblue',
      }}
    >
      <SideNav
        li={li}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100%',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <h1>플로우 확인 페이지(플로우 리스트)</h1>
          {/* <p>영역 확인용으로 색 채워둠... 나중에 지울 예정</p> */}
        </Box>
        <Card></Card>
      </Box>
    </Box>
  );
};

export default FlowList;