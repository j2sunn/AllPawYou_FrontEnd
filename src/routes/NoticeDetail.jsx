//import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {getNotice} from "../service/NoticeService";
import styled from "styled-components";
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
    const params = useParams();
    const [noticeNo, setNoticeNo] = useState(0);
    const nNo = useRef(params?.noticeNo);  // 초기값을 params.boardNo로 설정
    const [noticeData, setNoticeData] = useState(null);
    // const [commentData,setCommentData] = useState(null); //댓글
    // const loginEmail = localStorage.getItem('email');  // 로컬 스토리지에서 토큰을 가져옵니다.
    // const [error, setError] = useState({});
    // const [comment,setComment] = useState("");
    useEffect(() => {
        nNo.current = params?.noticeNo;  // params가 변경될 때마다 bNo 업데이트
        setNoticeNo(nNo.current);  // boardNo 상태 업데이트
        // console.log("boardNo : " + boardNo);
        console.log("nNo : "+nNo.current); 
        // selectOne(boardNo,setBoardData);

        getNotice(nNo.current,setNoticeData);
        console.log("data : "+noticeData);    
        
    }, [params?.noticeNo]);  // params.boardNo가 변경될 때마다 실행
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
                
                {noticeData ? (
                    <>
                    <Container>
                        <One>
                            <p>{noticeData.noticeTitle}</p>
                            <div className="profile">
                                <div className="noticeInfo">
                                    <p>{noticeData.noticeDate.substr(0,4)+"."+
                                        noticeData.noticeDate.substr(5,2)+"."+
                                        noticeData.noticeDate.substr(8,2)+"  "+
                                        noticeData.noticeDate.substr(11,2)+"."+
                                        noticeData.noticeDate.substr(14,2)
                                        }
                                    </p>
                                </div>
                                <div className="btns">
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                                
                            </div>
                        </One>
                        
                        <Two>
                            {/* <p>{boardData.boardContent.replace(/<s>/g," ").replace(/<e>/g,"\n")}</p> */}
                            <p dangerouslySetInnerHTML={{ __html: noticeData.noticeContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} />

                        </Two>
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
    .boardInfo{
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

