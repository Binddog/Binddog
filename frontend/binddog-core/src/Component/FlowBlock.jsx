import * as React from "react";
import { Card, Typography, Box, img } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function FlowBlock({name}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '500px',
        height: '300px',
        borderRadius: '10px',
        border: 'lightgray solid 2px',
        padding: '20px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // bgcolor: 'lightgray'
      }}
    >
      <Box
        sx={{
          borderRadius: '5px',
          flex: 0.8,
          overflow: 'hidden',
        }}
      >
        <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src="https://picsum.photos/500/233?random=1" alt="" />
      </Box>
      <Box
        sx={{
          flex: 0.2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={theme.subtitle}>
          이름 : {name}
        </Typography>
      </Box>

    </Box>
  );
};

export default FlowBlock;