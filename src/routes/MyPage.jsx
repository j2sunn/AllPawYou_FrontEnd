import { Button } from "@mui/material";
import styled from "styled-components";
import HeaderComponent from "../components/common/HeaderComponent";

const MyPage = () => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <Content>
          <Profile>
            <ProfileImg as="div"/>
            <NickName>닉네임</NickName>
          </Profile>
          <Profile>
            <div>이름 : </div>
            <div>전화번호 : </div>
            <div>이메일 : </div>
          </Profile>
        </Content>
        <Title>주소</Title>
        <Content></Content>
        <Title>자기소개</Title>
        <Content></Content>
        <Button variant="contained" color="primary">수정</Button>
      </Container>
    </>
  )
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 60rem;
  min-height: 5rem;
  display: flex;
  margin: 2rem 0;
  border: 1px solid black;
  border-radius: 1rem;

  &:first-child{
    border: none;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 3rem;
`;

const ProfileImg = styled.img`
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 50%;
    margin-bottom: 2rem;
`;

const NickName = styled.div`
  text-align: center;
`;

const Title = styled.div`
  align-self: start;
  padding-left: 25rem;
`;