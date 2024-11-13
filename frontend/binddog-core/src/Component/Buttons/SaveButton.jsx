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
      name: node.data.apiName,
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
      console.log(nodeElement);
      if (nodeElement.classList.contains("react-flow__node-customBlock")) {
        console.log("================node");
        console.log(nodeElement);

        const id = nodeElement.getAttribute("data-id");
        const transformStyle = nodeElement.style.transform;
        const positionMatch = transformStyle.match(/translate\((.+?)\)/);
        const [x, y] = positionMatch[1]
          .split(",")
          .map((value) => parseFloat(value.trim()));
        const method =
          nodeElement.querySelector(".MuiTypography-root:nth-of-type(1)")
            ?.textContent || "";
        const apiName =
          nodeElement.querySelector(".css-duksxc-MuiTypography-root")
            ?.textContent || "";
        const endpoint =
          nodeElement.querySelector(".css-r10zpx-MuiTypography-root")
            ?.textContent || "";

        nodes.push({
          id, // React Flow 노드의 고유 ID를 그대로 사용
          position: { x, y },
          data: { method, apiName, endpoint },
          type: "customBlock",
        });
      }
    });

    const edgeElements = document.querySelectorAll(".react-flow__edge");
    const edgeSet = new Set(); // 중복 방지를 위한 Set

    edgeElements.forEach((edgeElement) => {
      const id = edgeElement.getAttribute("data-id"); // React Flow의 고유 엣지 ID
      const ariaLabel = edgeElement.getAttribute("aria-label");

      // aria-label에서 fromBlockId와 toBlockId 추출 (start-sign도 포함)
      const fromBlockIdMatch = ariaLabel?.match(/from (start-sign|\d+)/);
      const toBlockIdMatch = ariaLabel?.match(/to (start-sign|\d+)/);

      const fromBlockId = fromBlockIdMatch ? fromBlockIdMatch[1] : null;
      const toBlockId = toBlockIdMatch ? toBlockIdMatch[1] : null;

      // linkId를 data-id로 사용
      const linkId = id;

      // 유효성 검사: fromBlockId와 toBlockId가 있어야만 추가
      if (fromBlockId && toBlockId) {
        const edgeKey = `${fromBlockId}-${toBlockId}`; // 중복 체크 키
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey); // 중복 방지용 Set에 추가
          edges.push({
            linkId, //long 타입에 string 저장하려 해서 null 뜨는 듯
            fromBlockId,
            toBlockId,
            mappings: [], // 기본값 추가
          });
        }
      }
    });

    return { nodes, edges };
  };

  // Save 버튼 클릭 핸들러
  const handleSave = async () => {
    const rawData = parseReactFlow();
    const filteredData = { ...rawData };
    const requestBody = transformData(filteredData);
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    try {
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
