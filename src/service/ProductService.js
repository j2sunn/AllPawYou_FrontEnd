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


export const getProductByProductId = async (id) => {

    try {
        const response = await axios.get(`${REST_API_BASE_URL}/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': token ? `Bearer ${token}` : '' // 인증이 필요하면 헤더에 JWT 토큰 포함
            }
        });
        console.log("getProductByProductId" , response.data);  // 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
        throw error;  // 에러를 상위 함수로 전달
    }
};

export const updateProduct = (id, formData) => axios.post(`${REST_API_BASE_URL}/update/${id}`, formData,
     {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : '' // 인증이 필요하면 헤더에 JWT 토큰 포함
    }
});

export const DeleteProduct = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`,{
    headers:{
        'Authorization': token ? `Bearer ${token}` : ''
    }
});


//유저 별 장바구니 목록
export const listCart = async(userNo) => {
    const response = await axios.get(REST_API_BASE_URL + `/cart/${userNo}`);
    return response.data;
}


//장바구니 삭제
export const deleteCart = async(cartNo) => {
    const response = await axios.delete(REST_API_BASE_URL + `/cart/${cartNo}`);
    return response;
}