import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from '@mui/material';

function TopNav() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '80px',
        bgcolor: theme.palette.primary.main,
        padding: '15px 10px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          color: theme.palette.text.primary,
          margin: '30px',
          display: 'flex',
          // justifyContent: 'flex-end',
          // alignItems: 'center',
          gap: 3,
        }}
      >
        <Link to={'/home'}>
          <Typography component="div" sx={theme.subtitle}>
            Home
          </Typography>
        </Link>
        <Link to={'/docs'}>
          <Typography component="div" sx={theme.subtitle}>
            Docs
          </Typography>
        </Link>
        <Link to={'/flowList'}>
          <Typography component="div" sx={theme.subtitle}>
            FlowList
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default TopNav;