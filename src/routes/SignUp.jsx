// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import { Button, TextField } from "@mui/material";

import styled from "styled-components";
import { signUp, sendMail, verify } from "../service/Auth";
import axios from "axios";

const Container = styled.div`
  padding: 60px;
  margin: auto;
  position: relative;
  width: 50%;
`;

const ButtonOverlay = styled(Button)`
  width: 23%;
  height: 56px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Error = styled.div`
  color: red;
`;

const SignUp = () => {
  const [auth, setAuth] = useState(false);
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    nickname: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    nickname: "",
    phone: "",
  }); // 오류 메시지 상태

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (validation()) {
      signUp(values)
        .then((response) => {
          window.location.href = `/login`; // 리디렉션
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendEmail = () => {
    const regex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(values.email.trim())) {
      sendMail(values.email);
      setAuth(true);
      alert("인증번호를 전송했습니다.");
    } else {
      alert("이메일 형식에 맞게 입력해주세요.");
    }
  }

  const handleVerify = async () => {
    try {
      // API 호출
      const response = await verify(values.email, values.verify);
      // 인증 성공
      alert("인증번호가 확인되었습니다.");
    } catch (error) {
      // 인증 실패
      if (error.response) {
        alert("인증번호 또는 이메일이 일치하지 않습니다.");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    }
  };

  const validation = () => {
    let valid = true;
    let obj = {};

    // email
    let regex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regex.test(values.email.trim())) {
      obj = { ...obj, email: "이메일이 형식에 맞지 않습니다." };
      valid = false;
    } else {
      obj = { ...obj, email: "" };
    }

    // password
    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/i;
    if (!regex.test(values.password.trim())) {
      obj = { ...obj, password: "영어, 숫자, 특수문자가 포함된 8 ~ 20 글자 사이로 입력해주세요." };
      valid = false;
    } else {
      obj = { ...obj, password: "" };
    }

    // passwordConfirm
    if (values.password.trim() != values.passwordConfirm.trim()) {
      obj = { ...obj, passwordConfirm: "비밀번호와 일치하지 않습니다." };
    }

    // nickname
    regex = /^[가-힣A-Za-z0-9]{2,10}$/i;
    if (!regex.test(values.nickname.trim())) {
      obj = { ...obj, nickname: "2 ~ 10 글자 사이로 입력해주세요." };
      valid = false;
    } else {
      obj = { ...obj, nickname: "" };
    }

    // phone
    regex = /^01[0-9]{9}$/i;
    if (!regex.test(values.phone.trim())) {
      obj = { ...obj, phone: "휴대폰 번호를 - 없이 입력하세요." };
      valid = false;
    } else {
      obj = { ...obj, phone: "" };
    }
    setError(obj);

    //인증번호 검증 로직 추가해야함

    return valid;
  };

  return (
    <>
      <HeaderComponent />
      <Container>
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto">
            <h4 className="mb-3">회원가입</h4>
            <form className="validation-form" onSubmit={handleSubmit}>
              <label htmlFor="email">이메일</label>
              <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <TextField
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={`form-control`}
                  onChange={handleChange}
                  required
                  sx={{ width: "75%" }}
                />
                <ButtonOverlay
                  variant="contained"
                  onClick={sendEmail} style={{left:'9px'}}> 
                  인증번호 전송
                </ButtonOverlay>
                <Error>{error.email}</Error>
              </div>
              {auth && (
                <div>
                  <label htmlFor="verify">인증번호</label>
                  <div className="mb-3" style={{ display: 'flex',  justifyContent: 'space-between', width: '100%'}}>
                    <TextField id="verify" onChange={handleChange} className={`form-control`} required sx={{ width: "75%" }} />
                    <ButtonOverlay
                      variant="contained"
                      onClick={() => {
                        handleVerify();
                        setAuth(true);}
                      }
                    >
                      인증번호 확인
                    </ButtonOverlay>
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="password">비밀번호</label>
                <TextField type="password" id="password" className={`form-control`} onChange={handleChange} required />
                <Error>{error.password}</Error>
              </div>

              <div className="mb-3">
                <label htmlFor="passwordConfirm">비밀번호 확인</label>
                <TextField type="password" id="passwordConfirm" className={`form-control`} onChange={handleChange} required />
                <Error>{error.passwordConfirm}</Error>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="username">이름</label>
                  <TextField id="username" className={`form-control`} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="nickname">닉네임</label>
                  <TextField id="nickname" className={`form-control`} onChange={handleChange} required />
                  <Error>{error.nickname}</Error>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone">휴대폰 번호</label>
                <TextField id="phone" placeholder="- 없이 숫자만 입력해주세요" className={`form-control`} onChange={handleChange} required />
                <Error>{error.phone}</Error>
              </div>

              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="aggrement" required />
                <label className="custom-control-label" htmlFor="aggrement">
                  개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>
              <div className="mb-4"></div>
              <ButtonContainer>
                <Button variant="contained" type="submit" sx={{ width: "100%", height: "56px", fontSize: "1.5rem" }}>
                  회원 가입
                </Button>
              </ButtonContainer>
            </form>
          </div>
        </div>
      </Container>
      <FooterComponent />
    </>
  );
};

export default SignUp;
