import {React, useState, useEffect} from "react";
import SideNav from "../Component/SideNav";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HubBlock from "../Component/HubBlock";

function HubList() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isKebabOpen = Boolean(anchorEl);

  // 바로 생성될 때 확인을 위해 useState로 변경
  const [li, setLi] = useState([
    { id: 1, title: "FLOW1" },
    { id: 2, title: "FLOW2" },
    { id: 3, title: "FLOW3" },
    { id: 4, title: "FLOW4" },
  ]);


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
