import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function SideNav({ li, projectId, projectName }) {
  const theme = useTheme();
  const navigate = useNavigate();
  console.log(projectName);

  return (
    <Box
      sx={{
        width: "250px",
        borderRight: `1px solid lightgrey`,
        display: "flex",
        flexDirection: "column",
        padding: "50px",
        alignItems: "flex-start",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
          }}
        >
          현재 프로젝트 이름
        </Typography>
        <Typography
          sx={{
            ...theme.typography.h3,
            fontWeight: "bold",
            bgcolor: theme.palette.primary.main,
            textAlign: "center",
            padding: "5px",
          }}
        >
          {projectName}
        </Typography>
      </Box>

      <Box
        sx={{
          color: theme.palette.text.secondary,
          fontSize: theme.fontSize.large,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
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
              width: "100%",
              textAlign: "left",
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
