import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function SideNav({ li, projectId }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "250px",
        // bgcolor: "#F7F7F7",
        borderRight: `1px solid lightgrey`,
        display: "flex",
        flexDirection: "column",
        padding: "50px",
        alignItems: "flex-start",
        gap: 3,
      }}
    >
      <Typography component="div" sx={theme.typography.h3}>
        유저의 라이브러리
      </Typography>
      <Box
        sx={{
          color: theme.palette.text.secondary,
          fontSize: theme.fontSize.large,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {li.map((item) => (
          <Typography
            key={item.flowId}
            onClick={() =>
              navigate(`/projects/${projectId}/flows/${item.flowId}`, {
                state: { flowName: item.title },
              })
            }
            sx={{
              ...theme.typography,
              cursor: "pointer",
              textDecoration: "none",
              color: theme.palette.text.secondary,
            }}
          >
            {item.title}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default SideNav;
