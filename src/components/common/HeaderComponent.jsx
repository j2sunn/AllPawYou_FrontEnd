import styled from "styled-components";
import logo from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IoPersonCircleSharp } from "react-icons/io5";

const HeaderComponent = () => {
  const navigator = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  const handleLogout = async () => {
    localStorage.clear();
    navigator('/');
  };

  return (
    <>
      <Container>
        <Header>
          <Logo onClick={() => navigator("/")} style={{justifyContent: 'space-evenly'}}>
            <LogoImg src={logo} alt="로고" />
            <LogoText>All Paw You</LogoText>
          </Logo>
          <Nav>
            <NavItem onClick={() => navigator("/")}>홈</NavItem>
            <NavItem>사용가이드</NavItem>

            <NavItem onClick={() => navigator("/boardList")}>커뮤니티</NavItem>

        
            <NavItem onClick={() => navigator("/shoppingMain")}>쇼핑</NavItem>

            {ACCESS_TOKEN ? (
              <>
                <NavItem onClick={()=>navigator("/cart")}>장바구니</NavItem>
                <NavItem>
                  <Accordion
                    sx={{
                      height: "5rem",
                      backgroundColor: "rgba(0,0,0,0)",
                      boxShadow: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <AccordionSummary sx={{ marginBottom: "-1rem" }}>
                      {/* 이미지 넣기 */}
                      {/* <Img /> */}
                      <IoPersonCircleSharp size={60} style={{color:'gray'}} />
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: "#EEC759" }}>
                      <AccordianItem onClick={() => navigator("/mypage")}>마이페이지</AccordianItem>
                      <AccordianItem onClick={handleLogout}>로그아웃</AccordianItem>
                    </AccordionDetails>
                  </Accordion>
                </NavItem>
              </>
            ) : (
              <NavItem onClick={() => navigator("/login")}>로그인</NavItem>
            )}
          </Nav>
        </Header>
      </Container>
    </>
  );
};

export default HeaderComponent;

const Container = styled.div`
  height: 10rem;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 5rem;
  padding: 0 5rem;
  background-color: #fff7d4;
  box-shadow: 0px 8px 6px -6px #cdcdcd;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const Logo = styled.div`
  cursor: pointer;
  width: 15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 5rem;
`;

const LogoText = styled.span`
  color: #527853;
  font-size: 24px;
  font-weight: 600;
`;

const Nav = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.div`
  cursor: pointer;
`;

// const Img = styled.img`
//   width: 4rem;
//   height: 4rem;
//   border-radius: 50%;
//   background-color: gray;
// `;

const AccordianItem = styled.div`
  text-align: center;
  margin: 1rem 0;
`;
