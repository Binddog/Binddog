import { React, useState, useEffect } from "react";
import SideNav from "../Component/SideNav";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HubFlowBlock from "../Component/HubFlowBlock";
import { useNavigate, useParams } from "react-router-dom";
import { getAllFlow } from "../api/libraryFlow";

function HubFlowList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [li, setLi] = useState([]);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const flows = await getAllFlow(id);
        setLi(flows);
      } catch (error) {
        console.error("Failed to fetch flows:", error);
      }
    };

    if (id) {
      fetchFlows();
    }
  }, [id]);

  const backToHubList = () => {
    navigate("/hubList");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      <SideNav li={li} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "40px 60px",
          overflow: "auto",
        }}
      >
        {li.length > 0 ? (
          <Box
            sx={{
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                ...theme.typography.h3,
              }}
            >
              세부 프로젝트 별 플로우 리스트 페이지
            </Typography>
            <Box>
              <Typography
                component={Button}
                onClick={backToHubList}
                sx={[
                  theme.typography.sub,
                  {
                    padding: "5px",
                    borderRadius: "10px",
                    border: "none",
                    bgcolor: theme.palette.primary.main,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  },
                ]}
              >
                뒤로가기
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                ...theme.typography.h3,
              }}
            >
              세부 프로젝트 별 플로우 리스트 페이지
            </Typography>
            <Box>
              <Typography
                onClick={backToHubList}
                component={Button}
                sx={[
                  // theme.typography.sub,
                  {
                    padding: "5px",
                    borderRadius: "10px",
                    border: "none",
                    bgcolor: theme.palette.primary.main,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  },
                ]}
              >
                뒤로가기
              </Typography>
            </Box>
          </Box>
        )}

        {li.length > 0 ? (
          <Box
            sx={{
              flexGrow: 1,
              display: "grid",
              gridTemplateColumns: {
                sm: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              },
              gap: 5,
              justifyItems: "center",
              marginTop: "20px",
            }}
          >
            {li.map((item) => (
              <HubFlowBlock
                key={item.id}
                inId={item.id}
                flowName={item.title}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={[
                theme.typography.h3,
                {
                  color: theme.palette.common.grey,
                },
              ]}
            >
              생성된 플로우가 없습니다.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HubFlowList;
