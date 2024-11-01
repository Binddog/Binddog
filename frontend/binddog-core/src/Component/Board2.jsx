import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import Block2 from "./Block2";

function DroppableZone({ id, block }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        border: "1px dashed lightgray",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {block && (
        <Block2
          method={block.method}
          apiName={block.name}
          endpoint={block.endpoint}
        />
      )}
    </Box>
  );
}

function Board2({ blocks }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 2,
        padding: "10px",
        bgcolor: theme.palette.background.paper,
      }}
    >
      {Array.from({ length: 9 }).map((_, index) => {
        const zoneId = `zone-${index + 1}`;
        return (
          <DroppableZone key={zoneId} id={zoneId} block={blocks[zoneId]} />
        );
      })}
    </Box>
  );
}

export default Board2;
