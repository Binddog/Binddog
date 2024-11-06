// 허브 - 프로젝트

import Axios from "./index";

// 허브 프로젝트 조회
export const getProject = async () => {
  const response = await Axios("projects");
  return response.data;
};

// 허브 프로젝트 생성
// 확장 가능성을 생각해서 넣은 것(허브에 다양한 프로젝트가 있는 것)
export const postProject = async (title, description) => {
  const response = await Axios.post("projects", { title: title, description: description });
  return response.resultCode;
};
