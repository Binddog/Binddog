import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";

import { modifyFlow } from "../../api/libraryFlow"; // modifyFlow 함수 import

const SaveButton = ({ projectId, flowId }) => {
  const theme = useTheme();

  // React Flow 데이터를 서버 요구 형식으로 변환
  const transformData = (rawData) => {
    const { nodes, edges } = rawData;

    // 블록 변환
    const blocks = nodes.map((node, index) => ({
      blockId: index + 1,
      method: node.data.method,
      endpoint: node.data.endpoint,
      name: node.data.description,
      type: node.type,
      position: node.position,
      header: { key: "value" }, // 기본값
      parameter: { key: "value" }, // 기본값
      pathVariable: { key: "value" }, // 기본값
      request: {}, // 기본값
      response: {}, // 기본값
    }));

    // 링크 변환
    const links = edges.map((edge, index) => ({
      linkId: index + 1,
      fromBlockId: blocks.findIndex((block) => block.id === edge.source) + 1,
      toBlockId: blocks.findIndex((block) => block.id === edge.target) + 1,
    }));

    return { blocks, links };
  };

  // React Flow 데이터 파싱 함수
  const parseReactFlow = () => {
    const nodes = [];
    const edges = [];

    // React Flow 노드 파싱
    const nodeElements = document.querySelectorAll(".react-flow__node");
    nodeElements.forEach((nodeElement) => {
      const id = nodeElement.getAttribute("data-id");
      const positionStyle =
        nodeElement.style.transform.match(/translate\((.+?)\)/);
      const [x, y] = positionStyle
        ? positionStyle[1].split(",").map((val) => parseFloat(val.trim()))
        : [0, 0];
      const method =
        nodeElement.querySelector(".MuiTypography-root:nth-of-type(1)")
          ?.textContent || "";
      const description =
        nodeElement.querySelector(".css-duksxc-MuiTypography-root")
          ?.textContent || "";
      const endpoint =
        nodeElement.querySelector(".css-hhcfp5-MuiTypography-root")
          ?.textContent || "";

      nodes.push({
        id,
        position: { x, y },
        data: { method, description, endpoint },
        type: "customBlock",
      });
    });

    // React Flow 엣지 파싱
    const edgeElements = document.querySelectorAll(".react-flow__edge");
    edgeElements.forEach((edgeElement) => {
      const id = edgeElement.getAttribute("data-id");
      const [source, target] = id.split("__")[1].split("a-");
      const pathData = edgeElement
        .querySelector("path.react-flow__edge-path")
        ?.getAttribute("d");

      edges.push({ id, source, target, path: pathData || "" });
    });

    return { nodes, edges };
  };

  // Save 버튼 클릭 핸들러
  const handleSave = async () => {
    const projectId = 1;
    const flowId = 1;
    const rawData = parseReactFlow();

    console.log("Transformed Data:", JSON.stringify(rawData, null, 2));

    try {
      // modifyFlow 함수 호출
      const response = await modifyFlow(projectId, flowId, rawData.nodes, rawData.edges, null); // 데이터를 modifyFlow에 전달
      console.log("Flow modified successfully!", response);
      alert("Flow modified successfully!");
    } catch (error) {
      console.error("Flow modification failed:", error);
      alert("Flow modification failed. Please try again.");
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: theme.palette.button.add,
        fontFamily: theme.button,
        borderRadius: "20px",
      }}
      onClick={handleSave} // Save 기능 연결
    >
      <SaveIcon sx={{ marginRight: "6px", fontSize: 19 }} /> Save
    </Button>
  );
};

export default SaveButton;
