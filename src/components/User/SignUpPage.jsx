import { useState } from "react";
import { signUp } from "../../service/Auth";

export default function SignUpPage() {
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
    <div className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <h2>회원가입</h2>
      <div className="align-self-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ minWidth: "25vw" }}>
            <label htmlFor="email">아이디</label>
            <input type="text" className="form-control" id="email" onChange={handleChange} value={values.email} />
          </div>
          <div className="form-group" style={{ minWidth: "25vw" }}>
            <label htmlFor="password">비밀번호</label>
            <input type="password" className="form-control" id="password" onChange={handleChange} value={values.password} />
          </div>
          <div className="form-group" style={{ minWidth: "25vw" }}>
            <label htmlFor="username">유저이름</label>
            <input type="text" className="form-control" id="username" onChange={handleChange} value={values.username} />
          </div>
          <div className="form-group" style={{ minWidth: "25vw" }}>
            <label htmlFor="nickname">닉네임</label>
            <input type="text" className="form-control" id="nickname" onChange={handleChange} value={values.nickname} />
          </div>
          <div className="form-group" style={{ minWidth: "25vw" }}>
            <label htmlFor="phone">전화번호</label>
            <input type="text" className="form-control" id="phone" onChange={handleChange} value={values.phone} />
          </div>
          <div className="form-group" style={{ minWidth: "25vw" }}>
            <label htmlFor="address">주소</label>
            <input type="text" className="form-control" id="address" onChange={handleChange} value={values.address} />
          </div>
          <div className="form-group" style={{ minWidth: "25vw" }}>
            <button type="submit" style={{ width: "100%" }}>
              회원가입
            </button>
          </div>
        </form>
        {message && <div className="alert alert-success">{message}</div>} {/* 성공 메시지 표시 */}
        {error && <div className="alert alert-danger">{error}</div>} {/* 오류 메시지 표시 */}
      </div>
    </div>
  );
}
