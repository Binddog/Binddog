import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";

import { modifyFlow } from "../../api/libraryFlow"; // modifyFlow 함수 import

const SaveButton = ({
  projectId,
  flowId,
  title,
  description,
  nodes,
  edges,
}) => {
  const theme = useTheme();

  // React Flow 데이터를 서버 요구 형식으로 변환
  const transformData = (nodes, edges) => {
    const blocks = nodes
      .filter((_, index) => index !== 0) // 첫 번째 블록 제외
      .map((node) => ({
        blockId: parseInt(node.id, 10), // ID를 Long 타입에 맞게 변환
        method: node.data.method,
        endpoint: node.data.endpoint,
        name: node.data.apiName,
        position: {
          x: parseFloat(node.position.x), // Position을 Float 타입으로 변환
          y: parseFloat(node.position.y),
        },
        header: node.data.header ? Object.fromEntries(node.data.header) : {}, // Map<String, String> -> Object 변환
        parameter: node.data.parameter
          ? Object.fromEntries(node.data.parameter)
          : {}, // Map<String, String> -> Object 변환
        pathVariable: node.data.pathVariable
          ? Object.fromEntries(node.data.pathVariable)
          : {}, // Map<String, String> -> Object 변환
        request: node.data.request ? Object.fromEntries(node.data.request) : {}, // Map<String, Object> -> Object 변환
        response: node.data.response
          ? Object.fromEntries(node.data.response)
          : {}, // Map<String, Object> -> Object 변환
      }));

    const links = edges.map((edge) => ({
      linkId: edge.id ? parseInt(edge.id, 10) : null,
      fromBlockId: edge.source ? parseInt(edge.source, 10) : null,
      toBlockId: edge.target ? parseInt(edge.target, 10) : null,
      mappings: edge.mappings || [], // 기본값으로 빈 배열 추가
    }));

    return {
      title,
      description,
      blocks,
      links,
    };
  };

  // Save 버튼 클릭 핸들러
  const handleSave = async () => {
    const requestBody = transformData(nodes, edges);

    console.log("requestBody: ", requestBody);

    try {
      const response = await modifyFlow(projectId, flowId, requestBody);
      alert("저장 완료");
    } catch (error) {
      alert("저장 실패");
      console.error("저장 실패:", error);
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
