import axios from "axios";
// import { AuthApi } from "./Auth";

const REST_API_BASE_URL =  'http://localhost:8081/board';
export const uploadBoard = (formData)=>axios.post(REST_API_BASE_URL+"/insert",formData,{
    headers: {
        'Content-Type': 'multipart/form-data'//,
        // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    }
    // AuthApi.get
});


