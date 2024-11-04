import styled from "styled-components";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
const BoardWrite = ()=>{
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if(ACCESS_TOKEN){
        console.log("토큰 : "+ACCESS_TOKEN);
    const payload = JSON.parse(atob(ACCESS_TOKEN.split(".")[1]));
    console.log("email : "+ payload['user-email']);
    const loginEmail = payload['user-email']; 
    }
    
    return (
        <>
            <HeaderComponent />
                {/* {ACCESS_TOKEN ? ( //로그인한 상태인 경우
                    <>
                        토큰이 있습니다.

                    </>
                                    ) : ( //로그인 안 한 상태인 경우
                    <>
                        토큰이 없습니다.
                    </>
                )} */}
                
            <FooterComponent />
        </>
    );
}
export default BoardWrite;