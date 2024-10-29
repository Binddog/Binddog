import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNav from '../Component/SideNav';
import { Box, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";

function FlowList() {
  const theme = useTheme();

  const li = ['제목1', '제목2', '제목3']

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
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
          padding: '30px'
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography sx={theme.title}>
            플로우 확인 페이지(플로우 리스트)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FlowList;