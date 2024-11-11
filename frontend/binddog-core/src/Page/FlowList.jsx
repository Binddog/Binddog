import { React, useState } from "react";
import SideNav from "../Component/SideNav";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FlowBlock from "../Component/FlowBlock";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { createProject } from "../api/project";

function FlowList() {
  const theme = useTheme();

  const [num, setNum] = useState(5);
  const [titleName, setTitleName] = useState("FLOW5");
  const [description, setDescription] = useState("기본 설명");

  const [li, setLi] = useState([
    { id: 1, title: "FLOW1" },
    { id: 2, title: "FLOW2" },
    { id: 3, title: "FLOW3" },
    { id: 4, title: "FLOW4" },
  ]);

  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  // 프로젝트 생성 함수
  const handleCreate = async () => {
    try {
      const newProject = await createProject(titleName, description);
      setLi((prevLi) => [
        ...prevLi,
        {
          id: newProject.id,
          title: newProject.title,
          description: newProject.description,
        },
      ]);
      setNum(num + 1);
      setTitleName("FLOW" + (num + 1));
      CloseModal();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      <SideNav li={li} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "20px 40px",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              ...theme.typography.h2,
            }}
          >
            플로우 확인 페이지 (플로우 리스트)
          </Typography>
          <Box>
            <Typography
              component="button"
              onClick={OpenModal}
              sx={[
                theme.typography.sub,
                {
                  padding: "10px",
                  borderRadius: "7px",
                  border: "none",
                  bgcolor: theme.palette.common.lightgrey,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                },
              ]}
            >
              생성하기
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              lg: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: 5,
            justifyItems: "center",
            marginTop: "20px",
          }}
        >
          {li.map((item) => (
            <FlowBlock key={item.id} inId={item.id} flowName={item.title} />
          ))}
        </Box>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={CloseModal}
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
              onClick={CloseModal}
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
              onChange={(e) => setTitleName(e.target.value)}
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
              onClick={handleCreate}
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

export default FlowList;
