import React from "react";
import SideNav from "../Component/SideNav";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FlowBlock from "../Component/FlowBlock";

function FlowList() {
  const theme = useTheme();

  const li = [
    { id: 1, title: "FLOW1" },
    { id: 2, title: "FLOW2" },
    { id: 3, title: "FLOW3" },
    { id: 4, title: "FLOW4" },
  ];

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
        <Typography
          sx={{
            ...theme.typography.h2,
          }}
        >
          플로우 확인 페이지 (플로우 리스트)
        </Typography>

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
            <FlowBlock key={item.id} flowName={item.title} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default FlowList;
