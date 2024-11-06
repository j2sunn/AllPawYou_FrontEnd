import axios from "axios";
import { AuthApi } from "./AuthApi";

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
      alert(err.response?.data?.message);
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

/** verifyCode API */
export const verify = async (inputEmail, verify) => {
  // http://localhost:8081/api/email/verify?inputEmail=hyuk6589@naver.com&verify=MGIhm654
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
    alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
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
        localStorage.setItem("tokenType", response.data.tokenType);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        // 이후의 API 요청에 토큰을 추가하기 위한 Axios 설정
        AuthApi.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

        // 로그인 성공 후 페이지 이동
        window.location.href = "/"; // 원하는 경로로 이동
      } catch (error) {
        alert("로그인 실패:", error);
      }
    };
    login();
  }
};
