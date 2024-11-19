import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DeleteHeaderButton = (props) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        backgroundColor: theme.palette.button.delete,
        fontFamily: theme.button,
        width: "20px",
        minWidth: "20px",
        borderRadius: "15px",
        ...props.sx,
      }}
    >
      <DeleteForeverIcon sx={{ fontSize: 19 }} />
    </Button>
  );
};

export default DeleteHeaderButton;
