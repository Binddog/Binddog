import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SideNav from "../Component/SideNav";

function FlowList() {
  const theme = useTheme();

  const li = [
    { id: 1, title: "제목1" },
    { id: 2, title: "제목2" },
    { id: 3, title: "제목3" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      <SideNav li={li} name={"일단제목"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "30px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography sx={theme.typography.h2}>
            플로우 확인 페이지(플로우 리스트)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default FlowList;
