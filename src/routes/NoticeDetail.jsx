//import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button} from "@mui/material";

const NoticeDetail = ()=>{

    const {state} = useLocation();

    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(state);
    }, []);  
    
  useEffect(()=>{
    scrollTo(0,0);
  },[])
  
    return (
        <>
        
            <div>
                
                {state ? (
                    <>
                    <Container>
                        <One>
                            <p>{state.noticeTitle}</p>
                            <div className="profile">
                                <div className="noticeInfo">
                                    <p>{state.noticeDate.substr(0,4)+"."+
                                        state.noticeDate.substr(5,2)+"."+
                                        state.noticeDate.substr(8,2)+"  "+
                                        state.noticeDate.substr(11,2)+":"+
                                        state.noticeDate.substr(14,2)
                                        }
                                    </p>
                                </div>
                            </div>
                        </One>
                        <Two>
                            <ContentTextarea defaultValue={state.noticeContent} disabled/>
                        </Two>
                        
                        <Three>
                            <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem'}} 
                                        onClick={() => navigate(-1)}  
                                >
                                목록으로
                            </Button>
                        </Three>
                    </Container>
                    
                    <hr />
                    </>
                ) : (
                    <p>게시글을 로딩 중...</p>
                )}
            </div>
        </>
    );
}
export default NoticeDetail;
const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;  
`;

const One = styled.div`
    width : 50%;
    display: flex;
    flex-direction : column;
    border-bottom: 3px solid gray;
    padding-bottom : 13px;
    .profile{
        display: flex;
        
    }
    .profile .btns {
    margin-left: auto;
    }
    p{
        font-size: 30px;
    }
    img{
        width : 60px;
        height : 60px;
    }
    .noticeInfo{
        display: flex;
        flex-direction: column;
        p{
            margin : 0px 10px;
            font-size: 20px;
        }
    }
    
`;

const Two = styled.div`

    width : 50%;
    p{
        font-size: 25px;
    }

`;

const Three = styled.div`

    width : 50%;
    p{
        font-size: 30px;
    }
`;


const ContentTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: none;
    height: 150px;
    resize: vertical; /* 사용자가 세로 크기 조정 가능 */
    outline: none;

    &:focus {
        outline: none;
    }
`;