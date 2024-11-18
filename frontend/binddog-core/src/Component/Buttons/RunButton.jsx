import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { runFlow } from "../../api/runFlow";

const RunButton = ({ nodes, edges, addLog, restartLog }) => {
  const theme = useTheme();

  const handleClick = async () => {
    // reset logs
    restartLog();
    let previousResult = {}; // 이전 API 호출 결과를 저장할 객체
    console.log(previousResult)
    if(edges && edges.length > 0){
      console.log(edges)
      let currentEdge = edges.find(edge => edge.source === '0');
      if (!currentEdge) {
        return;
      }
      let currentNode = nodes.find(node => node.id === currentEdge.target);
      
      while(currentNode){
        console.log(`flow call endpoint: ${currentNode.data.endpoint}`);

        const endpoint = currentNode.data.endpoint;
        const pathValue = currentNode.data.pathValue;

        // newEndpoint 초기화: "map:" 조건에 따라 이전 결과에서 값을 동적으로 대체
        const newEndpoint = endpoint.replace(/{(\w+)}/g, (match, key) => {
          const pathVariable = pathValue.get(key);
          if (pathVariable && pathVariable.startsWith("map:")) {
            // "map:"을 제거하고 경로를 파싱하여 값을 가져옴
            const dataPath = pathVariable.replace("map:", "").trim().split(".");
            let value = previousResult;
            for (const segment of dataPath) {
              if (value && segment in value) {
                value = value[segment];
              } else {
                console.error(`Path "${dataPath.join(".")}" not found in result.`);
                return pathVariable; // 매칭된 원래 값을 반환
              }
            }
            return value; // 파싱한 값을 반환
          }

          // 기존 방식으로 pathValue의 값을 대체
          return pathVariable || match;
        });


        console.log(newEndpoint);

        console.log(currentNode.data.paramValue);
        // Map을 일반 객체로 변환
        let paramObject = currentNode.data.paramValue;
        if (paramObject instanceof Map) {
          paramObject = Object.fromEntries(paramObject); // Map -> Object 변환
        }

        // **Parameter 동적 처리 추가**
        if (paramObject) {
          Object.keys(paramObject).forEach((key) => {
            const value = paramObject[key];
            if (typeof value === "string" && value.startsWith("map:")) {
              // "map:" 경로 파싱
              const dataPath = value.replace("map:", "").trim().split(".");
              let resolvedValue = previousResult;
              for (const segment of dataPath) {
                if (resolvedValue && segment in resolvedValue) {
                  resolvedValue = resolvedValue[segment];
                } else {
                  console.error(
                      `Path "${dataPath.join(".")}" not found in result.`
                  );
                  resolvedValue = value; // 원래 문자열 반환
                  break;
                }
              }
              paramObject[key] = resolvedValue; // 변환된 값 설정
            }
          });
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

        try {
          if (typeof result.response === "string") {
            previousResult = JSON.parse(result.response); // JSON 문자열 파싱
          } else if (typeof result.response === "object") {
            previousResult = result.response; // 이미 객체인 경우
          } else {
            throw new Error("Invalid JSON format");
          }
        } catch (e) {
          console.error("Invalid JSON response:", result.response, e);
          break; // 루프 종료
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
