import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBF6CF" />
            <stop offset="100%" stopColor="#6076C4" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        size={60}
      />
    </React.Fragment>
  );
}

export default function Loading() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Typography
        sx={{
          marginBottom: 2,
          fontSize: theme.typography.fontSize.large,
          color: theme.palette.common.grey,
        }}
      >
        Loading ...
      </Typography>

      <GradientCircularProgress />
    </Box>
  );
}
