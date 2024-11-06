import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api";

const REST_API_URL = `${REST_API_BASE_URL}/payment`;

export const paymentReady = async(data) => {
  const response = await axios.post(REST_API_URL, data);
    console.log(response.data);
    if(response.data){
      localStorage.setItem("tid", response.data.tid);
      location.href = response.data.next_redirect_pc_url;
    }
}

export const paymentApprove = async(data) => {
  const response = await axios.post("http://localhost:8081/api/payment/approve", data);
  return response;
}