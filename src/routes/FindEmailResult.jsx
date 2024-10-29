import { Button } from "@mui/material";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Content = styled.div`
    padding:70px;
    text-align: center;
`;




const FindEmail = () => {
    const params = useParams();
    const navigator = useNavigate();
    const findPw = ()=>{
        navigator('/resetPwd');
    }
    return (
        <>
            <HeaderComponent />
            
            <Content>
            <h4>이메일 찾기 결과</h4>
                <div>
                    고객님의 이메일은 
                   <div>{params.email}</div> 입니다
                   <div>
                   <Button variant="outlined"
                   onClick={findPw}>비밀번호 찾기</Button>
                   <a href="/login"><Button variant="contained">로그인</Button></a>
                   </div>
                </div>
            </Content>
            <FooterComponent />
        </>
    );
}

export default FindEmail;