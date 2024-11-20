import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

function Home() {
  const theme = useTheme();

  const documents = [
    {
      title: "BindDog이란?",
      description: `API를 유저 플로우처럼 배치해서 한번에 API를 테스트할 수 있도록 하는 라이브러리입니다. 
      라이브러리에서 저장한 플로우는 허브( www.binddog.org )에서도 확인할 수 있습니다!`,
    },
    {
      title: "라이브러리를 세팅하는 방법",
      description: `허브에서 회원가입을 진행하고 라이브러리 페이지에서 로그인을 진행해주세요.

      로컬 프로젝트에서 권장 버전을 참고하여 build.gradle에 의존성을 추가해주세요.

      라이브러리 페이지에서 테스트하고자 하는 프로젝트를 생성하고, 플로우를 생성해보세요.
      페이지 좌측에 개발하신 API 블록들이 정상적으로 나타난다면 세팅이 완료된 것입니다!
      
      정상적으로 세팅이 되지 않는다면, 담당자( 📧 jinniek48@gmail.com )에게 문의 주세요!
      `,
    },
    {
      title: "API 플로우 테스트를 진행하는 방법",
      description: `테스트하고 싶은 서버가 성공적으로 연결되었다면 좌측에 개발한 API 블록 리스트가 보이게 됩니다.
      
      좌측 리스트에서 API를 클릭하여 블록을 생성할 수 있고, 블록의 점을 서로 이으면 연결됩니다. 
      블록이나 선을 지우고 싶다면, 클릭 후 backspace를 누르시면 삭제됩니다.

      블록의 ➕ 버튼을 클릭하면 Header, PathVariable, Parameter를 세팅할 수 있습니다.
      입력하신 값들도 "Save" 시 함께 저장되기 때문에 매번 새롭게 입력할 필요가 없습니다!
      이전에 반환받은 responseBody를 사용하시고 싶으면, map: data.변수명 포맷으로 입력하면 자동으로 값이 들어가서 테스트가 진행됩니다.

      우측 상단의 "Run" 버튼을 누르면 플로우 대로 API 테스트가 진행됩니다.
      start 블록과 가장 먼저 실행하고 싶은 api를 연결해줘야 정상적으로 테스트가 진행되니 주의해주세요!
      `,
    },
    {
      title: "저희 서비스에 관심을 가져주셔서 감사합니다!",
      description: `저희 서비스는 오픈소스 프로젝트로 SSAFY 11기 A401 Binder 팀이 개발했습니다.
      버그를 발견하셨거나, 새로운 기능을 추가하고 싶으시다면 깃 레포지터리( https://lab.ssafy.com/s11-final/S11P31A401 )에서 기여하실 수 있어요!
      `,
    },
  ];

  return (
    <Box
      sx={{
        padding: "30px 300px",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Typography
        sx={[
          theme.typography.h2,
          { textAlign: "center", color: theme.palette.common.grey },
        ]}
      >
        매뉴얼
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component={Box}
          sx={[
            theme.typography.sub,
            {
              width: "300px",
              height: "20px",
              padding: "5px",
              textAlign: "center",
              borderRadius: "40px",
              bgcolor: theme.palette.primary.main,
            },
          ]}
        >
          현재 권장 버전은 1.0.1 입니다.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {documents.map((doc, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px 20px 0",
              gap: 3,
            }}
            key={index}
          >
            <Typography sx={theme.typography.h3}>{doc.title}</Typography>
            <Typography
              sx={[
                theme.typography.sub,
                { color: theme.palette.common.grey, whiteSpace: "pre-line" },
              ]}
            >
              {doc.description}
            </Typography>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Home;
