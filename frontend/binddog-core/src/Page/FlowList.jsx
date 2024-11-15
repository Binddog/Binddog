import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import SideNav from "../Component/SideNav";
import FlowBlock from "../Component/FlowBlock";
import Loading from "../Component/Loading";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { getAllFlow, createFlow } from "../api/libraryFlow";

function FlowList() {
  const theme = useTheme();
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName;

  const [li, setLi] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleName, setTitleName] = useState("FLOW");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFlows = async () => {
    setLoading(true);
    try {
      const flows = await getAllFlow(projectId);
      setLi(Array.isArray(flows) ? flows : []);
    } catch (error) {
      console.error("플로우 리스트를 불러오는데 실패했습니다:", error);
      setLi([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlows();
  }, [projectId]);

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  const handleCreate = async () => {
    try {
      await createFlow(projectId, titleName, description);
      const updatedFlows = await getAllFlow(projectId);
      setLi(Array.isArray(updatedFlows) ? updatedFlows : []);

      setTitleName(`FLOW${updatedFlows.length + 1}`);
      CloseModal();
    } catch (error) {
      console.error("Failed to create flow:", error);
    }
  };

  return (
    // 프로젝트의 모든 플로우 확인
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <SideNav li={li} projectId={projectId} projectName={projectName} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "40px 60px",
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
          <Typography sx={theme.typography.h2}>나의 플로우 리스트</Typography>
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
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                },
              ]}
            >
              생성하기
            </Typography>
          </Box>
        </Box>

        {li.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              },
              gap: 5,
              justifyItems: "center",
              marginTop: "20px",
            }}
          >
            {li.map((item) => (
              <FlowBlock
                key={item.flowId}
                inId={item.flowId}
                projectId={projectId}
                flowName={item.title}
                description={item.description}
                fetchFlows={fetchFlows}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              marginTop: "20px",
            }}
          >
            <Typography sx={theme.typography.h3}>
              아직 플로우가 없습니다.
            </Typography>
          </Box>
        )}
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
              label="플로우 설명"
              type="text"
              variant="outlined"
              placeholder="플로우 설명을 입력해주세요"
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
