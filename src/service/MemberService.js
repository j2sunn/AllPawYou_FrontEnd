import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api";

const REST_API_URL = `${REST_API_BASE_URL}/member`;

export const listMembers = () => axios.get(`${REST_API_URL}`);

export const createMember = (member) => axios.post(REST_API_URL, member);

export const getMember = (mno) => axios.get(REST_API_URL + "/" + mno);

export const updateMember = (mno, member) => axios.put(REST_API_URL + "/update/" + mno, member);

export const deleteMember = (mno) => axios.delete(REST_API_URL + "/delete/" + mno);
