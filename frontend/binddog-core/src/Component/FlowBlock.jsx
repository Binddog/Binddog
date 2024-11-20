import { React, useState, useEffect } from "react";
import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { deleteFlow } from "../api/libraryFlow";
import { loadImage } from "../api/saveImg";

function FlowBlock({ inId, flowName, projectId, fetchFlows, projectName }) {
  const theme = useTheme();

  const navigate = useNavigate();

  // 이미지 로딩 상태 및 URL 저장
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // 케밥 버튼 관련 로직
  const [anchorEl, setAnchorEl] = useState(null);
  const isKebabOpen = Boolean(anchorEl);

  const handleKebabToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleKebabClose = () => {
    setAnchorEl(null);
  };

  const handleModify = () => {
    navigate(`/projects/${projectId}/flows/${inId}`, { state: { flowName, projectName } });
    handleKebabClose();
  };

  const handleDelete = async () => {
    try {
      await deleteFlow(projectId, inId);
      await fetchFlows();
      handleKebabClose();
    } catch (error) {
      console.error("플로우 삭제 실패:", error);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await loadImage(projectId, inId);
        if (response?.data?.url) {
          setImageUrl(response.data.url); // URL 설정
        } else {
          console.error("이미지 URL이 없습니다.");
        }
      } catch (error) {
        console.error("이미지 로드 실패:", error);
      }
    };

    fetchImage();
  }, [projectId, inId]);

  return (
    <Box
      onClick={(event) => {
        // 케밥버튼이 아닌 경우에만 수정하기 실행 + 케밥 버튼 누른 후 리스트 밖에 눌러도 수정하기 막기 추가
        if (
          !event.target.closest("button") &&
          !event.target.closest(".MuiMenuItem-root") &&
          !event.target.closest(".MuiMenu-root")
        ) {
          handleModify();
        }
      }}
      sx={{
        width: "100%",
        maxWidth: "370px",
        height: "200px",
        borderRadius: "10px",
        border: "1px solid lightgray",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: "5px",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {!imageLoaded && (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imageLoaded ? "block" : "none",
          }}
          src={imageUrl}
          alt="Flow Thumbnail"
          onLoad={() => setImageLoaded(true)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={theme.typography.sub}>이름: {flowName}</Typography>
        </Box>
        <IconButton
          onClick={handleKebabToggle}
          sx={{ color: theme.palette.common.grey }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isKebabOpen}
          onClose={handleKebabClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <MenuItem onClick={handleDelete} sx={theme.typography.sub}>
            삭제하기
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default FlowBlock;
