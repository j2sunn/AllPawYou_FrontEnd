import { AuthApi } from "./AuthApi";

const REST_API_URL = `/api/visitor`;

export const TotalVisitor = async () => {
  const response = await AuthApi.get(REST_API_URL + `/total`);
  console.log(response); // 전체 응답 로그
  return response.data; // 방문자 수 데이터 반환
};

export const DailyVisitor = async () => {
  const response = await AuthApi.get(REST_API_URL + `/daily`);
  return response.data;
};
