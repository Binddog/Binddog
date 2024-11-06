import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

function TopNav() {
  const theme = useTheme();

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToDocs = () => {
    navigate("/docs");
  };

  const goToFlowList = () => {
    navigate("/flowList");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        bgcolor: theme.palette.primary.main,
        padding: "15px 10px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          color: theme.palette.text.primary,
          margin: "30px",
          display: "flex",
          // justifyContent: 'flex-end',
          // alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography
          component="button"
          onClick={goToHome}
          sx={[
            theme.typography.h3,
            {
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            },
          ]}
        >
          Home
        </Typography>
        <Typography
          component="button"
          onClick={goToDocs}
          sx={[
            theme.typography.h3,
            {
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            },
          ]}
        >
          Docs
        </Typography>
        <Typography
          component="button"
          onClick={goToFlowList}
          sx={[
            theme.typography.h3,
            {
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            },
          ]}
        >
          FlowList
        </Typography>
      </Box>
    </Box>
  );
}

export default TopNav;
