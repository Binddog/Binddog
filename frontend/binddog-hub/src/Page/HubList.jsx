import {React, useState, useEffect} from "react";
import SideNav from "../Component/SideNav";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HubBlock from "../Component/HubBlock";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function HubList() {
  const theme = useTheme();

  // 바로 생성될 때 확인을 위해 useState로 변경
  const [li, setLi] = useState([
    { id: 1, title: "FLOW1" },
    { id: 2, title: "FLOW2" },
    { id: 3, title: "FLOW3" },
    { id: 4, title: "FLOW4" },
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
            <HubBlock key={item.id} inId={item.id} flowName={item.title} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HubList;
