import { Button } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MypageSideBar from "../components/common/MypageSideBar";
import defaultProfile from "../assets/defaultprofile.png";

const MyPage = () => {
  const navigator = useNavigate();

  //---- 회원정보 가져오기
  const [userInfo, setUserInfo] = useState(null);
  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState(false);

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
      setProfile(userData);
    
  }, []);

  const goUpdate = () => {
    navigator('/mypage/update');
  }

  return (
    <>
      <Box>
        <MypageSideBar />
        <Container>
          {userInfo ? (
            <>
              <Content>
                <Profile>
                  <ProfileImg
                    // src={`http://localhost:8081${userInfo.profileImage}`}
                    src={userInfo.profileImage && userInfo.profileImage !== "default" || null ? `http://localhost:8081${userInfo.profileImage}` : defaultProfile}
                  />
                  <NickName>{userInfo.nickname}</NickName>
                </Profile>
                <Profile>
                  <div>이름 : {userInfo.username} </div>
                  <div>전화번호 : {userInfo.phone}</div>
                  <div>이메일 : {userInfo.email} </div>
                  <div>주소 : {userInfo.address || ""}</div>
                </Profile>
              </Content>
              <Title>자기소개</Title>
              <Content>{userInfo.intro || ""}</Content>
              <Button variant="contained" color="primary" onClick={goUpdate}>
                  수정
              </Button>
            </>
          ) : (
            <div>해당 회원정보가 없습니다.</div>
          )}
        </Container>
      </Box>
    </>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin: 5rem 0 10rem;
`;

const Content = styled.div`
  width: 60rem;
  min-height: 3rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
  border: 1px solid black;
  border-radius: 1rem;

  &:first-child {
    border: none;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 4rem;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 2rem;
`;

const NickName = styled.div`
  text-align: center;
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  align-self: start;
  padding-left: 25rem;
  margin-bottom: 1rem;
`;

// const Introduce = styled.div`

// `;

//--------사이드바
const SideBar = styled.div`
  width: 25%;
  height: 70vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideBarTitle = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
`;
const UpdateContainer = styled(Container)`
  margin: 5rem 0;
`;
