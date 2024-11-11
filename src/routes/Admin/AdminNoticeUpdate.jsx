import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {getNotice,updateNotice} from "../../service/NoticeService";
import styled from "styled-components";
const NoticeUpdate = ()=>{
    const  {state}  = useLocation();
    const [noticeNo, setNoticeNo] = useState(state.noticeNo);
    const [noticeData, setNoticeData] = useState(null);
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeContent, setNoticeContent] = useState(""); //이거는 한 자라도 작성했는지 체크용


    const [error, setError] = useState({});
    const [result,setResult] = useState("");

    
    const navigator = useNavigate();

    // let ACCESS_TOKEN = "";
    console.log("수정할 noticeNo : " + noticeNo);
    useEffect(()=>{
        console.log(state);
        setNoticeTitle(state.noticeTitle);
        setNoticeContent(state.noticeContent);
            
    },[]);

    // useEffect(()=>{
    //     ACCESS_TOKEN = localStorage.getItem("accessToken");
    //     console.log("토큰 : "+ACCESS_TOKEN);

    //     if(ACCESS_TOKEN){
    //         console.log("토큰 : "+ACCESS_TOKEN);
    //     const payload = JSON.parse(atob(ACCESS_TOKEN.split(".")[1]));
    //     setLoginEmail(payload['user-email']);
        
    //     }else{
    //         alert("로그인 후 이용해주세요.");
    //         // navigator('/login');
    //         location.href='/login';
    //         return;
    //     }
    // },[]);

    // 제목 수정 핸들러
const handleTitleChange = (e) => {
    setNoticeTitle(e.target.value);
    };
    
  // 내용 수정 핸들러

    const handleContentChange = (e)=>{
        console.log("댓글내용 : "+e.target.value);
        let text=e.target.value.replace(/<script.*?>.*?<\/script>/gi, ''); //script가 있을 경우 제거
        
        setNoticeContent(text);
        console.log("result : "+result);
    }
   
    
    const doSubmit = ()=>{
        if(validation()){
            //필수사항 다 작성한 경우
            //selectedCategory, boardTitle, boardContent, images를 제출
            // const board = {
            //     email : loginEmail,
            //     category : selectedCategory,
            //     boardTitle,
            //     boardContent,
            //     imgFile : images
            // };
            // uploadBoard(board);
            const formData = new FormData();

        // 필드 추가
        formData.append("noticeTitle", noticeTitle);
        formData.append("noticeContent", result);
        // formData.append("noticeContent", noticeContent);

        updateNotice(noticeNo,{noticeTitle,noticeContent,noticeData});
        navigator("/admin/noticeList");
            setTimeout(()=>{
                console.log(1);
            },3000);
    
        }
    }
    const validation = ()=>{ //필수값 다 작성했는지 검사
        let obj={};
        if(noticeTitle.trim().length==0){
            obj={...obj, title:"제목을 입력해 주세요."}
            setError(obj);
            return false;
        }

        if(noticeContent.trim().length==0){
            obj={...obj, content:"내용을 입력해 주세요."}
            setError(obj);
            return false;
        }
        
        return true;
    }
    return(
        <>
            {state ? (
                    <Container>
                    <Title>공지사항 수정</Title>
                    <One>
                        <h5>제목<span>*</span></h5>
                        <TitleInput onChange={handleTitleChange} 
                                value={noticeTitle}/>
                        <Error>{error.title}</Error>
    
                        <h5>내용<span>*</span></h5>
                        <ContentTextarea onChange={handleContentChange} 
                                value={noticeContent}/>
                        
                        <Error>{error.content}</Error>
                    </One>
                    <EndBtn onClick={doSubmit}>등록</EndBtn>
                </Container>
            ) : (
                <>
                </>
            )}
            
        </>
    );
}
export default NoticeUpdate;
const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    
`;


const Title = styled.div`

font-size: 2rem;
padding-bottom: 3rem;
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

// const Div = styled.div`
//     background-color: ${({ selected }) => (selected ? '#EEC759' : 'RGB(240, 240, 243)')};
//         margin-right : 10px;
//         width : 100px;
//         font-weight: bold;
//         border-radius: 20px;
//         text-align: center;
//         padding : 7px;
//         &:hover{
//         cursor: pointer;
//         }
// `;
const One = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h5{
        margin-top: 30px;
        
    }
    h5 span{
        color: red;
    }
    .cateCon{
        display: flex;
    }
    
`;
// const Two = styled.div`
//     width: 50%;
//     h5{
//         margin-top: 30px;
//     }
//     h5 span{
//         color: red;
//     }
// `;
// const Three = styled.div`
//     width: 50%;
//     h5{
//         margin-top: 30px;
//     }
// `;

const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;

    &:focus {
        outline: none;
        border-color: #6c63ff;
    }
`;

const ContentTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 150px;
    resize: vertical; /* 사용자가 세로 크기 조정 가능 */

    &:focus {
        outline: none;
        border-color: #6c63ff;
    }
`;
// const ImgContainer = styled.div`
//     width: 100%;
//     height: 100px;
//     padding: 10px;
//     background-color: #fff3c4; /* 배경 색상 */
//     border: 1px solid #ddd;
//     border-radius: 10px;
//     overflow-x: auto;
//     white-space: nowrap; /* 썸네일들이 한 줄로 나오도록 설정 */
// `;


// const Thumbnail = styled.div`
//     display: inline-block;
//     position: relative;
//     width: 80px;
//     height: 80px;
//     margin-right: 10px;
//     border-radius: 10px;
//     overflow: hidden;
//     background-color: #eee;
// `;

// const Image = styled.img`
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// `;

// const RemoveButton = styled.button`
//     position: absolute;
//     top: 5px;
//     right: 5px;
//     background: black;
//     color: white;
//     border: none;
//     border-radius: 50%;
//     width: 20px;
//     height: 20px;
//     cursor: pointer;
    
// `;

// const UploadButton = styled.label`
//     background-color: RGB(240, 240, 243);
//     border-radius: 15px;
//     padding : 5px;
//     display: inline-block;
//     cursor: pointer;
//     margin-top: 10px;
//     font-size: 14px;
// `;

// const FileInput = styled.input`
//     display: none;
// `;

const EndBtn = styled.button`
    background-color: #EEC759;
    border : 3px solid #EEC759;
    margin : 30px 0;
    border-radius: 15px;
    padding : 5px;
    width : 100px;
    font-weight: bold;
    border-radius: 20px;
    text-align: center;
    padding : 7px;
    &:hover{
        
        background-color: white;
    }
`;
const Error = styled.div`
    color: red;
`;