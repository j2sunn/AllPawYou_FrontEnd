import axios from "axios";
// import { AuthApi } from "./Auth";

const REST_API_BASE_URL =  'http://localhost:8081/api/shopping';

export const addProduct = (formData)=>axios.post(REST_API_BASE_URL + "/addProduct",formData,{
    headers: {
        'Content-Type': 'multipart/form-data'//,
        // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    }
    // AuthApi.get
});

export const listProducts = () => axios.get(REST_API_BASE_URL);

//유저 별 장바구니 목록
export const listCart = async(userNo) => {
    const response = await axios.get(REST_API_BASE_URL + `/cart/${userNo}`);
    return response;
}

//장바구니 삭제
export const deleteCart = async(cartNo) => {
    const response = await axios.delete(REST_API_BASE_URL + `/cart/${cartNo}`);
    return response;
}