import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api";

const REST_API_URL = `${REST_API_BASE_URL}/notice`;

export const listNotices = () => axios.get(`${REST_API_URL}`);

export const createNotice = (notice) => axios.post(REST_API_URL, notice);

export const getNotice = (noticeNo) => axios.get(REST_API_URL + "/" + noticeNo);

export const updateNotice = (noticeNo, notice) => axios.put(REST_API_URL + "/update/" + noticeNo, notice);

export const deleteNotice = (noticeNo) => axios.delete(REST_API_URL + "/delete/" + noticeNo);
