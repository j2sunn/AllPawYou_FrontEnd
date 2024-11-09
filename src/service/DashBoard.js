import { AuthApi } from "./AuthApi";

const REST_API_URL = `/api`;

// 현재 날짜를 yyyy-MM-dd 형식으로 추출
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 누적 방문자
export const TotalVisitor = async () => {
  const response = await AuthApi.get(REST_API_URL + `/visitor/total`);
  return response.data; // 방문자 수 데이터 반환
};

// 일일 방문자
export const DailyVisitor = async () => {
  const response = await AuthApi.get(REST_API_URL + `/visitor/daily`);
  return response.data;
};

// 누적 주문
export const TotalOrder = async () => {
  const response = await AuthApi.get(`${REST_API_URL}/order/totalCount`);
  return response.data;
};

// 일일 주문
export const DailyOrder = async () => {
  const datetime = getCurrentDate(); // 현재 날짜를 yyyy-MM-dd 형식으로 받음
  const response = await AuthApi.get(`${REST_API_URL}/order/orderCount/${datetime}`);
  return response.data;
};

// 누적 수익
export const TotalPrice = async () => {
  const response = await AuthApi.get(`${REST_API_URL}/payment/totalPriceSum`);
  return response.data;
};

// 일일 수익
export const DailyTotalPrice = async () => {
  const datetime = getCurrentDate(); // 현재 날짜를 yyyy-MM-dd 형식으로 받음
  const response = await AuthApi.get(`${REST_API_URL}/payment/totalPrice/${datetime}`);
  return response.data;
};

//누적 등록수
export const TotalBoardCount = async () => {
  const response = await AuthApi.get(`/board/totalCount`);
  return response.data;
};

// 일일 등록수
export const DailyBoardCount = async () => {
  const datetime = getCurrentDate(); // 현재 날짜를 yyyy-MM-dd 형식으로 받음
  const response = await AuthApi.get(`/board/dailyCount/${datetime}`);
  return response.data;
};
