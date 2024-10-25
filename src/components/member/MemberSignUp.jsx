import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMember, getMember } from "../../service/MemberService";

const MemberSignUp = () => {
  const [m_email, setM_email] = useState("");
  const [m_name, setM_name] = useState("");
  const [m_pwd, setM_pwd] = useState("");
  const [m_nick, setM_nick] = useState("");
  const [m_phone, setM_phone] = useState("");
  const [m_address, setM_address] = useState("");
  // const m_grade = "USER";
  // const [member, setMember] = useState([]);

  const { mno } = useParams();
  const [errors, setErrors] = useState({
    m_email: "",
    m_name: "",
    m_pwd: "",
    m_nick: "",
    m_phone: "",
    m_address: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (mno) {
      getMember(mno)
        .then((response) => {
          setM_email(response.data.m_email);
          setM_name(response.data.m_name);
          setM_pwd(response.data.m_pwd);
          setM_nick(response.data.m_nick);
          setM_phone(response.data.m_phone);
          setM_address(response.data.m_address);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [mno]);

  function saveMember(e) {
    e.preventDefault();

    if (validateForm()) {
      const member = { m_email, m_name, m_pwd, m_nick, m_phone, m_address };
      console.log(member);

      createMember(member)
        .then((response) => {
          console.log(response.data);
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

    if (m_email.trim()) {
      errorsCopy.m_email = "";
    } else {
      errorsCopy.m_email = "Email is required";
      valid = false;
    }

    if (m_name.trim()) {
      errorsCopy.m_name = "";
    } else {
      errorsCopy.m_name = "Name is required";
      valid = false;
    }

    if (m_pwd.trim()) {
      errorsCopy.m_pwd = "";
    } else {
      errorsCopy.m_pwd = "Password is required";
      valid = false;
    }

    if (m_nick.trim()) {
      errorsCopy.m_nick = "";
    } else {
      errorsCopy.m_nick = "NickName is required";
      valid = false;
    }

    if (m_phone.trim()) {
      errorsCopy.m_phone = "";
    } else {
      errorsCopy.m_phone = "PhoneNumber is required";
      valid = false;
    }

    if (m_address.trim()) {
      errorsCopy.m_address = "";
    } else {
      errorsCopy.m_address = "Address is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  return (
    <div className="container">
      <div className="input-form-backgroud row">
        <div className="input-form col-md-12 mx-auto">
          <h4 className="mb-3">회원가입</h4>
          <form className="validation-form">
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
              <div className="invalid-feedback">이메일을 입력해주세요.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="pwd">비밀번호</label>
              <input
                type="password"
                id="pwd"
                placeholder=""
                value={m_pwd}
                className={`form-control ${errors.m_pwd ? "is-invalid" : ""}`}
                onChange={(e) => setM_pwd(e.target.value)}
                required
              />
              <div className="invalid-feedback">비밀번호를 입력해주세요.</div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  placeholder=""
                  value={m_name}
                  className={`form-control ${errors.m_name ? "is-invalid" : ""}`}
                  onChange={(e) => setM_name(e.target.value)}
                  required
                />
                <div className="invalid-feedback">이름을 입력해주세요.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="nickname">별명</label>
                <input
                  type="text"
                  id="nickname"
                  placeholder=""
                  value={m_nick}
                  className={`form-control ${errors.m_nick ? "is-invalid" : ""}`}
                  onChange={(e) => setM_nick(e.target.value)}
                  required
                />
                <div className="invalid-feedback">별명을 입력해주세요.</div>
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
              <div className="invalid-feedback">주소를 입력해주세요.</div>
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
              <div className="invalid-feedback">전화번호를 입력해주세요.</div>
            </div>

            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="aggrement" required />
              <label className="custom-control-label" htmlFor="aggrement">
                개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
            <div className="mb-4"></div>
            <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={saveMember}>
              가입 완료
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberSignUp;
