import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddButton = () => {
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
        <AddCircleOutlineIcon sx={{ marginRight: "6px", fontSize: 19 }} /> Add
      </Button>
    </>
  );
};

export default AddButton;
