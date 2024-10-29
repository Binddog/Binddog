import { Box } from '@mui/material';
import React from 'react';
import { useTheme } from "@mui/material/styles";

function SideNav({li}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '300px',
        height: '100%',
        bgcolor: theme.palette.primary.dark,
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        alignItems: 'flex-start',
      }}
    >
      <Box>
        <p>나중에 햄버거 버튼 들어갈 곳(안들어가도 되긴함)</p>
      </Box>
      <Box>
        <h2>유저의 라이브러리</h2>
      </Box>
      <Box
        sx={{
          color: theme.palette.text.secondary,
          fontSize: theme.fontSize.large,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {li.map((item, index) => (
          <li>{item}</li>
        ))}
      </Box>
    </Box>
  );
};

export default SideNav;