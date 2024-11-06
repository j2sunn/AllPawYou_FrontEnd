
import axios from "axios";

const REST_API_URL = `http://localhost:8081/api/order`;

export const orderList = async() => {
  const response = await axios.get(REST_API_URL);
  return response.data;
}

export const orderListByTid = async(tid) => {
  const response = await axios.get(REST_API_URL + `/${tid}`);
  return response.data;
}