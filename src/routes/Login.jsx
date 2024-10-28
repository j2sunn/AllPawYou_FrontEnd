import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import FooterComponent from "../components/common/FooterComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import { FaGoogle } from "react-icons/fa";
import { SiKakaotalk } from "react-icons/si";

const LoginContainer = styled.div`
    text-align:center;
    padding-top:100px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Content = styled.div`
    padding: 20px 0;
`;
const Icons = styled.div`
    margin: 2rem 0;
    width: 10%;
    display: flex;
    justify-content: space-between;
`;

const Links = styled.a`
text-decoration:none;
color: inherit;
 &:hover {
    color: inherit; 
  }
`;

const Login = () => {

    return (
        <>
            <HeaderComponent />
            <LoginContainer>
                <h3>통합 로그인</h3>
                <Content>
                    <TextField label="이메일" variant="outlined" placeholder="abc@email.com" sx={{ width: '350px', paddingBottom: '10px' }} /><br />
                    <TextField type="password" label="비밀번호" variant="outlined" sx={{ width: '350px' }} />
                </Content>
                <div>
                    <Button variant="contained" sx={{ backgroundColor: '#527853', width: '350px', height: '40px', marginBottom: '3rem' }}>로그인</Button>
                </div>
                <span>소셜 로그인</span>
                <hr style={{ width: '350px', margin: '0 auto' }} />
                <Icons>
                    <a href="/signup"><SiKakaotalk size={40} /></a>
                    <a href="/signup"><FaGoogle size={40} /></a>
                </Icons>
                
                <div>
                    <Links href="/findEmail">아이디 찾기</Links> |
                    <Links href=""> 비밀번호 재설정</Links> |
                    <Links href="/signup"> 회원가입</Links>
                </div>


            </LoginContainer>
            <FooterComponent />
        </>
    );
}
export default Login;