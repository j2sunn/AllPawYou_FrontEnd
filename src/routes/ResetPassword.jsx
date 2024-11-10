import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import Swal from "sweetalert2";
import { resetPassword, sendResetMail, verify } from "../service/Login";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 70px;
  margin: auto;
  position: relative;
  width: 45%;
`;

const Content = styled.div`
  padding-bottom: 20px;
`;

const ButtonAdd = styled(Button)`
  width: 25%;
  height: 56px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const ValidationText = styled.span`
  color: red;
  fontsize: "0.75rem";
`;

const Error = styled.div`
  color: red;
`;

const ResetPassword = () => {
  const [auth, setAuth] = useState(false);
  const [authValid, setAuthValid] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    auth: "",
  }); // 오류 메시지 상태

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (validation()) {
      resetPassword(values.email, values.password)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "비밀번호를 변경했습니다.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const resetEmail = () => {
    const regex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(values.email.trim())) {
      sendResetMail(values.email);
      setAuth(true);
      Swal.fire({
        icon: "info",
        title: "인증번호를 전송했습니다.",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "이메일 형식에 맞게 입력해주세요.",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    }
  };

  const handleVerify = async () => {
    try {
      // API 호출
      const response = await verify(values.email, values.verify);
      // 인증 성공
      setAuthValid(true);
      setError({ ...error, auth: "" });
      Swal.fire({
        icon: "success",
        title: "인증번호가 확인되었습니다.",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    } catch (error) {
      // 인증 실패
      setAuthValid(false);
      if (error.response) {
        Swal.fire({
          icon: "warning",
          title: "인증번호 또는 이메일이 일치하지 않습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "서버 오류가 발생했습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
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
    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!regex.test(values.password.trim())) {
      obj = { ...obj, password: "영어, 숫자, 특수문자가 포함된 8 ~ 20 글자의 비밀번호를 입력해주세요." };
      valid = false;
    } else {
      obj = { ...obj, password: "" };
    }

    // passwordConfirm
    if (values.password.trim() != values.passwordConfirm.trim()) {
      obj = { ...obj, passwordConfirm: "비밀번호와 일치하지 않습니다." };
      valid = false;
    } else {
      obj = { ...obj, passwordConfirm: "" };
    }

    //인증번호 검증 로직 추가해야함
    if (!authValid) {
      obj = { ...obj, auth: "인증을 완료해주세요." };
      valid = false;
    } else {
      obj = { ...obj, auth: "" };
    }

    setError(obj);
    return valid;
  };

  return (
    <>
      <Container>
        <Content>
          <h4 style={{ marginBottom: "25px" }}>비밀번호 재설정</h4>
          <form className="validation-form" onClick={handleSubmit}>
            <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", width: "100%" }}>
              <TextField
                id="email"
                label="이메일 주소"
                className={`form-control`}
                variant="outlined"
                placeholder="'@'를 포함하여 입력해주세요'"
                sx={{ width: "72%" }}
                onChange={handleChange}
              />
              <ButtonAdd variant="contained" sx={{ height: "56px" }} onClick={resetEmail}>
                인증번호 전송
              </ButtonAdd>
            </div>
            <Error>{error.email}</Error>
            <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", width: "100%" }}>
              {auth && (
                <>
                  <TextField
                    id="verify"
                    label="인증번호"
                    className={`form-control`}
                    variant="outlined"
                    placeholder="인증번호를 입력해주세요"
                    sx={{ width: "72%" }}
                    onChange={handleChange}
                    disabled={authValid}
                  />
                  <ButtonAdd variant="contained" onClick={handleVerify} sx={{ height: "56px" }} disabled={authValid}>
                    인증번호 확인
                  </ButtonAdd>
                </>
              )}
            </div>
            <Error>{error.auth}</Error>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                id="password"
                label="새 비밀번호"
                className={`form-control`}
                type="password"
                variant="outlined"
                placeholder="비밀번호를 입력해주세요"
                sx={{ width: "100%" }}
                onChange={handleChange}
                required
              />
              <Error>{error.password}</Error>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                id="passwordConfirm"
                label="새 비밀번호 확인"
                type="password"
                variant="outlined"
                placeholder="비밀번호를 입력해주세요"
                sx={{ width: "100%" }}
                onChange={handleChange}
                required
              />
              <Error>{error.passwordConfirm}</Error>
            </div>
            <ButtonContainer>
              <Button variant="contained" sx={{ width: "100%", height: "56px", fontSize: "1.5rem" }}>
                확인
              </Button>
            </ButtonContainer>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default ResetPassword;
