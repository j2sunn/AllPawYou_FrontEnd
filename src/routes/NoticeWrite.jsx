import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createNotice} from "../service/NoticeService";
const NoticeWrite = ()=>{
    
    const navigator = useNavigate();
    // let ACCESS_TOKEN = "";
    
    // useEffect(()=>{
    //     ACCESS_TOKEN = localStorage.getItem("accessToken");
    //     console.log("토큰 : "+ACCESS_TOKEN);

    //     if(ACCESS_TOKEN){
    //         console.log("토큰 : "+ACCESS_TOKEN);
    //     const payload = JSON.parse(atob(ACCESS_TOKEN.split(".")[1]));
    //     setLoginEmail(payload['user-email']);
    //     // console.log("email : "+ payload['user-email']);
    //     // console.log("email : "+loginEmail);
    //     }else{
    //         alert("로그인 후 이용해주세요.");
    //         // navigator('/login');
    //         location.href='/login';
    //         return;
    //     }
    // },[]);

    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeContent, setNoticeContent] = useState("");
    const [error, setError] = useState({});
    // console.log("images : "+images);
    console.log("제목길이"+noticeTitle.trim().length);


    // const handleImageChange = (e) => {

    //     const files = Array.from(e.target.files);
        
    //     if (files.length + images.length > 8) {
    //         alert("최대 8장까지 업로드할 수 있습니다.");
    //         return;
    //     }
        
    //     // const newImages = files.map((file) => URL.createObjectURL(file));
    //     setImages((prevImages) => [...prevImages, ...files]);
    //     // console.log("여기여기"+e.target.files);
        
    // };

    // const handleRemoveImage = (index) => {
    //     setImages(images.filter((_, i) => i !== index));
    //     console.log("요기닷"+images);
    //     // blob:http://localhost:3000/93d8fcf8-92c3-417c-9dc5-66fa2ad5338a,blob:http://localhost:3000/8740daa0-5050-44ad-adc5-7fc2546510cf
    //     /*
    //     const arr = ['a', 'b', 'c', 'd', 'e'];
    //     const indexToRemove = 2; 

    //     arr.splice(indexToRemove, 1);

    //     console.log(arr); // ["a", "b", "d", "e"]
        
    //     */
    // };


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
        formData.append("noticeContent", noticeContent);
        createNotice(formData,navigator);
    
        
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
    return (
        <>
            <Container>
                <Title>공지사항 등록</Title>
                <One>
                    <h5>제목<span>*</span></h5>
                    <TitleInput onChange={(e) => setNoticeTitle(e.target.value)}/>
                    <Error>{error.title}</Error>

                    <h5>내용<span>*</span></h5>
                    <ContentTextarea onChange={(e) => setNoticeContent(e.target.value)}/>
                    
                    <Error>{error.content}</Error>
                </One>
                <EndBtn onClick={doSubmit}>등록</EndBtn>
            </Container>
        </>
    );
}
export default NoticeWrite;
const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    
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

const Title = styled.div`

font-size: 2rem;
padding-bottom: 3rem;
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

const One = styled.div`
    width: 90%;
    h5{
        margin-top: 30px;
    }
    h5 span{
        color: red;
    }
`;

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