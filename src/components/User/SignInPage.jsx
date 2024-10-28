import { useState } from "react";
import { login } from "../../service/Auth";

export default function SignInPage() {
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
    <div className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <h2>로그인</h2>
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
            <button type="submit" style={{ width: "100%" }}>
              로그인
            </button>
          </div>
        </form>
        {message && <div className="alert alert-success">{message}</div>} {/* 성공 메시지 표시 */}
        {error && <div className="alert alert-danger">{error}</div>} {/* 오류 메시지 표시 */}
      </div>
    </div>
  );
}
