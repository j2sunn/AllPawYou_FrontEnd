import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import Swal from "sweetalert2";
import { updateOnMypage } from "../../service/Login";
import MypageSideBar from "../../components/common/MypageSideBar";

const ChangePassword = () => {
  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  }); // 오류 메시지 상태

  // 이메일값 받기
  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    console.log("실행됨");
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (validation()) {
      updateOnMypage(email, values.currentPassword, values.password)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "비밀번호를 변경했습니다.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });
          window.location.reload();
        })
        .catch(() => {
          Swal.fire({
            icon: "warning",
            title: "비밀번호가 일치하지 않습니다.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "비밀번호를 변경하지 못했습니다.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });
        });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const validation = () => {
    let valid = true;
    let obj = {};

    // currentPassword
    let regex =
      /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!regex.test(values.currentPassword.trim())) {
      obj = { ...obj, currentPassword: "" };
      valid = false;
    } else {
      obj = { ...obj, currentPassword: "" };
    }

    // password
    if (!regex.test(values.password.trim())) {
      obj = {
        ...obj,
        password:
          "영어, 숫자, 특수문자가 포함된 8 ~ 20 글자의 비밀번호를 입력해주세요.",
      };
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

    setError(obj);
    return valid;
  };

  return (
    <Box>
      <MypageSideBar />
      <Container>
        <Content>
          <Title>비밀번호 변경</Title>
          <form className="validation-form" onSubmit={handleSubmit} style={{width: '60%'}}>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                id="currentPassword"
                label="현재 비밀번호"
                type="password"
                variant="outlined"
                placeholder="현재 비밀번호를 입력해주세요"
                sx={{ width: "100%" }}
                onChange={handleChange}
                required
              />
              <Error>{error.currentPassword}</Error>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                id="password"
                label="새 비밀번호"
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
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", height: "56px", fontSize: "1.5rem" }}
              >
                확인
              </Button>
            </ButtonContainer>
          </form>
        </Content>
      </Container>
    </Box>
  );
};

export default ChangePassword;

const Box = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 600px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 3rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
const Error = styled.div`
  color: red;
`;
