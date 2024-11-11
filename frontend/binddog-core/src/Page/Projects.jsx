import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
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
import { createProject } from "../api/project";

function Projects() {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      const newProject = await createProject(title, description);
      setProjects((prevProjects) => [...prevProjects, newProject]);
      handleCloseModal();
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: "30px",
      }}
    >
      <Typography sx={theme.typography.h2}>프로젝트 목록</Typography>

      {projects.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              lg: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: 5,
            marginTop: "20px",
          }}
        >
          {projects.map((project, index) => (
            <Box
              key={index}
              sx={{
                padding: "20px",
                border: "1px solid gray",
                borderRadius: "8px",
              }}
            >
              <Typography>{project.title}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            border: `2px dashed ${theme.palette.common.lightgrey}`,
            borderRadius: "8px",
            padding: "40px",
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
            <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </Box>
      )}

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
            padding: "10px 10px 30px",
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
                theme.typography.h2,
                {
                  flexGrow: 4,
                  display: "flex",
                  justifyContent: "center",
                },
              ]}
            >
              플로우 생성
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
              label="플로우 이름"
              type="text"
              variant="outlined"
              placeholder="플로우 이름을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                "& .MuiInputLabel-root": {
                  color: theme.palette.common.grey,
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.common.grey,
                },
              }}
            />
            <TextField
              label="플로우 설명"
              type="text"
              variant="outlined"
              placeholder="플로우 설명을 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                "& .MuiInputLabel-root": {
                  color: theme.palette.common.grey,
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.common.grey,
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
