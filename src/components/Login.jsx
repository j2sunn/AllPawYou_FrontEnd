import { Button} from "@mui/material";
import styled from "styled-components";
const LoginContainer = styled.div`
text-align:center;
padding-top:50px;
`;
const Content = styled.div`
    padding-bottom:20px;
`;


const Login = () => {

    return (
        <>
            <LoginContainer>
            <h3>통합 로그인</h3>
            <Content>
                <div>이메일(아이디)</div>
                <input placeholder="abc@email.com"></input>
                <div>비밀번호</div>
                <input></input>
            </Content>
            <div>
                <Button variant="contained">로그인</Button>
            </div>
            </LoginContainer>

        </>
    );
}
export default Login;