import {React, useState} from "react";
import { Typography, Box, IconButton, Menu, MenuItem, Skeleton, Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function HubFlowBlock({ inId, flowName }) {
  const theme = useTheme();

  // 이미지 로딩을 확인하기 위한 상태
  const [imageLoaded, setImageLoaded] = useState(false);

  // 케밥 버튼 관련 로직
  const [anchorEl, setAnchorEl] = useState(null);
  const isKebabOpen = Boolean(anchorEl);

  const handleKebabToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleKebabClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    alert('삭제하기 클릭');
    handleKebabClose();
  };

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  }


  const openModal = () => {
    setIsModalOpen(true);
    handleKebabClose();
  };

  return (
    <Box
      onClick={(event) => {
        // 케밥버튼이 아닌 경우에만 수정하기 실행 + 케밥 버튼 누른 후 리스트 밖에 눌러도 수정하기 막기 추가
        if (!event.target.closest('button') && !event.target.closest('.MuiMenuItem-root') && !event.target.closest('.MuiMenu-root')) {
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
        }}
      >
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
          />
        )}
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover", display: imageLoaded ? 'block' : 'none' }}
          src="https://picsum.photos/500/233?random=1"
          alt=""
          // 이미지 로드 완료 시 상태 업데이트
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
        <IconButton onClick={handleKebabToggle} sx={{color:theme.palette.common.grey}}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isKebabOpen}
          onClose={handleKebabClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MenuItem onClick={handleDelete} sx={theme.typography.sub}>삭제하기</MenuItem>
        </Menu>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            bgcolor: "background.paper",
            textAlign: 'center',
            borderRadius: '8px',
            boxShadow: 24,
            padding: "10px",
            outline: 'none',
            gap: 1,
          }}
        >
          <img
            src="https://picsum.photos/500/233?random=1"
            alt=""
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <Box>
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
                  bgcolor: "transparent", // 배경색 제거
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
