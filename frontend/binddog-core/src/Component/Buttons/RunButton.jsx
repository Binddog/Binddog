import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const RunButton = () => {
  const theme = useTheme();

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.button.run,
          fontFamily: theme.button,
          borderRadius: "20px",
        }}
      >
        <PlayCircleOutlineIcon sx={{ marginRight: "6px", fontSize: 19 }} /> RUN
      </Button>
    </>
  );
};

export default RunButton;
