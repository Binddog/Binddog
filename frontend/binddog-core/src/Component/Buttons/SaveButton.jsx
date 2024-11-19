import { Button, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import html2canvas from "html2canvas";
import { modifyFlow } from "../../api/libraryFlow"; // modifyFlow 함수 import
import { saveImage } from "../../api/saveImg";
import { useState } from "react";

const SaveButton = ({
  projectId,
  flowId,
  title,
  description,
  nodes,
  edges,
}) => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
        pathValue: node.data.pathValue
          ? Object.fromEntries(node.data.pathValue)
          : {},
        paramValue: node.data.paramValue
          ? Object.fromEntries(node.data.paramValue)
          : {},
        headerValue: node.data.paramValue
          ? Object.fromEntries(node.data.headerValue)
          : {},
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
      // ReactFlow 영역 캡처
      const reactFlowElement = document.querySelector(".react-flow"); // ReactFlow의 루트 클래스 선택
      if (!reactFlowElement) {
        console.error("ReactFlow element not found.");
        return;
      }

      const canvas = await html2canvas(reactFlowElement, {
        scale: 2, // 캡처 이미지의 해상도 향상
        useCORS: true, // CORS 이슈 방지
      });

      // 캡처된 이미지를 Blob으로 변환
      canvas.toBlob(async (blob) => {
        if (blob) {
          // 이미지를 서버에 업로드하거나 로컬에 저장

          const formData = new FormData();
          const uploadImageRequest = new Blob(
            [
              JSON.stringify({
                projectId,
                flowId,
              }),
            ],
            { type: "application/json" }
          );
          const file = new File([blob], "example.png", { type: blob.type });
          formData.append("uploadImageRequest", uploadImageRequest);
          formData.append("file", file);

          const response = saveImage(formData);

          if (response.ok) {
            console.log("Image uploaded successfully");
          }
        }
      });

      await modifyFlow(projectId, flowId, requestBody);

      setSnackbarMessage("저장 및 이미지 업로드 완료");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("저장 실패");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("저장 실패:", error);
    }
  };

  return (
    <>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SaveButton;
