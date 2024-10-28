import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMember } from "../../service/MemberService";
import HeaderComponent from "../common/HeaderComponent";
import FooterComponent from "../common/FooterComponent";

import styled from "styled-components";

const MemberSignUp = () => {
  const [m_email, setM_email] = useState("");
  const [m_name, setM_name] = useState("");
  const [m_pwd, setM_pwd] = useState("");
  const [m_nick, setM_nick] = useState("");
  const [m_phone, setM_phone] = useState("");
  const [m_address, setM_address] = useState("");

  const [errors, setErrors] = useState({
    m_email: "",
    m_name: "",
    m_pwd: "",
    m_nick: "",
    m_phone: "",
    m_address: "",
  });

  const navigator = useNavigate();

  function saveMember(e) {
    e.preventDefault();

    if (validateForm()) {
      const member = { m_email, m_name, m_pwd, m_nick, m_phone, m_address };
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

    if (!m_address.trim()) {
      errorsCopy.m_address = "Address is required";
      valid = false;
    } else {
      errorsCopy.m_address = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  const Container = styled.div`
 padding: 50px;
  `;

  return (
    <>
      <HeaderComponent />
      <Container>
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto">
            <h4 className="mb-3">회원가입</h4>
            <form className="validation-form" onSubmit={saveMember}>
              <div className="mb-3">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={m_email}
                  className={`form-control ${errors.m_email ? "is-invalid" : ""}`}
                  onChange={(e) => setM_email(e.target.value)}
                  required
                />
                <div className="invalid-feedback">{errors.m_email}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="pwd">비밀번호</label>
                <input
                  type="password"
                  id="pwd"
                  value={m_pwd}
                  className={`form-control ${errors.m_pwd ? "is-invalid" : ""}`}
                  onChange={(e) => setM_pwd(e.target.value)}
                  required
                />
                <div className="invalid-feedback">{errors.m_pwd}</div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    value={m_name}
                    className={`form-control ${errors.m_name ? "is-invalid" : ""}`}
                    onChange={(e) => setM_name(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{errors.m_name}</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="nickname">별명</label>
                  <input
                    type="text"
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
                <label htmlFor="address">주소</label>
                <input
                  type="text"
                  id="address"
                  placeholder="서울특별시 강남구"
                  value={m_address}
                  className={`form-control ${errors.m_address ? "is-invalid" : ""}`}
                  onChange={(e) => setM_address(e.target.value)}
                  required
                />
                <div className="invalid-feedback">{errors.m_address}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone">전화번호</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="010-1234-5678"
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
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                가입 완료
              </button>
            </form>
          </div>
        </div>
      </Container>
      <FooterComponent />
    </>
  );
};

export default MemberSignUp;
