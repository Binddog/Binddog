import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getProject } from "../api/hubProject";

function HubList() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProject();
        setProjects(projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box
      sx={{
        padding: "50px",
      }}
    >
      <Typography sx={theme.typography.h2}>프로젝트 목록</Typography>

      {/* 프로젝트 목록 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
          },
          gap: 5,
          marginTop: "40px",
        }}
      >
        {projects.map((project, index) => (
          <Box
            key={project.projectId}
            onClick={() =>
              navigate(`/hubList/${project.projectId}`, {
                state: { projectName: project.title },
              })
            }
            sx={{
              position: "relative",
              padding: "20px",
              border: `1px solid ${theme.palette.common.grey}`,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.fontSize.medium,
                }}
              >
                {index + 1}번 프로젝트
              </Typography>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    fontSize: theme.fontSize.small,
                    color: theme.palette.text.secondary,
                  }}
                >
                  시작일: {formatDate(project.createdDate)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: theme.fontSize.small,
                    color: theme.palette.text.secondary,
                  }}
                >
                  수정일: {formatDate(project.lastModifiedDate)}
                </Typography>
              </Box>
            </Box>

            {/* 프로젝트 이름과 설명 */}
            <Box>
              <Typography sx={{ ...theme.typography.h3 }}>
                {project.title}
              </Typography>
              <Typography sx={{ ...theme.typography, marginTop: "10px" }}>
                {project.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default HubList;
