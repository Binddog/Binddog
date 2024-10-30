import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNav from '../Component/SideNav';
import { Box, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Block from './../Component/Block';
import FlowBlock from '../Component/FlowBlock';

function FlowList() {
  const theme = useTheme();

  const li = ['제목1', '제목2', '제목3'];

  const liNum = li.length;

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
      }}
    >
      <SideNav
        li={li}
        sx={{
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          // height: '100%',
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

          <Box
            sx={{
              // display: 'flex',
              // flexFlow: 'wrap',
              display: 'grid',
              justifyItems: 'center',
              gridTemplateColumns: 'repeat(2, 4fr)',
              gap: 5,
              padding: '50px 150px',
            }}
          >
            {li.map((item, index) => (
              <FlowBlock
                name={item}
                sx={{
                  width: '100%',
                }}
              />
            ))}

          </Box>

          {/* <Block method="GET" apiName="GET" />
          <Block method="POST" apiName="POST" />
          <Block method="DELETE" apiName="DELETE" />
          <Block method="PUT" apiName="PUT" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default FlowList;