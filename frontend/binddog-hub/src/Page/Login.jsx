import { useTheme } from "@mui/material/styles";
import { Box, Typography, TextField, Button } from "@mui/material";

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ ...theme.typography.h2, padding: "20px" }}>
          로그인
        </Typography>
        <TextField
          label="이메일"
          id="email"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
                borderColor: theme.palette.common.grey,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
          }}
        />
        <TextField
          label="비밀번호"
          id="password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
                borderColor: theme.palette.common.grey,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.common.grey,
              fontSize: theme.fontSize.medium,
              fontWeight: theme.fontWeight.bold,
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "20px",
            padding: "10px",
            minHeight: "40px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            },
            fontWeight: theme.fontWeight.bold,
          }}
        >
          로그인하기
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
