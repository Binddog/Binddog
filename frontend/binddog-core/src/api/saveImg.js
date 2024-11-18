import axios from "axios";

export const saveImage = async (formData) => {
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  try {
    const response = await Axios.post(`images/upload`, formData);
    return response.data;
  } catch (error) {
    console.error("이미지 저장 실패:", error.response?.data || error.message);
    throw error;
  }
};

export const loadImage = async (projectId, flowId) => {
  const response = await axios(`images/${projectId}/${flowId}`, {
    baseURL: process.env.REACT_APP_API_URL,
  });
  console.log("API 호출 경로:", `images/${projectId}/${flowId}`);
  console.log("응답 URL:", response.request.responseURL);
  console.log("응답 데이터:", response.data);
  return response.data;
};
