import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button, Popover } from "@mui/material";
import Avatar from "boring-avatars";

function TopNav({ isLogin, handleLogout, email }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const buttons = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Docs", onClick: () => navigate("/docs") },
    { label: "Projects", onClick: () => navigate("/projects") },
  ];

  const authButtons = [
    { label: "Login", onClick: () => navigate("/login") },
    { label: "SignUp", onClick: () => navigate("/signUp") },
  ];

  const userName = email && email.includes("@") ? email.split("@")[0] : "User";

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

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
            <Button
              aria-describedby={id}
              onClick={handlePopoverOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                color: theme.palette.text.primary,
                background: "transparent",
                "&:hover": { background: "transparent" },
              }}
            >
              <Avatar
                size={40}
                name={userName}
                variant="beam"
                colors={["#FB6A4A", "#A1D99B", "#41B6C4", "#FDAE6B", "#C994C7"]}
              />
              <Typography sx={{ ...theme.typography.h3, marginLeft: "8px" }}>
                {userName}
              </Typography>
            </Button>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Button
                onClick={() => {
                  handleLogout();
                  handlePopoverClose();
                }}
                sx={{
                  ...theme.typography,
                  fontSize: theme.fontSize.medium,
                  padding: "10px 20px",
                  color: theme.palette.text.primary,
                }}
              >
                Logout
              </Button>
            </Popover>
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
