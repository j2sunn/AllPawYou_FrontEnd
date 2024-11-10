import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import Swal from "sweetalert2";
import { resetPassword } from "../../service/Login";
import { useNavigate } from "react-router-dom";
import MypageSideBar from "../../components/common/MypageSideBar";

const ChangePassword = () => {
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

  const validation = () => {
    let valid = true;
    let obj = {};

    // password
    let regex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!regex.test(values.password.trim())) {
      obj = { ...obj, password: "영어, 숫자, 특수문자가 포함된 8 ~ 20 글자의 비밀번호를 입력해주세요." };
      valid = false;
    } else {
      obj = { ...obj, password: "" };
    }

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

    setError(obj);
    return valid;
  };

  return (
    <>
      <Container>
        <MypageSideBar />

        <Content>
          <Title>비밀번호 변경</Title>
          <PasswordForm>
            {/* <h4 style={{ marginBottom: "25px" }}>비밀번호 변경</h4> */}
            <form className="validation-form" onClick={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <TextField
                  id="currentPassword"
                  label="현재 비밀번호"
                  className={`form-control`}
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
          </PasswordForm>
        </Content>
      </Container>
    </>
  );
};

export default ChangePassword;

const Container = styled.div`
  display: flex;
  width: 90%;
`;

const Content = styled.div`
  width: 90%;
  padding-bottom: 20px;
`;

const PasswordForm = styled.div`
  width: 90%;
`;

const SideBarTitle = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
`;

const Title = styled(SideBarTitle)`
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
const Error = styled.div`
  color: red;
`;
