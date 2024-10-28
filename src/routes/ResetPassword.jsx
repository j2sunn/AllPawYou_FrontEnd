import { Button, TextField } from "@mui/material";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import styled from "styled-components";
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


const ResetPassword = () => {
    return (
        <>
            <HeaderComponent />
            <Container>
                <Content>
                    <h4 style={{ marginBottom: '25px' }}>비밀번호 재설정</h4>
                    <TextField label="이메일 주소" variant="outlined" placeholder="'@'를 포함하여 입력해주세요'"
                        sx={{ width: "75%", marginBottom: "16px" }} />
                    <ButtonAdd variant="contained" sx={{ height: '56px' }}>인증번호 전송</ButtonAdd><br />
                    <TextField label="인증번호" variant="outlined" placeholder="인증번호를 입력해주세요" sx={{ width: "75%", marginBottom: "16px" }} />
                    <ButtonAdd variant="contained" sx={{ height: '56px' }}>인증번호 확인</ButtonAdd><br />
                    <TextField label="새 비밀번호" variant="outlined" placeholder="비밀번호를 입력해주세요" sx={{ width:"100%", marginBottom: "16px" }} /><br />
                    <TextField label="새 비밀번호 확인" variant="outlined" placeholder="비밀번호를 입력해주세요" sx={{ width:"100%", marginBottom: "16px" }} /><br />
                    <ButtonContainer>
                        <Button variant="contained" sx={{ width: '100%', height: '56px' }}>확인</Button>
                    </ButtonContainer>
                </Content>

            </Container>
            <FooterComponent />
        </>
    );
}

export default ResetPassword;