import axios from "axios";
import { AuthApi, AuthUploadApi } from "./AuthApi";

const REST_API_URL = `http://localhost:8081/api/shopping`;

const REST_API_BASE_URL = "/api/shopping";
const token = localStorage.getItem("accessToken");

export const addProduct = (formData) => AuthUploadApi.post(REST_API_BASE_URL + "/addProduct", formData);

export const listProducts = () => AuthApi.get(REST_API_BASE_URL);

export const getProductByProductId = async (id) => {
  try {
    const response = await AuthApi.get(`${REST_API_BASE_URL}/${id}`);
    console.log("getProductByProductId", response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error("데이터를 가져오는 중 에러 발생:", error);
    throw error; // 에러를 상위 함수로 전달
  }
};

export const getProductsByCategory = async (category) => {
    try{
        const response = await AuthApi.get(`${REST_API_BASE_URL}/list/${category}`);
        console.log("getProductsByCategory", response.data); // 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
        throw error; // 에러를 상위 함수로 전달
    }
}

export const updateProduct = (id, formData) =>
    AuthUploadApi.post(`${REST_API_BASE_URL}/update/${id}`, formData);

export const DeleteProduct = (id) =>
    AuthApi.delete(`${REST_API_BASE_URL}/delete/${id}`);

export const DeleteProduct = (id) => AuthApi.delete(`${REST_API_BASE_URL}/delete/${id}`);

export const addCart = async (data) => {
  const response = await axios.post(REST_API_URL + `/cart`, data);
  console.log(response);
};

//유저 별 장바구니 목록
export const listCart = async (userNo) => {
  const response = await AuthApi.get(REST_API_BASE_URL + `/cart/${userNo}`);
  return response.data;
};

//장바구니 삭제
export const deleteCart = (cartId) => axios.delete(REST_API_URL + `/cart/${cartId}`);

// 이름으로 상품 찾기
export const findByName = async (orderName) => {
  const response = await AuthApi.get(REST_API_BASE_URL + `/name/${orderName}`);
  return response;
};
