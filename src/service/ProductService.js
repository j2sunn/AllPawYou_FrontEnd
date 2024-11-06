import axios from "axios";
// import { AuthApi } from "./Auth";

const REST_API_BASE_URL =  'http://localhost:8081/api/shopping';
const token = localStorage.getItem('accessToken'); 

export const addProduct = (formData)=>axios.post(REST_API_BASE_URL + "/addProduct",formData,{
    headers: {
        'Content-Type': 'multipart/form-data'//,
        // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    }
    // AuthApi.get
});

export const listProducts = () => axios.get(REST_API_BASE_URL);

// export const getProductByProductId = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);
export const getProductByProductId = (id) => axios.get(REST_API_BASE_URL + "/"+ id, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : '' // 인증이 필요하면 헤더에 JWT 토큰 포함
    }
});


