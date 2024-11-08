import { AuthApi } from "./AuthApi";

const REST_API_URL = `/api/order`;

export const orderList = async () => {
  const response = await AuthApi.get(REST_API_URL);
  return response.data;
};

export const orderListByTid = async (tid) => {
  const response = await AuthApi.get(REST_API_URL + `/${tid}`);
  return response.data;
};
