import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

function SideNav({ li, title }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "250px",
        bgcolor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "column",
        padding: "50px",
        alignItems: "flex-start",
        gap: 3,
      }}
    >
      <Typography component="div" sx={theme.typography}>
        나중에 햄버거 버튼 들어갈 곳(안들어가도 되긴함)
      </Typography>
      <Typography component="div" sx={theme.typography.h3}>
        유저의 라이브러리
      </Typography>
      <Box
        sx={{
          color: theme.palette.text.secondary,
          fontSize: theme.fontSize.large,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {li.map((item) => (
          <Link
            to={`/flow/${item.id}`}
            key={item.id}
            style={{
              textDecoration: "none",
              color: theme.palette.text.secondary,
            }}
          >
            <Typography component="li" sx={theme.typography}>
              {item.title}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default SideNav;
