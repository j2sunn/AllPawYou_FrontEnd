import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const UserApi = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    REFRESH_TOKEN: REFRESH_TOKEN,
  },
});
// 토큰 갱신
const refreshAccessToken = async () => {
  const response = await UserApi.get(`/api/v1/auth/refresh`);
  ACCESS_TOKEN = response.data;
  localStorage.setItem("accessToken", ACCESS_TOKEN);
  UserApi.defaults.headers.common["Authorization"] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
};

// 토큰 유효성 검사
UserApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      await refreshAccessToken();
      return UserApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

/** 회원조회 API */
export const fetchUser = async () => {
  const response = await UserApi.get(`/api/v1/user`);
  return response.data;
};

/** 회원번호로 회원조회 API */
export const fetchUserByNo = async (userNo) => {
  const response = await UserApi.get(`/api/v1/user/${userNo}`);
  return response.data;
};

/** 회원수정 API */
export const updateUser = async (FormData) => {
  const response = await UserApi.put(`/api/v1/user`, FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
      REFRESH_TOKEN: REFRESH_TOKEN,
    },
  });
  console.log("updateUser 데이터 : ", response.data);
  return response.data;
};

/** 회원탈퇴 API */
export const deleteUser = async () => {
  await UserApi.delete(`/api/v1/user`);
};

// 방문자 카운터
export const customerCount = async () => {
  await axios.get(`http://localhost:8081/api/visitor`);
};
