import { Button, TextField } from "@mui/material";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import styled from "styled-components";
const FindEmailContainer = styled.div`
padding-top:100px;
height: 700px;
`;

const Content = styled.div`
    padding-bottom:20px;
    padding-left:40%;
`;


const FindEmail = () => {
    return (
        <>
            <HeaderComponent />
            <FindEmailContainer>
                <Content>
                    <h3>이메일 찾기</h3>
                    <TextField label="이름" variant="outlined" placeholder="이름을 입력해주세요" sx={{ width: '250px', marginBottom: "16px" }} /><br />
                    <TextField label="휴대폰 번호" variant="outlined" placeholder="- 없이 숫자만 입력해주세요"
                        sx={{ width: '250px', marginBottom: "16px" }} />
                    <Button variant="outlined" sx={{ height: '56px' }}>인증번호 전송</Button><br />
                    <TextField label="인증번호" variant="outlined" placeholder="인증번호를 입력해주세요" sx={{ width: '250px', marginBottom: "16px" }} />
                    <Button variant="outlined" sx={{ height: '56px' }}>인증번호 확인</Button><br />
                    <Button variant="contained">이메일 찾기</Button>
                </Content>
            </FindEmailContainer>
            <FooterComponent />
        </>
    );
}

export default FindEmail;