// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import { Button, TextField } from "@mui/material";

import styled from "styled-components";
import { signUp } from "../service/Auth";

const Container = styled.div`
padding: 60px;
margin:auto;
position:relative;
width:50%;
`;

const ButtonOverlay = styled(Button)`
left: 10px;
width: 23%;
height:56px;
`;

const ButtonContainer = styled.div`
  display: flex;         
  justify-content: center; 
  margin-top: 50px;      
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
  const [message, setMessage] = useState(""); // 성공 메시지 상태
  const [error, setError] = useState(""); // 오류 메시지 상태

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setMessage(""); // 이전 메시지 초기화
    setError(""); // 이전 오류 초기화

    signUp(values)
      .then((response) => {
        console.log(response);
        setMessage("회원가입 성공!"); // 성공 메시지 설정
        window.location.href = `/`; // 리디렉션
      })
      .catch((error) => {
        console.log(error);
        setError("회원가입에 실패했습니다."); // 오류 메시지 설정
      });
  };

  return (
    <>
      <HeaderComponent />
      <Container>
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto">
            <h4 className="mb-3">회원가입</h4>
            <form className="validation-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">이메일</label><br/>
                <TextField
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={`form-control`}
                  onChange={handleChange}
                  required
                  sx={{width:"75%"}}
                />
                 <ButtonOverlay variant="contained" onClick={()=>setAuth(true)}>인증번호 전송</ButtonOverlay>
                {/* <div className="invalid-feedback">{errors.m_email}</div> */}
               
              </div>
              {auth && (
              <div className="mb-3">
                <label htmlFor="validateNumber">인증번호</label><br/>
                <TextField
                  id="validateNumber"
                  className={`form-control`}
                  required
                  sx={{width:"75%"}}
                />
                <ButtonOverlay variant="contained">인증번호 확인</ButtonOverlay>
                {/* <div className="invalid-feedback">{errors.m_email}</div> */}
              </div>)
              }
              
              <div className="mb-3">
                <label htmlFor="pwd">비밀번호</label>
                <TextField
                  type="password"
                  id="pwd"
                  className={`form-control`}
                  onChange={handleChange}
                  required
                />
                {/* <div className="invalid-feedback">{errors.m_pwd}</div> */}
              </div>

              <div className="mb-3">
                <label htmlFor="pwd">비밀번호 확인</label>
                <TextField
                  type="password"
                  id="pwdchk"
                  className={`form-control`}
                  onChange={handleChange}
                  required
                />
                {/* <div className="invalid-feedback">{errors.m_pwd_chk}</div> */}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name">이름</label>
                  <TextField
                    id="name"
                    className={`form-control`}
                    onChange={handleChange}
                    required
                  />
                  {/* <div className="invalid-feedback">{errors.m_name}</div> */}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="nickname">닉네임</label>
                  <TextField
                    id="nickname"
                    className={`form-control`}
                    onChange={handleChange}
                    required
                  />
                  {/* <div className="invalid-feedback">{errors.m_nick}</div> */}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone">휴대폰 번호</label>
                <TextField
                  id="phone"
                  placeholder="- 없이 숫자만 입력해주세요"
                  className={`form-control`}
                  onChange={handleChange}
                  required
                />
                {/* <div className="invalid-feedback">{errors.m_phone}</div> */}
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
              <Button variant="contained" type="submit" sx={{width: '100%', height: '56px'}}>
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
