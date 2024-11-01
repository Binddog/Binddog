import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DeleteButton = () => {
  const theme = useTheme();

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.button.delete,
          fontFamily: theme.button,
          borderRadius: "20px",
        }}
      >
        <DeleteForeverIcon sx={{ marginRight: "6px", fontSize: 19 }} /> Delete
      </Button>
    </>
  );
};

export default DeleteButton;
