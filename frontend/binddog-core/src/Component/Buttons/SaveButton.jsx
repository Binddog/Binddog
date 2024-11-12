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
    const blocks = nodes.map((node) => ({
      blockId: parseInt(node.id, 10), // ID를 Long 타입에 맞게 변환
      method: node.data.method,
      endpoint: node.data.endpoint,
      name: node.data.description,
      position: {
        x: parseFloat(node.position.x), // Position을 Float 타입으로 변환
        y: parseFloat(node.position.y),
      },
      header: node.data.header || {}, // Map<String, String>에 맞게 초기화
      parameter: node.data.parameter || {}, // Map<String, String>
      pathVariable: node.data.pathVariable || {}, // Map<String, String>
      request: node.data.request || {}, // Map<String, Object>
      response: node.data.response || {}, // Map<String, Object>
    }));

    // 링크 변환
    const links = edges.map((edge) => ({
      linkId: parseInt(edge.id, 10), // ID를 Long 타입에 맞게 변환
      fromBlockId: parseInt(edge.fromBlockId, 10), // Long 타입으로 변환
      toBlockId: parseInt(edge.toBlockId, 10), // Long 타입으로 변환
      mappings: edge.mappings || [], // 기본값으로 빈 배열 추가
    }));

    return {
      title: "Flow Title", // 필요한 경우 동적으로 설정
      description: "Flow Description", // 필요한 경우 동적으로 설정
      blocks,
      links,
    };
  };

  // React Flow 데이터 파싱 함수
  const parseReactFlow = () => {
    const nodes = [];
    const edges = [];

    // React Flow 노드 파싱
    const nodeElements = document.querySelectorAll(".react-flow__node");
    nodeElements.forEach((nodeElement) => {
      const id = nodeElement.getAttribute("data-id");
      const transformStyle = nodeElement.style.transform;
      const positionMatch = transformStyle.match(/translate\((.+?)\)/);
      const [x, y] = positionMatch[1]
        .split(",")
        .map((value) => parseFloat(value.trim()));
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
        id, // React Flow 노드의 고유 ID를 그대로 사용
        position: { x, y },
        data: { method, description, endpoint },
        type: "customBlock",
      });
    });

    // React Flow 엣지 파싱
    const edgeElements = document.querySelectorAll(".react-flow__edge");
    edgeElements.forEach((edgeElement) => {
      const id = edgeElement.getAttribute("data-id");
      const ariaLabel = edgeElement.getAttribute("aria-label");

      // aria-label에서 fromBlockId와 toBlockId 추출
      const fromBlockIdMatch = ariaLabel.match(/from (\d+)/);
      const toBlockIdMatch = ariaLabel.match(/to (\d+)/);

      const fromBlockId = fromBlockIdMatch ? fromBlockIdMatch[1] : null;
      const toBlockId = toBlockIdMatch ? toBlockIdMatch[1] : null;

      edges.push({
        id,
        fromBlockId,
        toBlockId,
      });
    });

    return { nodes, edges };
  };

  // Save 버튼 클릭 핸들러
  const handleSave = async () => {
    const rawData = parseReactFlow();
    const requestBody = transformData(rawData);

    console.log(projectId + " " + flowId);
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      // modifyFlow 함수 호출
      const response = await modifyFlow(projectId, flowId, requestBody);
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
