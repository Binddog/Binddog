import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import { Box } from '@mui/material';

function TopNav() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '80px',
        bgcolor: theme.palette.primary.main,
        padding: '15px 0px',
        fontSize: '30px',
      }}
    >
      <Box
        sx={{
          color: theme.palette.text.primary,
          margin: '8px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 3,
        }}
      >
        <Link to={'/home'}>Home</Link>
        <Link to={'/docs'}>Docs</Link>
        <Link to={'/flowList'}>FlowList</Link>
      </Box>
    </Box>
  );
};

export default TopNav;