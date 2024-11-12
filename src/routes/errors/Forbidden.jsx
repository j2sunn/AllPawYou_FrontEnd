import styled from "styled-components";
import logo from "src/assets/logo1.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigator = useNavigate();
  return (
    <Container>
      <LogoImg src={logo} alt="로고" />
      <Message>접근 권한이 없는 페이지입니다.</Message>
      <Button
        onClick={() => navigator("/")}
        variant="contained"
        color="primary"
        sx={{ width: "18rem", height: "3rem", fontSize: "1.5rem", borderRadius: "10px" }}
      >
        메인 페이지로 이동
      </Button>
    </Container>
  );
};

export default Forbidden;

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
