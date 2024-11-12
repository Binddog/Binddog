// 라이브러리 - 플로우

import Axios from "./index";
import docsAxios from "./docsAxios";

// 해당 프로젝트의 API 목록 조회
export const getDocs = async () => {
  const response = await docsAxios(`/api/v3/api-docs`);
  return response.data;
};

// 특정 프로젝트의 단일 플로우 조회
export const getFlow = async (projectId, flowId) => {
  const response = await Axios(`projects/${projectId}/flows/${flowId}`);
  return response.data;
};

// 특정 프로젝트의 모든 플로우 조회
export const getAllFlow = async (projectId) => {
  const response = await Axios(`projects/${projectId}/flows`);
  return response.data;
};

// 특정 프로젝트의 플로우 생성
export const createFlow = async (projectId, title, description) => {
  const response = await Axios.post(`projects/${projectId}/flows`, {
    title,
    description,
  });
  return response.data;
};

// 특정 프로젝트의 단일 플로우 수정
export const modifyFlow = async (projectId, flowId, blocks, links, mapping) => {
  const response = await Axios.put(`projects/${projectId}/flows/${flowId}`, {
    blocks,
    links,
    mapping,
  });
  return response.data;
};

// 특정 프로젝트의 단일 플로우 삭제
export const deleteFlow = async (projectId, flowId) => {
  const response = await Axios.delete(`projects/${projectId}/flows/${flowId}`);
  return response.data;
};
