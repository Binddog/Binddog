// 라이브러리 - 플로우

import Axios from "./index";

// 특정 프로젝트의 단일 플로우 조회
export const getFlow = async (projectId, flowId) => {
  const response = await Axios(`projects/${projectId}/flows/${flowId}`, {
    params: { projectId, flowId },
  });
  return response.data;
};

// 특정 프로젝트의 모든 플로우 조회
export const getAllFlow = async (projectId) => {
  const response = await Axios(`projects/${projectId}/flows`, {
    params: { projectId },
  });
  console.log("data: ", response.data.data.flows);
  return response.data.data.flows;
};

// api/libraryFlow.js
export const createFlow = async (projectId, title, description) => {
  const response = await Axios.post(`projects/${projectId}/flows`, {
    title,
    description,
  });
  return response.data;
};

// 특정 프로젝트의 단일 플로우 수정
export const modifyFlow = async (projectId, flowId, blocks, links, mapping) => {
  const response = await Axios.put(
    `projects/${projectId}/flows/${flowId}`,
    { blocks, links, mapping },
    { params: { projectId, flowId } }
  );
  return response.data;
};

// 특정 프로젝트의 단일 플로우 삭제
export const deleteFlow = async (projectId, flowId) => {
  const response = await Axios.delete(`projects/${projectId}/flows/${flowId}`, {
    params: { projectId, flowId },
  });
  return response.data;
};
