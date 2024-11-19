import { React, useState, useEffect } from "react";
import { Typography, Box, Skeleton, Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { loadImage } from "../api/libraryFlow";

function HubFlowBlock({ inId, flowName, projectId }) {
  const theme = useTheme();

  // 이미지 로딩 상태 및 URL 저장
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // 이미지 불러오기
  console.log("projectId: ", projectId);
  console.log("inId: ", inId);

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
        if (
          !event.target.closest("button") &&
          !event.target.closest(".MuiMenuItem-root") &&
          !event.target.closest(".MuiMenu-root")
        ) {
          openModal();
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        {!imageLoaded && (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: imageLoaded ? "block" : "none",
          }}
          src={imageUrl}
          alt={flowName}
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
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "40%", sm: "40%", md: "40%" },
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "10px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl}
              alt={flowName}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Typography
              component="button"
              onClick={handleModalClose}
              sx={[
                theme.typography.h3,
                {
                  width: "40px",
                  height: "40px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  bgcolor: "transparent",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    color: theme.palette.common.black,
                  },
                },
              ]}
            >
              X
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default HubFlowBlock;
