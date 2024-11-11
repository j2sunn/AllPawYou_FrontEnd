import { AuthApi } from "./AuthApi";

const REST_API_URL = `/api/messages`;

export const creaetMessage = async (nickname, data) => {
  const response = await AuthApi.post(`${REST_API_URL}/send/${nickname}`, data);
  return response.data;
};

export const receiveMessage = async (no) => {
  // http://localhost:8081/api/messages/received/1
  const response = await AuthApi.get(`${REST_API_URL}/received/${no}`);
  console.log(response.data);
  return response.data;
};

export const sentMessage = async (no) => {
  const response = await AuthApi.get(`${REST_API_URL}/sent/${no}`);
  return response.data;
};

export const messageDetail = async (no) => {
  const response = await AuthApi.get(`${REST_API_URL}/messageDetail/${no}`);
  return response.data;
};

export const deleteMessage = async (no) => {
  //http://localhost:8081/api/messages/delete/1
  const response = await AuthApi.delete(`${REST_API_URL}/delete/${no}`);
  return response.data;
};
