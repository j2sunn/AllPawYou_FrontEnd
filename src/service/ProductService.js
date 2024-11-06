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


