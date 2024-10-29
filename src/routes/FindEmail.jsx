import { Button, TextField } from "@mui/material";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import styled from "styled-components";
import { findMem,sendSMS, verifySMS,findEmail } from "../service/SmsService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
padding: 100px 70px;
margin:auto;
position:relative;
width:45%;
min-height: 700px;
`;

const Content = styled.div`
    padding-bottom:60px;
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

const ValidateError = styled.div`
  color: red;
`;


const FindEmail = () => {
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0);  // count를 상태 변수로 관리
    const [name, setName] = useState(''); //작성한 이름 저장
    const [phone, setPhone] = useState(''); //작성한 휴대폰번호저장
    const [auth, setAuth] = useState(''); //작성한 인증번호 저장
    const [error, setError] = useState({
        phone: '', //휴대폰번호 작성 여부
        auth: '', //인증번호 작성 여부
        same : '인증번호가 일치하지 않습니다.' //인증번호 일치 여부
    });
    const navigator = useNavigate();
    
    const send = () => {
        if(validateForm()){
            if (count >= 1) {
                alert("이미 인증 문자를 발송하였습니다.");
                return;
            }
            
            //문자 전송하기 전에 일단 db에 있는 이름인지 조회해서 있는 이름일 경우에만 문자전송
            //일단 employees 테이블의 같은이름 같은번호가 있는 지 조회
            const member = { name, phone};
            findMem(member)
            .then((response)=>{
                let result = response.data;
                console.log("response.data : "+ response.data);
            if(result==0){
                //그 멤버가 존재하지 않는 경우
                alert("존재하지 않는 회원입니다.");
                return;
            }
    
            // alert("존재하는 회원입니다.");
            
            // 문자 전송 로직
            // 백엔드로 문자 전송 요청보내기
            
            // sendSMS(member); : undefined가 리턴된다
            sendSMS(member)
            .then(()=>{
                alert('인증 문자를 전송하였습니다.');
                setShow(true);
                setCount(count + 1);  // count 값을 1 증가
                console.log("count : ", count + 1);  // 여기서는 실제 증가된 값으로 확인 가능
            })
            .catch((error) => {
                console.error("문자 전송 실패", error);
                alert("문자 전송에 실패했습니다.");
            });
            
            })
            .catch((error) => {
                console.error("회원 조회 실패", error);
                alert("회원 조회에 실패했습니다.");
            });
            
        }
        
    };

    //인증번호를 입력값과 비교
const verify = ()=>{
    if(authWrite()){
        verifySMS(auth)
        .then(response=>{
            response.data; //일치하면 1을 리턴할거고 일치하지 않으면 0을 리턴할거다
            let data = response.data;
            console.log("인증번호일치 response.data : "+ response.data);
            if(data==0){
                //불일치하는 인증번호 작성 시
                alert("인증번호가 일치하지 않습니다.");
                return;
            }else{
                const errorCopy = {...error}; //스프레드 연산자
                errorCopy.same = "인증번호가 일치합니다."; //일치
                console.log(error);
                //일치하는 인증번호 작성 시
                //이메일을 알려주는 페이지로 이동하기

                //여기에 findEmail(phone) 있었다.
                
                setError(errorCopy);
                
            }
        })
    }
   
}



const validateForm=()=>{ //잘 작성했는지 확인
    let valid = true;
    let obj = {};

    let regex = /^01[0-9]{9}$/i;
    if(!regex.test(phone.trim())){
      obj = {...obj, phone: "휴대폰 번호를 - 없이 입력하세요."};
      valid = false;
    } else {
      obj = {...obj, phone: ''};
    }

    setError(obj);
    return valid;
}

const authWrite = ()=>{ //인증번호 작성했는지 여부 검사
    let valid=true;
    const errorCopy = {...error}; //스프레드 연산자
    if(auth.trim()){
        //인증번호 한 자라도 작성한 경우
        errorCopy.auth = '';
    }else{
        errorCopy.auth = '인증번호를 작성해주세요.';
        console.log("인증번호 미작성");
        valid=false;
    }
    setError(errorCopy);
    return valid;
}
const final = ()=>{
            findEmail(phone)
                .then((response)=>{
                    console.log("찾은이메일 response.data : " + response.data);
                    let email = response.data;
                    if(email){
                        //null이 아닐 때 
                        navigator('/findEmailResult', {state: {email}});
                    }
                    
                })
}
    return (
        <>
            <HeaderComponent />
            <Container>

                <Content>
                    <h4 style={{ marginBottom: '25px' }}>이메일 찾기</h4>
                    <div style={{ marginBottom: "16px" }}>
                        <TextField label="이름" variant="outlined" placeholder="이름을 입력해주세요" required 
                        onChange={(e)=>setName(e.target.value)}
                        sx={{ width: "100%" }} />
                        
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                        <TextField label="휴대폰 번호" variant="outlined" placeholder="- 없이 숫자만 입력해주세요" required
                            onChange={(e)=>setPhone(e.target.value)}
                            sx={{ width: "75%" }} />
                        <ButtonAdd variant="contained" sx={{ height: '56px' }} onClick={send}>인증번호 전송</ButtonAdd>
                        <ValidateError>{error.phone}</ValidateError>
                    </div>
                    <div>
                        {show && (
                            <>
                                <TextField label="인증번호" variant="outlined" 
                                onChange={(e)=>setAuth(e.target.value)}
                                placeholder="인증번호를 입력해주세요" sx={{ width: "75%" }} />
                                <ButtonAdd variant="contained" sx={{ height: '56px' }}
                                onClick={verify}>인증번호 확인</ButtonAdd><br />
                            </>
                        )}
                        
                    </div>
                    <ButtonContainer>

                        <Button variant="contained" sx={{ width: '100%', height: '56px', fontSize: '1.5rem' }}
                        //  disabled={!(error.same)} 
                         //  true일 때만 버튼 활성화
                         disabled={error.same !== "인증번호가 일치합니다."} // status가 "active"일 때만 버튼 활성화
                        onClick={final}
                        >이메일 찾기</Button>

                    </ButtonContainer>
                </Content>

            </Container>
            <FooterComponent />
        </>
    );
}

export default FindEmail;