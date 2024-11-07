import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Avatar from "boring-avatars";

function TopNav({ userName = "UserNamema" }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLogin = true;

  const buttons = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Docs", onClick: () => navigate("/docs") },
    { label: "HubList", onClick: () => navigate("/hubList") },
  ];

  const authButtons = [
    { label: "Login", onClick: () => navigate("/login") },
    { label: "SignUp", onClick: () => navigate("/signup") },
  ];

  return (
    <Box
      sx={{
        height: "50px",
        bgcolor: theme.palette.primary.main,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          color: theme.palette.text.primary,
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isLogin ? (
          <>
            <Avatar
              size={40}
              name={userName}
              variant="beam"
              colors={["#FB6A4A", "#A1D99B", "#41B6C4", "#FDAE6B", "#C994C7"]}
            />
            <Typography sx={{ ...theme.typography.h3 }}>{userName}</Typography>
          </>
        ) : (
          authButtons.map((button, index) => (
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
          ))
        )}
      </Box>
    </Box>
  );
}

export default TopNav;
