import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
  },
});

/** LOGIN API */
export const login = async ({ email, password }) => {
  const data = { email, password };
  const response = await AuthApi.post(`/api/v1/auth/login`, data);
  return response.data;
};

/** SIGNUP API */
export const signUp = async ({ email, username, password, nickname, phone, address }) => {
  const data = { email, username, password, nickname, phone, address };
  const response = await AuthApi.post(`/api/v1/auth/signup`, data);
  return response.data;
};
