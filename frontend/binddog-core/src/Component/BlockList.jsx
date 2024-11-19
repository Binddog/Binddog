import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Block from "./Block";
import { getDocs } from "../api/libraryFlow";

const SCHEMA_PREFIX = "#/components/schemas/";
const APPLICATION_JSON = "application/json";
let idx = 0;
const schemaMap = new Map();

/**
 * 초기 스키마 전체 초기화
 * @param schemas
 */
function initSchema(schemas) {
  Object.entries(schemas || []).forEach(([key, value]) => {
    const objMap = new Map();
    if (value.properties == null) return;
    Object.entries(value.properties || []).forEach(([properties, obj]) => {
      var res = obj.type;
      if (res == null) {
        //ref인 경우
        res = { type: obj["$ref"].replace(SCHEMA_PREFIX, "") };
      } else if (res === "array" && obj.items.hasOwnProperty("$ref")) {
        const dto = obj.items["$ref"].replace(SCHEMA_PREFIX, "");
        res = { type: res, object: dto };
      }
      objMap.set(properties, res);
    });
    schemaMap.set(key, objMap);
  });
}

function parsingInnerObject(obj) {
  const objMap = new Map();
  if (obj == null) return;
  obj.forEach((value, key) => {
    if (value.type === "array") {
      objMap.set(key, [parsingInnerObject(schemaMap.get(value.object))]);
    } else if (schemaMap.get(value.type)) {
      objMap.set(key, parsingInnerObject(schemaMap.get(value.type)));
    } else {
      objMap.set(key, value);
    }
  });
  return objMap;
}

/**
 * Response형식 매핑
 * @param  res
 * @returns
 */
function parseResponse(res) {
  const dtoName = res?.["200"]?.content?.["*/*"]?.schema?.["$ref"]?.replace(SCHEMA_PREFIX, "");
  if (!dtoName) return;
  return parsingInnerObject(schemaMap.get(dtoName));
}

function parseRequest(req) {
  if (req["requestBody"] == null) return;
  const schema = req.requestBody.content[APPLICATION_JSON].schema;
  if (!schema["$ref"]) {
    return;
  }
  let dtoName = schema["$ref"].replace(SCHEMA_PREFIX, "");
  if (dtoName === null) {
    return;
  }
  return parsingInnerObject(schemaMap.get(dtoName));
}

function parseParams(params) {
  const parameters = new Map();
  const pathVariables = new Map();
  const headers = new Map();

  params.forEach((param) => {
    if (param.in === "path") {
      pathVariables.set(param.name, param.schema.type);
    } else if (param.in === "query") {
      parameters.set(param.name, param.schema.type);
    } else if (param.in === "header") {
      headers.set(param.name, param.schema.type);
    }
  });
  return { parameters, pathVariables, headers };
}

function createBlock(path, method, detail) {
  const parsedParams = parseParams(detail.parameters || []);
  const parameters = parsedParams.parameters;
  const pathVariables = parsedParams.pathVariables;
  const headers = parsedParams.headers;
  const parsedRequest = parseRequest(detail) || [];
  const parsedResponse = parseResponse(detail.responses);

  let blockName = path;
  if (detail.summary) {
    blockName = detail.summary
  }
  if (detail.blockInfo) {
    if (detail.blockInfo.blockName) {
      blockName = detail.blockInfo.blockName
    }
  }

  return {
    key: idx,
    id: idx++,
    method: method.toUpperCase(),
    apiName: blockName,
    endpoint: path,
    // position: item.position,
    header: headers,
    parameter: parameters,
    pathVariable: pathVariables,
    request: parsedRequest,
    response: parsedResponse,
  };
}

function createBlockList(context, docs) {
  const blockList = new Array();
  Object.entries(docs || []).forEach(([path, value]) => {
    Object.entries(value || []).forEach(([method, detail]) => {
      blockList.push(createBlock(path, method, detail));
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

        if (docsData.components.schemas != null) initSchema(docsData.components.schemas);
        const paths = docsData.paths;

        const temp = createBlockList(context, paths);
        setLi(temp || []);
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
          현재 플로우 이름
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
