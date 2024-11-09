import { AuthApi } from "./AuthApi";

const REST_API_URL = `/api`;

export const TotalVisitor = async () => {
  const response = await AuthApi.get(REST_API_URL + `/visitor/total`);
  return response.data; // 방문자 수 데이터 반환
};

export const DailyVisitor = async () => {
  const response = await AuthApi.get(REST_API_URL + `/visitor/daily`);
  return response.data;
};

// 현재 날짜를 yyyy-MM-dd 형식으로 추출
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// API 호출 함수
export const DailyOrder = async () => {
  const datetime = getCurrentDate(); // 현재 날짜를 yyyy-MM-dd 형식으로 받음
  const response = await AuthApi.get(`${REST_API_URL}/order/orderCount/${datetime}`);
  return response.data;
};

// API 호출 함수
export const DailyTotalPrice = async () => {
  const datetime = getCurrentDate(); // 현재 날짜를 yyyy-MM-dd 형식으로 받음
  const response = await AuthApi.get(`${REST_API_URL}/payment/totalPrice/${datetime}`);
  return response.data;
};

export const DailyBoardCount = async () => {
  const datetime = getCurrentDate(); // 현재 날짜를 yyyy-MM-dd 형식으로 받음
  const response = await AuthApi.get(`/board/dailyCount/${datetime}`);
  return response.data;
};
