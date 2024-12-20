import { Button } from "@mui/material";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FindEmail = () => {
    const { state } = useLocation();
    const email = state?.email;
    const navigator = useNavigate();
    const findPw = ()=>{
        navigator('/resetPwd');
    }

    
  useEffect(()=>{
    scrollTo(0,0);
  },[])

    return (
        <>
            {email == undefined ? (
                <Container>
                    <Content>잘못된 접근입니다</Content>
                    <Button onClick={()=>navigator('/')}
                        variant="contained" 
                        color="primary"
                        sx={{width:'18rem', height:'3rem', fontSize:'1.5rem', borderRadius:'10px'}}>
                        메인 페이지로 이동
                    </Button>
                </Container>
            ) : (
                <Container>
                    <h1>이메일 찾기 결과</h1>
                    <Result>
                        고객님의 이메일은 
                    <div> <span style={{fontWeight:'bold', textDecoration:'underline'}}>{email}</span> 입니다 </div>
                    </Result>
                    <Buttons>
                        <Button variant="outlined" onClick={findPw} size="large">비밀번호 찾기</Button>
                        <Button variant="contained" onClick={()=>navigator('/login')} sx={{width: '120px'}}>로그인</Button>
                    </Buttons>
                </Container>
                )
            }
        </>
    );
}

export default FindEmail;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:80px;
    text-align: center;
    min-height: 700px;
`;

const Content = styled.div`
    padding: 80px 0;
    font-size: 2rem;
`;

const Result = styled.div`
    padding: 80px 100px;
    margin: 30px 0;
    font-size: 1.5rem;
    border: 3px solid #EEC759;
    border-radius: 20px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 20%;
`;