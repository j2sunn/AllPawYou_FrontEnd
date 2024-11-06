import axios from "axios";

const REST_API_URL = `http://localhost:8081/api/payment`;

//결제 준비
export const paymentReady = async(data) => {
  const response = await axios.post(REST_API_URL, data);
    console.log(response.data);
    if(response.data){
      localStorage.setItem("tid", response.data.tid);
      location.href = response.data.next_redirect_pc_url;
    }
}

//결제 승인
export const paymentApprove = async(data) => {
  const response = await axios.post(REST_API_URL + "/approve", data);
  return response;
}

//결제 취소
export const paymentCancel = async(data) => {
  const response = await axios.post(REST_API_URL + "/cancel", data);
  return response;
}

export const payments = async() => {
  const response = await axios.get(REST_API_URL);
  return response.data;
}

export const paymentsByUserNo = async(userNo) => {
  const response = await axios.get(REST_API_URL + `/user/${userNo}`);
  return response;
}

