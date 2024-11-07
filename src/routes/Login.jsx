import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import FooterComponent from "../components/common/FooterComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import { SiKakaotalk } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { login, fetchKakaoOAuth, autoLogin } from "../service/Login";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginContainer = styled.div`
  text-align: center;
  padding-top: 100px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Content = styled.div`
  padding: 20px 0;
`;
const Icons = styled.div`
  margin: 2rem 0;
  width: 10%;
  display: flex;
  justify-content: space-between;
`;

const Links = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    login(values)
      .then((response) => {
        localStorage.setItem("no", response.no);
        localStorage.setItem("role", response.role);
        localStorage.setItem("email", response.email);
        localStorage.setItem("username", response.username);
        localStorage.setItem("nickname", response.nickname);
        localStorage.setItem("intro", response.intro);
        localStorage.setItem("tokenType", response.tokenType);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        window.location.href = `/`; // 리디렉션
      })
      .catch((error) => {
        console.log(error);
        alert("로그인 실패:", error);
      });
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <>
      <LoginContainer>
        <h3>통합 로그인</h3>
        <form onSubmit={handleSubmit}>
          <Content>
            <TextField
              onChange={handleChange}
              label="이메일"
              id="email"
              variant="outlined"
              value={values.email}
              placeholder="abc@email.com"
              sx={{ width: "350px", paddingBottom: "10px" }}
            />
            <br />
            <TextField
              onChange={handleChange}
              type="password"
              label="비밀번호"
              id="password"
              value={values.password}
              variant="outlined"
              sx={{ width: "350px" }}
            />
          </Content>
          <div>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#527853", width: "350px", height: "40px", marginBottom: "1rem", fontSize: "1.2rem" }}
            >
              로그인
            </Button>
          </div>
        </form>
        <div style={{ paddingBottom: "50px" }}>
          <Links href="/findEmail">이메일 찾기</Links> |<Links href="/resetPwd"> 비밀번호 재설정</Links> |<Links href="/signup"> 회원가입</Links>
        </div>
        <span style={{ fontSize: "20px" }}>소셜 로그인</span>
        <hr style={{ width: "350px", margin: "0 auto" }} />
        <Icons>
          <Button onClick={fetchKakaoOAuth}>
            <SiKakaotalk size={40} style={{ color: "#F7E600" }} />
          </Button>
          <Button href="/signup">
            <FcGoogle size={40} />
          </Button>
        </Icons>
      </LoginContainer>
    </>
  );
}
