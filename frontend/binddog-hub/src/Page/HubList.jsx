import {React, useState, useEffect} from "react";
import SideNav from "../Component/SideNav";
import { Box, Typography, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HubBlock from "../Component/HubBlock";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function HubList() {
  const theme = useTheme();

  const [title, setTitle] = useState("기본제목");

  // 바로 생성될 때 확인을 위해 useState로 변경
  const [li, setLi] = useState([
    // { id: 1, title: "FLOW1" },
    // { id: 2, title: "FLOW2" },
    // { id: 3, title: "FLOW3" },
    // { id: 4, title: "FLOW4" },
  ]);

  // id 오름차순 정렬
  const sortByIdAsc = () => {
    setLi([...li].sort((a, b) => a.id - b.id));
  };

  // id 내림차순 정렬
  const sortByIdDesc = () => {
    setLi([...li].sort((a, b) => b.id - a.id));
  };

  // title 오름차순 정렬
  const sortByTitleAsc = () => {
    setLi([...li].sort((a, b) => a.title.localeCompare(b.title)));
  };

  // title 내림차순 정렬
  const sortByTitleDesc = () => {
    setLi([...li].sort((a, b) => b.title.localeCompare(a.title)));
  };

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

  // 모달 관련 로직
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const OpenModal = () => {
    setIsModalOpen(true);
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
            허브 확인 페이지 (허브 리스트)
          </Typography>
          <IconButton sx={{color:theme.palette.common.grey}}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isKebabOpen}
            onClose={handleKebabClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={sortByIdDesc} sx={theme.typography.sub}>최신순</MenuItem>
            <MenuItem onClick={sortByIdAsc} sx={theme.typography.sub}>오래된순</MenuItem>
          </Menu>

        </Box>
          {li.length > 0 ? (
            <Box
              sx={{
                flexGrow: 1,
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
                <HubBlock key={item.id} inId={item.id} flowName={item.title} />
                ))}
            </Box>
        ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                marginTop: "40px",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  height: "40%",
                  display: "flex",
                  border: `${theme.palette.common.lightgrey} dashed 2px`,
                  borderRadius: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={OpenModal}
                  sx={[
                    theme.typography.h3,
                    {
                      color: theme.palette.common.grey,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      border: "none",
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: theme.palette.common.lightgrey,
                      },
                    },
                  ]}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
            </Box>
          )}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={CloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: "300px",
            height: "200px",
            bgcolor: theme.palette.common.white,

          }}
        >
          내용임
          <IconButton onClick={CloseModal}>닫는거야</IconButton>
        </Box>

      </Modal>
    </Box>
  );
}

export default HubList;
