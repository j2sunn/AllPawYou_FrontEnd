import styled from "styled-components";
import logo from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
// import { IoPersonCircleSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import defaultProfile from "src/assets/defaultprofile.png";

const HeaderComponent = () => {
  const navigator = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  // const ADMIN = localStorage.getItem("role");

  const handleLogout = async () => {
    Swal.fire({
      icon: "success",
      title: "로그아웃 되었습니다.",
      confirmButtonColor: "#527853",
      confirmButtonText: "닫기",
    });
    localStorage.clear();
    navigator("/");
  };

  //---- 회원정보 가져오기
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");
    const intro = localStorage.getItem("intro");
    const phone = localStorage.getItem("phone");
    const address = localStorage.getItem("address");
    const profileImage = localStorage.getItem("profile");

    // 가져온 데이터를 상태에 설정
    const userData = {
      username,
      email,
      nickname,
      intro,
      phone,
      address,
      profileImage,
    };

    setUserInfo(userData);
    console.log("profileImage : ", profileImage);
  }, []);

  return (
    <>
      <Container>
        {userInfo ? (
          <HeaderContainer>
            <Header>
              <Logo onClick={() => navigator("/")} style={{ justifyContent: "space-evenly" }}>
                <LogoImg src={logo} alt="로고" />
                <LogoText>All Paw You</LogoText>
              </Logo>
              <Nav>
                <NavItem onClick={() => navigator("/")}>홈</NavItem>
                <NavItem onClick={() => navigator("/shopping")}>쇼핑</NavItem>
                <NavItem onClick={() => navigator("/boardList")}>커뮤니티</NavItem>
                <NavItem onClick={() => navigator("/noticeListUser")}>사용 가이드</NavItem>

                {ACCESS_TOKEN ? (
                  <>
                    <NavItem onClick={() => navigator("/cart")}>장바구니</NavItem>
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
                          <img
                            src={
                              userInfo?.profileImage && userInfo.profileImage !== "null"
                                ? `http://localhost:8081${userInfo.profileImage}` // 이미지가 있을 때
                                : defaultProfile // 이미지가 없을 때
                            }
                            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                          />

                          {/* <IoPersonCircleSharp size={60} style={{ color: "gray" }} /> */}
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: "#EEC759" }}>
                          {localStorage.getItem("role") == "ROLE_ADMIN" ? (
                            <AccordianItem onClick={() => navigator("/admin/dashboard")}>관리자 페이지</AccordianItem>
                          ) : (
                            <>
                              <AccordianItem onClick={() => navigator("/mypage")}>마이페이지</AccordianItem>
                              <AccordianItem onClick={() => navigator("/admin/dashboard")}>판매자 페이지</AccordianItem>
                            </>
                          )}
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
          </HeaderContainer>
        ) : (
          <>사용자 정보가 없습니다.</>
        )}
      </Container>
    </>
  );
};

export default HeaderComponent;

const Container = styled.div`
  width: 100%;
  height: 7rem;
`;

const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: end;
  background-color: white;
  z-index: 10;
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
