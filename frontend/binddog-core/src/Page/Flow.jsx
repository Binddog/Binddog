import React, { useState } from "react";
import { Box } from "@mui/material";
import BlockList from "../Component/BlockList";
import Board from "../Component/Board";
import blockData from "../block.json";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Block from "../Component/Block";

function parsePaths(paths) {
  const blocks = [];

  Object.keys(paths).forEach((endpoint) => {
    const methods = paths[endpoint];

    Object.keys(methods).forEach((method) => {
      const { summary, description, operationId, tags } = methods[method];

      blocks.push({
        block_id: operationId,
        method: method.toUpperCase(),
        endpoint,
        name: summary,
        description,
        tags,
      });
    });
  });

  return blocks;
}

const parsedBlocks = parsePaths(blockData.paths);

function Flow() {
  const [droppedBlocks, setDroppedBlocks] = useState({});
  const [activeBlock, setActiveBlock] = useState(null);

  const handleDelete = (id) => {
    setDroppedBlocks((prev) => {
      const updatedBlocks = { ...prev };
      delete updatedBlocks[id];
      return updatedBlocks;
    });
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const blockData = parsedBlocks.find(
      (block) => block.block_id === active.id
    );
    setActiveBlock(blockData);

    document.body.style.overflow = "hidden";
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      const zoneId = over.id;
      const blockData = parsedBlocks.find(
        (block) => block.block_id === active.id
      );

      if (blockData) {
        setDroppedBlocks((prev) => ({
          ...prev,
          [zoneId]: blockData,
        }));
      }
    }
    setActiveBlock(null);

    document.body.style.overflow = "auto";
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll={false}
    >
      <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <BlockList name={"APIs"} li={parsedBlocks} />
        </Box>
        <Box
          sx={{
            flexGrow: 0.96,
            height: "95%",
            padding: "10px",
          }}
        >
          <Board blocks={droppedBlocks} onDelete={handleDelete} />
        </Box>
      </Box>
      <DragOverlay dropAnimation={null}>
        {activeBlock ? (
          <Block
            id={activeBlock.block_id}
            method={activeBlock.method}
            apiName={activeBlock.name}
            endpoint={activeBlock.endpoint}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
export default Flow;
