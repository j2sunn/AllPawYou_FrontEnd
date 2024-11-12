import styled from "styled-components";
import logo from "src/assets/logo1.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginNeed = () => {
  const navigator = useNavigate();
  return (
    <Container>
      <LogoImg src={logo} alt="로고" />
      <Message>로그인이 필요합니다.</Message>
      <Button
        onClick={() => navigator("/login")}
        variant="contained"
        color="primary"
        sx={{ width: "18rem", height: "3rem", fontSize: "1.5rem", borderRadius: "10px" }}
      >
        로그인으로 이동
      </Button>
    </Container>
  );
};

export default LoginNeed;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
`;

const LogoImg = styled.img`
  width: 20rem;
`;

const Message = styled.div`
  margin: 2rem 0;
  font-size: 2rem;
  color: #767171;
`;
