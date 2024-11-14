import React, { useState, useEffect } from "react";
import { Box, Typography, Checkbox, Select, MenuItem, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";

const ConnectionBox = ({apiName, pathVariable, parameter, pathValue, updateNodeData}) => {
  const theme = useTheme();
  const reqList = ["test"];
  const resList = ["res1", "res2"];
  // console.log("connectionbox path", pathVariable);

  const [items, setItems] = useState([]);

  // URI와 파라미터를 파싱하는 함수

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


  useEffect(() => {
    // Map을 배열로 변환하여 초기 items를 설정
    const initialItems = Array.from(pathVariable || []).map(([key, value], index) => ({
      id: index + 1,
      deactivate: false,
      input: key,  // Map의 key를 input으로 설정
      fromWhere: "",  // Map의 value를 fromWhere로 설정
      usage: "Param",
    }));
    setItems(initialItems);
  }, [pathVariable]); // pathVariable이 변경될 때마다 실행

  // 입력 값 변경 시 즉시 items 업데이트
  const handleInputChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // 포커스를 잃을 때 updateNodeData 호출
  const handleInputBlur = (item) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, fromWhere: item.fromWhere } : prevItem
      )
    );
    updateNodeData(item.input, item.fromWhere, apiName);
  };

  // console.log(items);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        backgroundColor: theme.palette.button.add,
        borderRadius: "12px",
        // width: "500px",
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
      </Box>

      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            gap: "10px",
            width: "100%",
            alignItems: "center",
            margin: "3px 5px",
          }}
        >

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

          <TextField
            value={item.fromWhere}
            onChange={(e) => handleInputChange(item.id, "fromWhere", e.target.value)}
            onBlur={() => handleInputBlur(item)}
            sx={{
              ...theme.api,
              backgroundColor: "white",
              borderRadius: "4px",
              width: "200px",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
            InputProps={{
              sx: {
                width: "200px",
                height: "30px",
                fontSize: theme.api
              },
            }}
          >
            {resList.map((res) => (
              <MenuItem key={res} value={res} sx={{ ...theme.api }}>
                {res}
              </MenuItem>
            ))}
          </TextField>

        </Box>
      ))}
    </Box>
  );
};

export default ConnectionBox;