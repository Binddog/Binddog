import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { runFlow } from "../../api/runFlow";

const RunButton = ({ nodes, edges, addLog, restartLog }) => {
  const theme = useTheme();

  const handleClick = async () => {
    // reset logs
    restartLog();

    if (edges && edges.length > 0) {
      console.log(edges)
      let currentEdge = edges.find(edge => edge.source === '0');
      if (!currentEdge) {
        return;
      }
      let currentNode = nodes.find(node => node.id === currentEdge.target);

      while (currentNode) {
        console.log(`flow call endpoint: ${currentNode.data.endpoint}`);

        const endpoint = currentNode.data.endpoint;
        const pathValue = currentNode.data.pathValue;

        // newEndpoint 초기화: endpoint에서 {key}를 pathValue의 값으로 대체합니다.
        const newEndpoint = endpoint.replace(/{(\w+)}/g, (match, key) => {
          // pathValue에 key가 존재하는 경우 해당 값을, 없으면 그대로 유지
          return pathValue.get(key) || match;
        });

        console.log(newEndpoint);

        console.log(currentNode.data.paramValue);
        // Map을 일반 객체로 변환
        let paramObject = currentNode.data.paramValue;
        if (paramObject instanceof Map) {
          paramObject = Object.fromEntries(paramObject); // Map -> Object 변환
        }
        let headerObject = currentNode.data.headerValue;
        if (headerObject instanceof Map) {
          headerObject = Object.fromEntries(headerObject); // Map -> Object 변환
        }

        console.log(paramObject);
        console.log(headerObject);

        const result = await runFlow(
          newEndpoint,
          currentNode.data.method,
          paramObject,
          headerObject
        );

        addLog(result.response.data);
        if (!result.success) {
          break;
        }

        currentEdge = edges.find(edge => edge.source === currentNode.id);
        if (!currentEdge) {
          return;
        }
        currentNode = nodes.find(node => node.id === currentEdge.target);
      }
    }
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: theme.palette.button.run,
          fontFamily: theme.button,
          borderRadius: "20px",
        }}
      >
        <PlayCircleOutlineIcon sx={{ marginRight: "6px", fontSize: 19 }} /> RUN
      </Button>
    </>
  );
};

export default RunButton;
