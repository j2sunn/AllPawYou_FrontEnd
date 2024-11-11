//import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {getNotice} from "../service/NoticeService";
import styled from "styled-components";
import { Button} from "@mui/material";
//import { AiOutlineLike } from "react-icons/ai";
const NoticeDetail = ()=>{
    /*
    const { state } = useLocation();
    const email = state?.email;
    */
    
    // const params = useParams();
    // // const bNo = params?.boardNo;
    // const [boardNo,setBoardNo] = useState(0);
    // const bNo = useRef(params?.boardNo);
    // useEffect(()=>{
    //         bNo.current=params?.boardNo;
    //         setBoardNo(bNo);
    //         console.log("boardNo : "+boardNo);
    // },[bNo]);
    // return(
        
    //     <>
    //         {boardNo}

    //     </>
    // );
    const {state} = useLocation();

    
    const navigate = useNavigate();
    const cp = state?.cp;
    // const [commentData,setCommentData] = useState(null); //댓글
    // const loginEmail = localStorage.getItem('email');  // 로컬 스토리지에서 토큰을 가져옵니다.
    // const [error, setError] = useState({});
    // const [comment,setComment] = useState("");
    useEffect(() => {
        console.log(state);
    }, []);  // params.boardNo가 변경될 때마다 실행
    // const imgList = boardData.imgList;
    // for(let i=0;i<imgList.length;i++){
    //     console.log(imgList[i].boardImagePath+imgList[i].boardImageRename);
    // }
    // console.log("최종 넘어온 boardData : "+boardData.imgList);
    
    // const handleContentChange = (e)=>{
    //     setComment(e.target.value);
        
    //     console.log("comment : "+comment);

    // }
    // const addComment = ()=>{
    //     if(comment.trim().length==0){
    //         setError({comment:"댓글을 입력해 주세요."});
    //         return;
    //     }
    //     addCommentService(boardNo,comment,loginEmail,setCommentData);
    // }
    // console.log("=======================");
    // for( let img of (boardData.imgList)){
    //     console.log(img.boardImagePath+img.boardImageRename);
    // }
    // console.log("이미지 : "+boardData?.imgList);

    
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
                            <p>
                                {state.noticeContent}
                            </p>
                        </Two>
                        
                        <Three>
                            {/* <p>{boardData.boardContent.replace(/<s>/g," ").replace(/<e>/g,"\n")}</p> */}
                            {/* <p dangerouslySetInnerHTML={{ __html: noticeData.noticeContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} /> */}
                            <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem'}} 
                                        onClick={() => navigate(`/noticeListUser`,{state:{ cp : cp}})}  
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
// const Div = styled.div`
//     background-color: #EEC759;
//         margin-right : 10px;
//         width : 100px;
//         font-weight: bold;
//         border-radius: 40px;
//         text-align: center;
//         padding : 7px;
        
// `;
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
// const Three = styled.div`
//     width : 50%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-bottom: 30px;
//     img{
//         max-width: 1300px;
//     }
//     .like{
//         width : 100px;
//         height : 100px;
//         border: 1px solid black;
//         border-radius: 50%;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//     }
// `;
// const Four = styled.div`
//     border-top : 3px solid gray;
//     width : 50%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     .commentCount{
//         font-size : 35px;
//     }
//     img{
//         width : 60px;
//         height : 60px;
//     }
//     .commentProfile{
//         display: flex;
//         justify-content: space-between;
//         padding : 10px;
//     }
//     .commentProfile:not(:last-child){
//         border-bottom: 1px solid gray;
        
//     }
// `;
// //댓글
// const ContentTextarea = styled.textarea`
//     width: 100%;
//     col : 2;
//     padding: 10px;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     height: 100px;
//     resize: vertical; /* 사용자가 세로 크기 조정 가능 */

//     &:focus {
//         outline: none;
//         border-color: #6c63ff;
//     }
// `;
// const Error = styled.div`
//     color: red;
// `;

