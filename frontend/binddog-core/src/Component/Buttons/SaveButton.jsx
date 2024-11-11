import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';

const SaveButton = () => {
  const theme = useTheme();

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.button.add,
          fontFamily: theme.button,
          borderRadius: "20px",
        }}
      >
        <SaveIcon sx={{ marginRight: "6px", fontSize: 19 }} /> Save
      </Button>
    </>
  );
};

export default SaveButton;
