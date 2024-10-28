import { Button, TextField } from "@mui/material";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import styled from "styled-components";
import { useState } from "react";
const Container = styled.div`
padding: 70px;
margin:auto;
position:relative;
width:45%;
`;

const Content = styled.div`
    padding-bottom:20px;
`;

const ButtonAdd = styled(Button)`
left: 10px;
width: 23%;
height:56px;
`;

const ButtonContainer = styled.div`
  display: flex;         
  justify-content: center; 
  margin-top: 16px;      
`;

const ValidationText = styled.span`
    color:red;
    fontSize: "0.75rem";
`


const FindEmail = () => {
    const [auth, setAuth] = useState(false);
    return (
        <>
            <HeaderComponent />
            <Container>

                <Content>
                    <h4 style={{ marginBottom: '25px' }}>이메일 찾기</h4>
                    <div style={{ marginBottom: "16px" }}>
                        <TextField label="이름" variant="outlined" placeholder="이름을 입력해주세요" sx={{ width: "100%" }} />
                        <ValidationText></ValidationText>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                        <TextField label="휴대폰 번호" variant="outlined" placeholder="- 없이 숫자만 입력해주세요"
                            sx={{ width: "75%" }} />
                        <ButtonAdd variant="contained" sx={{ height: '56px' }} onClick={() => setAuth(true)}>인증번호 전송</ButtonAdd>
                        <ValidationText></ValidationText>
                    </div>
                    <div>
                        {auth && (
                            <>
                                <TextField label="인증번호" variant="outlined" placeholder="인증번호를 입력해주세요" sx={{ width: "75%" }} />
                                <ButtonAdd variant="contained" sx={{ height: '56px' }}>인증번호 확인</ButtonAdd><br />
                                <ValidationText></ValidationText>
                            </>
                        )}
                        
                    </div>
                    <ButtonContainer>
                        <Button variant="contained" sx={{ width: '100%', height: '56px' }}>이메일 찾기</Button>
                    </ButtonContainer>
                </Content>

            </Container>
            <FooterComponent />
        </>
    );
}

export default FindEmail;