import { AuthApi } from "./AuthApi";

const REST_API_URL = `/api`;

// 현재 날짜를 yyyy-MM-dd 형식으로 추출
const getDatesForRevenue = (numDays = 5) => {
  const today = new Date();

  // 일별 수익 날짜
  const dailyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i); // 오늘로부터 i일 전
    dailyDates.push(getCurrentDate(date));
  }

  // 주간 수익 날짜 (최근 5주)
  const weeklyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 7); // 오늘로부터 i주 전
    weeklyDates.push(getCurrentDate(date));
  }

  // 최근 14일 동안의 날짜를 배열에 저장
  const twoWeeklyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 14); // 오늘로부터 i일 전
    twoWeeklyDates.push(getCurrentDate(date));
  }

  // 월간 수익 날짜 (최근 5개월)
  const monthlyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i); // 오늘로부터 i개월 전
    monthlyDates.push(getCurrentDate(date));
  }

  return {
    dailyDates,
    weeklyDates,
    twoWeeklyDates,
    monthlyDates,
  };
};

// 날짜 형식 변환 함수
const getCurrentDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
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
  console.log(datetime);

  const response = await AuthApi.get(`/api/order/orderCount/${datetime}`);
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

// 일일 그래프 주문
export const graphDailyOrder = async (dates) => {
  const orders = [];

  for (const date of dates) {
    try {
      const response = await AuthApi.get(`${REST_API_URL}/order/orderCount/${date}`);
      orders.push({ date, count: response.data }); // 날짜와 주문 수를 객체로 저장
    } catch (error) {
      console.error(`Error fetching order count for ${date}:`, error);
      orders.push({ date, count: null }); // 에러 발생 시 null 저장
    }
  }

  return orders; // 날짜와 주문 수의 배열 반환
};

// 일일 게시글 등록 수 그래프
export const graphDailyBoardCount = async (dates) => {
  const boardCounts = [];

  for (const date of dates) {
    try {
      const response = await AuthApi.get(`/board/dailyCount/${date}`);
      boardCounts.push({ date, count: response.data }); // 날짜와 등록 수를 객체로 저장
    } catch (error) {
      console.error(`Error fetching board count for ${date}:`, error);
      boardCounts.push({ date, count: null }); // 에러 발생 시 null 저장
    }
  }

  return boardCounts; // 날짜와 등록 수의 배열 반환
};

// 일일 수익 그래프
export const graphDailyTotalPrice = async (dates) => {
  const totalPrices = [];

  for (const date of dates) {
    try {
      const response = await AuthApi.get(`${REST_API_URL}/payment/totalPrice/${date}`);
      totalPrices.push({ date, totalPrice: response.data }); // 날짜와 수익을 객체로 저장
    } catch (error) {
      console.error(`Error fetching total price for ${date}:`, error);
      totalPrices.push({ date, totalPrice: null }); // 에러 발생 시 null 저장
    }
  }

  return totalPrices; // 날짜와 수익의 배열 반환
};
