import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { runFlow } from "../../api/runFlow";

const RunButton = ({nodes, edges, addLog, restartLog}) => {
  const theme = useTheme();

  const handleClick = async() => {
    // reset logs
    restartLog();
    
    if(edges && edges.length > 0){
      console.log(edges)
      let currentEdge = edges.find(edge => edge.source === 'start-sign');
      if (!currentEdge) {
        return;
      }
      let currentNode = nodes.find(node => node.id === currentEdge.target);
      
      while(currentNode){
        console.log(`flow call endpoint: ${currentNode.data.endpoint}`);
      
        const result = await runFlow(
          currentNode.data.endpoint, 
          currentNode.data.method,
          // currentEdge.data.pathVariable,
          // currentEdge.data.parameter
        );
        
        addLog(result.response);
        addLog("-----------------------------------------------------------------------------")
        if(!result.success){
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
