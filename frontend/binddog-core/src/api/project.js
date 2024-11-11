// 프로젝트
import Axios from "./index";

// 프로젝트 생성
export const createProject = async (title, description) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await Axios.post(
      `projects`,
      { title, description }
      // { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("프로젝트 생성 실패:", error);
    throw error;
  }
};
