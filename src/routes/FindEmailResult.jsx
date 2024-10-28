import { Button } from "@mui/material";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import styled from "styled-components";

const Content = styled.div`
    padding-bottom:20px;
    text-align: center;
`;


const FindEmail = () => {
    return (
        <>
            <HeaderComponent />
            
            <Content>
            <h3>이메일 찾기 결과</h3>
                <div>
                    고객님의 이메일은 
                   <div></div> 입니다
                   <div>
                   <Button variant="outlined">비밀번호 찾기</Button>
                   <Button variant="contained">로그인</Button>
                   </div>
                </div>
            </Content>
            <FooterComponent />
        </>
    );
}

export default FindEmail;