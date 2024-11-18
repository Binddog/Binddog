import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { getProjects, createProject } from "../api/project";

function Projects() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("프로젝트 목록을 불러오는데 실패했습니다:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleAddProject = async () => {
    try {
      await createProject(title, description);
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);
      handleCloseModal();
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

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
          marginTop: "20px",
        }}
      >
        {projects.map((project, index) => (
          <Box
            key={project.projectId}
            onClick={() =>
              navigate(`/projects/${project.projectId}`, {
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

        {/* 프로젝트 추가 버튼 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px dashed ${theme.palette.common.lightgrey}`,
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <IconButton
            onClick={handleOpenModal}
            sx={{
              color: theme.palette.common.grey,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                bgcolor: theme.palette.common.lightgrey,
              },
            }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        </Box>
      </Box>

      {/* 모달 */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "600px",
            height: "250px",
            bgcolor: theme.palette.common.white,
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            padding: "10px 5px 30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={[
                theme.typography.h3,
                {
                  flexGrow: 4,
                  display: "flex",
                  justifyContent: "center",
                },
              ]}
            >
              프로젝트 생성
            </Typography>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                color: theme.palette.common.grey,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: theme.palette.common.lightgrey,
                },
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "15px 60px",
              gap: 2,
            }}
          >
            <TextField
              label="프로젝트 이름"
              type="text"
              variant="outlined"
              placeholder="프로젝트 이름을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                sx: {
                  fontSize: theme.fontSize.medium,
                  color: theme.palette.common.grey,
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: theme.fontSize.medium,
                  color: theme.palette.common.grey,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "10px",
                    borderColor: theme.palette.common.grey,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.common.grey,
                  },
                },
              }}
            />
            <TextField
              label="프로젝트 설명"
              type="text"
              variant="outlined"
              placeholder="프로젝트 설명을 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                sx: {
                  fontSize: theme.fontSize.medium,
                  color: theme.palette.common.grey,
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: theme.fontSize.medium,
                  color: theme.palette.common.grey,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "10px",
                    borderColor: theme.palette.common.grey,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.common.grey,
                  },
                },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddProject}
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: "20px",
                padding: "10px",
                minHeight: "40px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              생성하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Projects;
