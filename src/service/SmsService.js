import axios from "axios";

const REST_API_BASE_URL =  'http://localhost:8080/sms/findMem';
export const findMem = (member)=>axios.post(REST_API_BASE_URL,member);//동일이름 동일휴대폰멤버가 있는지 확인
export const sendSMS=(member)=>axios.post(REST_API_BASE_URL+'/sendSMS',member);

export const verifySMS = (authNum)=>axios.get(REST_API_BASE_URL+'/verifySMS/'+authNum);

export const findEmail = (phone)=>axios.get(REST_API_BASE_URL+'/findEmail/'+phone);