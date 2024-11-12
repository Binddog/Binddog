// 프로젝트
import Axios from "./index";

// 프로젝트 생성
export const createProject = async (title, description) => {
  try {
    const response = await Axios.post(`projects`, { title, description });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await Axios(`projects`);
    console.log("data: ", response.data);
    return response.data.data;
  } catch (error) {
    console.error("프로젝트 생성 실패:", error);
    throw error;
  }
};
