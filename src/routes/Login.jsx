import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import FooterComponent from "../components/common/FooterComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import { SiKakaotalk } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { login } from "../service/Auth";
import { useState, useEffect } from "react";

const LoginContainer = styled.div`
  text-align: center;
  padding-top: 100px;
  height: 600px;
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
  const [message, setMessage] = useState(""); // 메시지 상태 추가
  const [error, setError] = useState(""); // 오류 메시지 상태 추가

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setMessage(""); // 이전 메시지 초기화
    setError(""); // 이전 오류 초기화

    login(values)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("tokenType", response.tokenType);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        setMessage("로그인 성공!"); // 성공 메시지 설정
        window.location.href = `/`; // 리디렉션
      })
      .catch((error) => {
        console.log(error);
        setError("로그인에 실패했습니다."); // 오류 메시지 설정
      });
  };

  return (
    <>
      <HeaderComponent />
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
            <Button variant="contained" type="submit" sx={{ backgroundColor: "#527853", width: "350px", height: "40px", marginBottom: "3rem" }}>
              로그인
            </Button>
          </div>
        </form>
        <span>소셜 로그인</span>
        <hr style={{ width: "350px", margin: "0 auto" }} />
        <Icons>
          <a href="/signup">
            <SiKakaotalk size={40} style={{ color: "yellow" }} />
          </a>
          <a href="/signup">
            <FcGoogle size={40} />
          </a>
        </Icons>

        <div>
          <Links href="/findEmail">이메일 찾기</Links> |<Links href="/resetPwd"> 비밀번호 재설정</Links> |<Links href="/signup"> 회원가입</Links>
        </div>
      </LoginContainer>
      <FooterComponent />
    </>
  );
}
