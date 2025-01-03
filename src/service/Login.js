import axios from "axios";
import { AuthApi } from "./AuthApi";
import Swal from "sweetalert2";

// AuthApi.get("/api/v1/user")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

/** LOGIN API */
export const login = async ({ email, password }) => {
  try {
    const data = { email, password };
    const response = await AuthApi.post(`/api/v1/auth/login`, data);
    return response.data;
  } catch (err) {
    if (err?.response) {
      console.error(err);
    }
  }
};

/** SIGNUP API */
export const signUp = async ({ email, username, password, nickname, phone, address }) => {
  const data = { email, username, password, nickname, phone, address };
  const response = await AuthApi.post(`/api/v1/auth/signup`, data);
  return response.data;
};

/** sendMail API */
export const sendMail = (email) => axios.post("http://localhost:8081/api/email?email=" + email);

/** sendResetMail API */
//http://localhost:8081/api/email/resetPassword?email=hyuk6589@naver.com
export const sendResetMail = (email) => axios.post(`http://localhost:8081/api/email/resetPassword?email=${email}`);

/** resetPassword API */
export const resetPassword = async (email, password) => {
  //http://localhost:8081/api/v2/users/resetPwdByEmail?email=g@g.com&password=1234
  const response = await AuthApi.put(`/api/v2/users/resetPwdByEmail?email=${email}&password=${password}`);
  return response.data;
};

/** update password on Mypage */
export const updateOnMypage = async (email, current, change) => {
  //http://localhost:8081/api/v2/users/updateOnMypage?email=g@g.com&current=1234&change=qwer
  const response = await AuthApi.put(`/api/v2/users/updateOnMypage?email=${email}&current=${current}&change=${change}`);
  return response.data;
};

/** verifyCode API */
// http://localhost:8081/api/email/verify?inputEmail=hyuk6589@naver.com&verify=74Hd8GDf
export const verify = async (inputEmail, verify) => {
  const response = await AuthApi.post(`/api/email/verify?inputEmail=${inputEmail}&verify=${verify}`); // 인증번호 전송
  return response.data;
};

export const fetchKakaoOAuth = async () => {
  try {
    // 카카오 API 호출
    const redirectUrl =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=c7295acd0ab98802d00391b7dda370c5&redirect_uri=http://localhost:8081/api/v3/kakao/callback&prompt=login";

    // 리다이렉트
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error fetching Kakao OAuth URL:", error);
    Swal.fire({
      icon: "error",
      title: "카카오 로그인에 실패했습니다. 다시 시도해주세요.",
      confirmButtonColor: "#527853",
      confirmButtonText: "닫기",
    });
  }
};

export const autoLogin = async () => {
  // URL 파라미터에서 액세스 토큰, 이메일, 비밀번호를 가져옵니다.
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  if (email) {
    // 자동 로그인 요청
    const login = async () => {
      try {
        const response = await AuthApi.post(`/api/v3/kakao/login`, { email });
        // console.log(response.data);

        // 토큰을 localStorage에 저장
        localStorage.setItem("no", response.data.no);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("intro", response.data.intro);
        localStorage.setItem("phone", response.data.phone);
        localStorage.setItem("address", response.data.address);
        localStorage.setItem("profile", response.data.profile);

        localStorage.setItem("tokenType", response.data.tokenType);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        // 이후의 API 요청에 토큰을 추가하기 위한 Axios 설정
        AuthApi.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

        // 로그인 성공 후 페이지 이동
        window.location.href = "/"; // 원하는 경로로 이동
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
        console.log(error);
      }
    };
    login();
  }
};
