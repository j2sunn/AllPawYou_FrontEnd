import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN_TYPE + " " + ACCESS_TOKEN,
  },
});

export const AuthUploadApi = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: TOKEN_TYPE + " " + ACCESS_TOKEN,
  },
});
