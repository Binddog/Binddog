import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Handle, Position } from "@xyflow/react";

const StartSign = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100px",
        height: "50px",
        backgroundColor: theme.palette.button.start,
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ fontFamily: theme.button, fontSize: theme.fontSize.medium }}
      >
        Start
      </Typography>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

export default StartSign;
