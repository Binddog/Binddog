import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

function TopNav() {
  const theme = useTheme();
  const navigate = useNavigate();

  const buttons = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Docs", onClick: () => navigate("/docs") },
    { label: "SignUp", onClick: () => navigate("/signup") },
    { label: "Login", onClick: () => navigate("/login") },
    { label: "HubList", onClick: () => navigate("/hubList") },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
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
          gap: 3,
        }}
      >
        {buttons.map((button, index) => (
          <Typography
            key={index}
            component="button"
            onClick={button.onClick}
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
            {button.label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default TopNav;
