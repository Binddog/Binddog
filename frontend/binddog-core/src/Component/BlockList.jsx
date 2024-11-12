import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Block from "./Block";
import { getDocs } from "../api/libraryFlow";

let idx = 0;

function parseResponse(res) {
  //TODO: res 200일 때의 response 세팅
}

function parseRequest(params) {
  const parameters = [];
  const pathVariables = [];
  const headers = [];

  params.forEach((param) => {
    if (param.in === "path") {
      parameters.push(param.name);
    } else if (param.in === "query") {
      pathVariables.push(param.name);
    } else if (param.in == "header") {
      headers.push(param.name);
    }
  });
  return { parameters, pathVariables, headers };
}

function createBlock(path, method, detail) {
  const parsedRequest = parseRequest(detail.parameters || []);
  const parameters = parsedRequest.parameters;
  const pathVariables = parsedRequest.pathVariables;
  const headers = parsedRequest.headers;

  return {
    key: idx,
    id: idx++,
    method: method.toUpperCase(),
    apiName: detail.summary,
    endpoint: path,
    // position: item.position,
    header: headers,
    parameter: parameters,
    pathVariable: pathVariables,
    request: detail.requestBody,
    response: detail.responses,
  };
}

function createBlockList(context, docs) {
  const blockList = new Array();
  Object.entries(docs).forEach(([path, value]) => {
    Object.entries(value).forEach(([method, detail]) => {
      blockList.push(createBlock(`${context}${path}`, method, detail));
    });
  });
  return blockList;
}

function BlockList({ name, addNode }) {
  const theme = useTheme();
  const [li, setLi] = useState([]);
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docsData = await getDocs();
        const context = docsData.servers[0].url;
        const paths = docsData.paths;

        console.log(docsData);
        const temp = createBlockList(context, paths);
        setLi(temp || []);
        console.log(temp);
        console.log("li = ", li);
        // setLi(createBlockList(context, paths) || []);
        console.log("temp");
      } catch (error) {
        console.error("문서 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <Box
      sx={{
        width: "250px",
        // height: "100%",
        // bgcolor: "#F7F7F7",
        display: "flex",
        flexDirection: "column",
        padding: "50px",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
          }}
        >
          현재 Flowname
        </Typography>
        <Typography
          sx={{
            ...theme.typography.h3,
            fontWeight: "bold",
            bgcolor: theme.palette.primary.main,
          }}
        >
          {name}
        </Typography>
      </Box>
      {li.map((item) => (
        <Block
          key={item.key}
          id={item.id}
          method={item.method}
          apiName={item.apiName}
          endpoint={item.endpoint}
          // position = { item.position }
          header={item.header}
          parameter={item.parameter}
          pathVariable={item.pathVariable}
          request={item.request}
          response={item.response}
          addNode={addNode}
        />
      ))}
    </Box>
  );
}

export default BlockList;
