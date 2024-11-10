import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
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

const ResetPassword = () => {
  const [auth, setAuth] = useState(false);

  
  useEffect(()=>{
    scrollTo(0,0);
  },[])

  return (
    <>
      <Container>
        <Content>
          <h4 style={{ marginBottom: "25px" }}>비밀번호 재설정</h4>
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <TextField label="이메일 주소" variant="outlined" placeholder="'@'를 포함하여 입력해주세요'" sx={{ width: "72%" }} />
            <ButtonAdd variant="contained" sx={{ height: "56px" }} onClick={() => setAuth(true)}>
              인증번호 전송
            </ButtonAdd>
          </div>
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            {auth && (
              <>
                <TextField label="인증번호" variant="outlined" placeholder="인증번호를 입력해주세요" sx={{ width: "72%" }} />
                <ButtonAdd variant="contained" sx={{ height: "56px" }}>
                  인증번호 확인
                </ButtonAdd>
              </>
            )}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <TextField label="새 비밀번호" variant="outlined" placeholder="비밀번호를 입력해주세요" sx={{ width: "100%" }} />
            <br />
            <ValidationText></ValidationText>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <TextField label="새 비밀번호 확인" variant="outlined" placeholder="비밀번호를 입력해주세요" sx={{ width: "100%" }} />
            <br />
            <ValidationText></ValidationText>
          </div>
          <ButtonContainer>
            <Button variant="contained" sx={{ width: "100%", height: "56px", fontSize: "1.5rem" }}>
              확인
            </Button>
          </ButtonContainer>
        </Content>
      </Container>
    </>
  );
};

export default ResetPassword;
