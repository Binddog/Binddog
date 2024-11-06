import React, { useState, useEffect } from "react";
import { Box, Typography, Checkbox, Select, MenuItem } from "@mui/material";
import { useTheme } from "@emotion/react";

const ConnectionBox = () => {
  const theme = useTheme();
  const reqList = ["id", "password"];
  const resList = ["res1", "res2"];

  const [items, setItems] = useState([]);

  useEffect(() => {
    // reqList를 기반으로 초기 items를 설정합니다.
    const initialItems = reqList.map((input, index) => ({
      id: index + 1,
      deactivate: false,
      input: input, // reqList에서 input 설정
      fromWhere: "",
      usage: "Param",
    }));
    setItems(initialItems);
  }, []);

  const handleChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        backgroundColor: theme.palette.button.add,
        borderRadius: "12px",
        width: "500px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            ...theme.method,
            width: "50px",
            textAlign: "center",
            lineHeight: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          deactivate
        </Typography>
        <Typography
          sx={{
            ...theme.method,
            width: "100px",
            textAlign: "center",
            lineHeight: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Input
        </Typography>
        <Typography
          sx={{
            ...theme.method,
            width: "200px",
            textAlign: "center",
            lineHeight: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          from where
        </Typography>
        <Typography
          sx={{
            ...theme.method,
            width: "150px",
            textAlign: "center",
            lineHeight: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          사용방식
        </Typography>
      </Box>

      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            gap: "10px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={item.deactivate}
              onChange={(e) =>
                handleChange(item.id, "deactivate", e.target.checked)
              }
              sx={{ color: "white", padding: "0" }}
            />
          </Box>

          <Typography
            sx={{
              ...theme.method,
              width: "100px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.input}
          </Typography>

          <Select
            value={item.fromWhere}
            onChange={(e) => handleChange(item.id, "fromWhere", e.target.value)}
            sx={{
              ...theme.api,
              backgroundColor: "white",
              borderRadius: "4px",
              width: "200px",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {resList.map((res) => (
              <MenuItem key={res} value={res} sx={{ ...theme.api }}>
                {res}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={item.usage}
            onChange={(e) => handleChange(item.id, "usage", e.target.value)}
            sx={{
              ...theme.api,
              backgroundColor: "white",
              borderRadius: "4px",
              width: "150px",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MenuItem value="Param" sx={{ ...theme.api }}>
              Param
            </MenuItem>
            <MenuItem value="Path" sx={{ ...theme.api }}>
              Path
            </MenuItem>
          </Select>
        </Box>
      ))}
    </Box>
  );
};

export default ConnectionBox;
