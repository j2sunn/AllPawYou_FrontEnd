// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMember } from "../service/MemberService";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import { Button, TextField } from "@mui/material";

import styled from "styled-components";

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
  const [m_email, setM_email] = useState("");
  const [m_name, setM_name] = useState("");
  const [m_pwd, setM_pwd] = useState("");
  const [m_pwd_chk, setM_pwd_chk] = useState("");
  const [m_nick, setM_nick] = useState("");
  const [m_phone, setM_phone] = useState("");

  const [errors, setErrors] = useState({
    m_email: "",
    m_name: "",
    m_pwd: "",
    m_pwd_chk:"",
    m_nick: "",
    m_phone: "",
  });

  const navigator = useNavigate();

  function saveMember(e) {
    e.preventDefault();

    if (validateForm()) {
      const member = { m_email, m_name, m_pwd, m_nick, m_phone };
      console.log(member);

      createMember(member)
        .then(() => {
          navigator("/admin/memberList");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!m_email.trim()) {
      errorsCopy.m_email = "Email is required";
      valid = false;
    } else {
      errorsCopy.m_email = "";
    }

    if (!m_name.trim()) {
      errorsCopy.m_name = "Name is required";
      valid = false;
    } else {
      errorsCopy.m_name = "";
    }

    if (!m_pwd.trim()) {
      errorsCopy.m_pwd = "Password is required";
      valid = false;
    } else {
      errorsCopy.m_pwd = "";
    }

    if (!m_nick.trim()) {
      errorsCopy.m_nick = "NickName is required";
      valid = false;
    } else {
      errorsCopy.m_nick = "";
    }

    if (!m_phone.trim()) {
      errorsCopy.m_phone = "PhoneNumber is required";
      valid = false;
    } else {
      errorsCopy.m_phone = "";
    }

    if (!m_pwd_chk.trim()) {
      errorsCopy.m_pwd_chk = "Password check is required";
      valid = false;
    } else {
      errorsCopy.m_pwd_chk = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <>
      <HeaderComponent />
      <Container>
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto">
            <h4 className="mb-3">회원가입</h4>
            <form className="validation-form" onSubmit={saveMember}>
              <div className="mb-3">
                <label htmlFor="email">이메일</label><br/>
                <TextField
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={m_email}
                  className={`form-control ${errors.m_email ? "is-invalid" : ""}`}
                  onChange={(e) => setM_email(e.target.value)}
                  required
                  sx={{width:"75%"}}
                />
                 <ButtonOverlay variant="outlined">인증번호 전송</ButtonOverlay>
                <div className="invalid-feedback">{errors.m_email}</div>
               
              </div>
              <div className="mb-3">
                <label htmlFor="validateNumber">인증번호</label><br/>
                <TextField
                  id="validateNumber"
                  className={`form-control ${errors.m_email ? "is-invalid" : ""}`}
                  required
                  sx={{width:"75%"}}
                />
                <ButtonOverlay variant="outlined">인증번호 확인</ButtonOverlay>
                <div className="invalid-feedback">{errors.m_email}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="pwd">비밀번호</label>
                <TextField
                  type="password"
                  id="pwd"
                  value={m_pwd}
                  className={`form-control ${errors.m_pwd ? "is-invalid" : ""}`}
                  onChange={(e) => setM_pwd(e.target.value)}
                  required
                />
                <div className="invalid-feedback">{errors.m_pwd}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="pwd">비밀번호 확인</label>
                <TextField
                  type="password"
                  id="pwd"
                  value={m_pwd_chk}
                  className={`form-control ${errors.m_pwd_chk ? "is-invalid" : ""}`}
                  onChange={(e) => setM_pwd_chk(e.target.value)}
                  required
                />
                <div className="invalid-feedback">{errors.m_pwd_chk}</div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name">이름</label>
                  <TextField
                    id="name"
                    value={m_name}
                    className={`form-control ${errors.m_name ? "is-invalid" : ""}`}
                    onChange={(e) => setM_name(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{errors.m_name}</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="nickname">닉네임</label>
                  <TextField
                    id="nickname"
                    value={m_nick}
                    className={`form-control ${errors.m_nick ? "is-invalid" : ""}`}
                    onChange={(e) => setM_nick(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{errors.m_nick}</div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone">휴대폰 번호</label>
                <TextField
                  id="phone"
                  placeholder="- 없이 숫자만 입력해주세요"
                  value={m_phone}
                  className={`form-control ${errors.m_phone ? "is-invalid" : ""}`}
                  onChange={(e) => setM_phone(e.target.value)}
                  required
                />
                <div className="invalid-feedback">{errors.m_phone}</div>
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
              <Button variant="contained" type="submit">
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
