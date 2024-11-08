import {React, useState, useEffect} from "react";
import SideNav from "../Component/SideNav";
import { Box, Typography, IconButton, Menu, MenuItem, Modal, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HubBlock from "../Component/HubBlock";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';

function HubList() {
  const theme = useTheme();

  // 바로 생성될 때 확인을 위해 useState로 변경
  const [li, setLi] = useState([
    // { id: 1, title: "FLOW1" },
    // { id: 2, title: "FLOW2" },
    // { id: 3, title: "FLOW3" },
    // { id: 4, title: "FLOW4" },
  ]);

  const handleCreate = () => {
    setLi((prevLi) => [...prevLi, { id:li.length, title, description }]);
  };


  const [title, setTitle] = useState("기본 제목" + (li.length+1));
  const [description, setDescription] = useState("기본 설명");

  const makeProject = () => {
    console.log(title);
    console.log(`설명은? : ${description}`);
    handleCreate();
    setTitle("기본 제목" + (li.length + 1));
    setDescription("기본 설명");
    CloseModal();
  }

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
              허브 확인 페이지 (프로젝트 리스트임) 추후 프로젝트 별 플로우 리스트가 필요
            </Typography>
            <Box>
              <Typography
                component={Button}
                onClick={OpenModal}
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
                프로젝트 생성하기
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
                허브 확인 페이지 (허브 리스트 - 프로젝트 리스트임) 추후 프로젝트 별 플로우 리스트가 필요
              </Typography>
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
            width: "600px",
            height: "250px",
            bgcolor: theme.palette.common.white,
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            padding: "10px"
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
                }
              ]}
            >
              프로젝트 생성
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
              <HighlightOffIcon/>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "15px 60px",
              gap : 2,
            }}
          >
            <TextField
              label="프로젝트 이름"
              id="title"
              type="text"
              variant="outlined"
              placeholder="프로젝트 이름을 입력해주세요"
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "10px",
                    borderColor: theme.palette.common.grey,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.common.grey,
                  fontSize: theme.fontSize.medium,
                  fontWeight: theme.fontWeight.bold,
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.common.grey,
                  fontSize: theme.fontSize.medium,
                  fontWeight: theme.fontWeight.bold,
                },
              }}
            />
            <TextField
              label="프로젝트 설명"
              id="title"
              type="text"
              variant="outlined"
              placeholder="프로젝트 설명을 입력해주세요"
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "10px",
                    borderColor: theme.palette.common.grey,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.common.grey,
                  fontSize: theme.fontSize.medium,
                  fontWeight: theme.fontWeight.bold,
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.common.grey,
                  fontSize: theme.fontSize.medium,
                  fontWeight: theme.fontWeight.bold,
                },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={makeProject}
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
                fontWeight: theme.fontWeight.bold,
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

export default HubList;
