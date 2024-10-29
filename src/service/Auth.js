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

/** sendMail API */
export const sendMail = (email) => axios.post("http://localhost:8081/api/email?email=" + email);

/** verifyCode API */
export const verify = async (inputEmail, verify) => {
  // http://localhost:8081/api/email/verify?inputEmail=hyuk6589@naver.com&verify=MGIhm654
  const response = await AuthApi.post(`/api/email/verify?inputEmail=${inputEmail}&verify=${verify}`); // 인증번호 전송
  return response.data;
};
