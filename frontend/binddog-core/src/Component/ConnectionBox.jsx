import React, { useState, useEffect } from "react";
import { Box, Typography, Checkbox, Select, MenuItem, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import Divider from '@mui/material/Divider';

const ConnectionBox = ({apiName, pathVariable, parameter, pathValue, paramValue, updateNodeData, updateParamsData}) => {
  const theme = useTheme();
  const reqList = ["test"];
  const resList = ["res1"];
  // console.log("connectionbox path", pathVariable);

  const [items, setItems] = useState([]);
  const [paramItems, setParamItems] = useState([]);

  // URI와 파라미터를 파싱하는 함수

  useEffect(() => {
    // reqList를 기반으로 초기 items를 설정합니다.
    const initialItems = reqList.map((input, index) => ({
      id: index + 1,
      deactivate: false,
      input: input, // reqList에서 input 설정
      type: "",
      fromWhere: "",
      usage: "Param",
    }));
    setItems(initialItems);

    // resList를 기반으로 초기 paramItems 도 설정합니다
    const initialParamItems = resList.map((input, index) => ({
      id: index + 1,
      deactivate: false,
      input: input, // resList에서 input 설정
      type: "",
      fromWhere: "",
      usage: "Param",
    }));
    setParamItems(initialParamItems);

  }, []);


  useEffect(() => {
    // Map을 배열로 변환하여 초기 items를 설정
    const initialItems = Array.from(pathVariable || []).map(([key, value], index) => {
      const matchedPathValue = pathValue?.get(key) || ""; // pathValue에서 key에 해당하는 value를 가져옴
      return {
        id: index + 1,
        deactivate: false,
        input: key,  // Map의 key를 input으로 설정
        type: value,
        fromWhere: matchedPathValue,  // pathValue의 value를 fromWhere로 설정
        usage: "Param",
      };
    });
    setItems(initialItems);
  }, [pathVariable, pathValue]); // pathVariable 또는 pathValue가 변경될 때마다 실행


  useEffect(() => {
    // Map을 배열로 변환하여 초기 paramItems를 설정
    const initialParamItems = Array.from(parameter || []).map(([key, value], index) => {
      const matchedParamValue = paramValue?.get(key) || ""; // paramValue에서 key에 해당하는 value를 가져옴
      return {
        id: index + 1,
        deactivate: false,
        input: key,  // Map의 key를 input으로 설정
        type: value,
        fromWhere: matchedParamValue,  // paramValue value를 fromWhere로 설정
        usage: "Param",
      };
    });
    setParamItems(initialParamItems);
  }, [parameter, paramValue]); // parameter 또는 paramValue 변경될 때마다 실행
  
  

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


  // paramItems 입력 값 변경 시 즉시 items 업데이트
  const handleParamInputChange = (id, field, value) => {
    setParamItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // 포커스를 잃을 때 updateNodeData 호출
  const handleParamInputBlur = (item) => {
    setParamItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, fromWhere: item.fromWhere } : prevItem
      )
    );
    updateParamsData(item.input, item.fromWhere, apiName);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        backgroundColor: theme.palette.button.box,
        borderRadius: "12px",
        boxShadow: "-4px 4px 2px rgba(0, 0, 0, 0.2)",
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
            color: theme.palette.common.black,
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
            color: theme.palette.common.black,
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
          <Box
            sx={{
              width: "100px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                ...theme.method,
                color: theme.palette.common.black,
              }}
            >
              {item.input}
            </Typography>
            <Typography
              sx={{
                ...theme.method,
                fontSize: theme.fontSize.small,
                color: theme.palette.common.grey,
              }}
            >
              ({item.type})
            </Typography>
          </Box>

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
          </TextField>
        </Box>
      ))}

      <Box
        sx={{
          width: "100%",
          height: "1px",
          bgcolor: theme.palette.common.white,
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
      </Box>

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
            color: theme.palette.common.black,
          }}
        >
          Parameter
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
            color: theme.palette.common.black,
          }}
        >
          from where
        </Typography>
      </Box>

      {paramItems.map((paramItem) => (
        <Box
          key={paramItem.id}
          sx={{
            display: "flex",
            gap: "10px",
            width: "100%",
            alignItems: "center",
            margin: "3px 5px",
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                ...theme.method,
                color: theme.palette.common.black,
              }}
            >
              {paramItem.input}
            </Typography>
            <Typography
              sx={{
                ...theme.method,
                fontSize: theme.fontSize.small,
                color: theme.palette.common.grey,
              }}
            >
              ({paramItem.type})
            </Typography>
          </Box>

          <TextField
            value={paramItem.fromWhere}
            onChange={(e) => handleParamInputChange(paramItem.id, "fromWhere", e.target.value)}
            onBlur={() => handleParamInputBlur(paramItem)}
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
          </TextField>
        </Box>
      ))}

    </Box>
  );
};

export default ConnectionBox;