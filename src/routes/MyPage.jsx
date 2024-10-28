import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import HeaderComponent from "../components/common/HeaderComponent";
import { useState } from "react";

const MyPage = () => {
  const [update, setUpdate] = useState(false);

  return (
    <>
      <HeaderComponent />
      {update ? (
        /* 사용자 정보 수정 */
        <Container>
          <Content>
            <Profile>
              <ProfileImg as="div"/>
              <TextField variant="outlined" size="small" sx={{width: '150px'}} />
            </Profile>
            <Profile>
              <ProfileDetail>이름 : <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}}/></ProfileDetail>
              <ProfileDetail>전화번호 : <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}}/></ProfileDetail>
              <ProfileDetail>이메일 : <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}}/></ProfileDetail>
            </Profile>
          </Content>
          <Title>주소</Title>
          <TextField variant="outlined" size="small" multiline maxRows={6} sx={{margin: '1rem 0 3rem 24rem', alignSelf: 'start', width: '60rem'}}/>
          <Title>자기소개</Title>
          <TextField variant="outlined" size="small" multiline maxRows={6} sx={{margin: '1rem 0 3rem 24rem', alignSelf: 'start', width: '60rem'}}/>
          <Button variant="contained" color="primary" onClick={()=>setUpdate(prev=>!prev)}>저장</Button>
        </Container>
      ) : (
        /* 사용자 정보 출력 */
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
          <Content>asdfsd</Content>
          <Title>자기소개</Title>
          <Content></Content>
          <Button variant="contained" color="primary" onClick={()=>setUpdate(prev=>!prev)}>수정</Button>
        </Container>
      )}
      
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
  min-height: 3rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
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
  margin-right: 5rem;
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

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  align-self: start;
  padding-left: 25rem;
  margin-bottom: 1rem;
`;