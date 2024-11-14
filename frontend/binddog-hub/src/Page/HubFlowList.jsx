import {React, useState, useEffect} from "react";
import SideNav from "../Component/SideNav";
import { Box, Typography, IconButton, Menu, MenuItem, Modal, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HubFlowBlock from "../Component/HubFlowBlock";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

function HubFlowList() {
  const theme = useTheme();
  const navigate = useNavigate();

  // 바로 생성될 때 확인을 위해 useState로 변경
  const [li, setLi] = useState([
    { id: 1, title: "FLOW1" },
    { id: 2, title: "FLOW2" },
    { id: 3, title: "FLOW3" },
    { id: 4, title: "FLOW4" },
  ]);

  // 뒤로가기(프로젝트 리스트) 로직
  const backToHubList = () => {
    navigate("/hubList");
  };


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
        {li.length > 0 ? (
          <Box
            sx={{
              height: "50px",
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
              세부 프로젝트 별 플로우 리스트 페이지
            </Typography>
            <Box>
              <Typography
                component={Button}
                onClick={backToHubList}
                sx={[
                  theme.typography.h3,
                  {
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    bgcolor: theme.palette.primary.main,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  },
                ]}
              >
                뒤로가기
              </Typography>
              <IconButton onClick={handleKebabToggle} sx={{color:theme.palette.common.grey}}>
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
          </Box>
        ) : (
            <Box
              sx={{
                height: "50px",
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
                세부 프로젝트 별 플로우 리스트 페이지
              </Typography>
              <Box>
                <Typography
                  onClick={backToHubList}
                  component={Button}
                  sx={[
                    theme.typography.h3,
                    {
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      bgcolor: theme.palette.primary.main,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                      },
                    },
                  ]}
                >
                  뒤로가기
                </Typography>
              </Box>
            </Box>
        )}
        
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
                <HubFlowBlock key={item.id} inId={item.id} flowName={item.title} />
                ))}
            </Box>
        ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={[theme.typography.h3, {
                  color: theme.palette.common.grey,
                }]}
              >
                생성된 플로우가 없습니다.
              </Typography>
            </Box>
          )}
      </Box>
    </Box>
  );
}

export default HubFlowList;
