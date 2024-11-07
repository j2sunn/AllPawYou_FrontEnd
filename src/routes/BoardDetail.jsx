import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {loadData,addCommentService} from "../service/BoardService";
import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
const BoardDetail = ()=>{
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
    const [boardNo, setBoardNo] = useState(0);
    const bNo = useRef(params?.boardNo);  // 초기값을 params.boardNo로 설정
    const [boardData, setBoardData] = useState(null);
    const [commentData,setCommentData] = useState(null); //댓글
    const loginEmail = localStorage.getItem('email');  // 로컬 스토리지에서 토큰을 가져옵니다.
    const [error, setError] = useState({});
    const [comment,setComment] = useState("");
    useEffect(() => {
        console.log("토큰토큰 : "+loginEmail);
        bNo.current = params?.boardNo;  // params가 변경될 때마다 bNo 업데이트
        setBoardNo(bNo.current);  // boardNo 상태 업데이트
        // console.log("boardNo : " + boardNo);
        console.log("bNo : "+bNo.current); 
        // selectOne(boardNo,setBoardData);

        loadData(bNo.current,setBoardData,setCommentData);
        console.log("data : "+boardData);    
        
    }, [params?.boardNo]);  // params.boardNo가 변경될 때마다 실행
    // const imgList = boardData.imgList;
    // for(let i=0;i<imgList.length;i++){
    //     console.log(imgList[i].boardImagePath+imgList[i].boardImageRename);
    // }
    // console.log("최종 넘어온 boardData : "+boardData.imgList);
    
    const handleContentChange = (e)=>{
        setComment(e.target.value);
        
        console.log("comment : "+comment);

    }
    const addComment = ()=>{
        if(comment.trim().length==0){
            setError({comment:"댓글을 입력해 주세요."});
            return;
        }
        addCommentService(boardNo,comment,loginEmail,setCommentData);
    }
    console.log("=======================");
    // for( let img of (boardData.imgList)){
    //     console.log(img.boardImagePath+img.boardImageRename);
    // }
    // console.log("이미지 : "+boardData?.imgList);
    return (
        <>


            
        
            <div>
                
                {boardData ? (
                    <>
                    <Container>
                        <One>
                            <Div>  {boardData.category === 1 
                                        ? "강아지" 
                                        : boardData.category === 2 
                                            ? "고양이" 
                                            : "기타"}
                            </Div>
                            <p>{boardData.boardTitle}</p>
                            <div className="profile">
                                {/* 글 작성자 프로필이미지 */}
                                <img src="http://localhost:8081/images/board/happy.png"/>
                                <div className="boardInfo">
                                    <p>{boardData.boardUsername}</p>
                                    <p>{boardData.boardDate.substr(0,4)+"."+
                                        boardData.boardDate.substr(5,2)+"."+
                                        boardData.boardDate.substr(8,2)+"  "+
                                        boardData.boardDate.substr(11,2)+"."+
                                        boardData.boardDate.substr(14,2)
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
                            <p dangerouslySetInnerHTML={{ __html: boardData.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} />

                        </Two>
                        <Three>
                        {boardData.imgList && boardData.imgList.length > 0 ? (
                            
                                
                            <>
                                    {(boardData.imgList).map((img, index) => (
                                        <div key={index} style={{ margin: "10px" }}>
                                            {/* <hr/>
                                            <hr/>
                                            <hr/> */}
                                            <img src={`http://localhost:8081${img.boardImagePath}${img.boardImageRename}`} alt={`Image ${index}`} />
                                            
                                            {/* <img src={"http://localhost:8080/images/board/happy.png"}/> */}
                                            {/* <img
                                                src={`http://localhost:3000${img.boardImagePath}${img.boardImageRename}`}
                                                alt={`Image ${index}`}
                                                style={{ width: "100px", height: "100px" }}
                                            /> */}
                                        </div> 
                                    ))}
                                <div className="like">
                                    <AiOutlineLike style={{ fontSize: "60px", color: "red" }}/>
                                    <p>{boardData.likeCount}</p>
                                </div>
                                
                            </>
                        
                        ) : (
                            <p>이미지가 없습니다.</p>
                        )}
                        </Three>
                        <Four>
                        <p className="commentCount">댓글({boardData.commentCount})</p>
                        <ContentTextarea onChange={(e) => handleContentChange(e)}/>
                        <Error>{error.comment}</Error>
                        <button onClick={()=>addComment()}>작성하기</button>
                        {commentData && commentData.length > 0 ? (
                            commentData.map((comment,ind)=>
                                <>
                                <div className="commentProfile" key={ind}>
                                    
                                    <div className="commentInfo">
                                        {/* 댓글 작성자 프로필이미지 */}
                                        <img src="http://localhost:8081/images/board/happy.png"/>
                                        <p>{boardData.boardUsername}</p>
                                        <p>저희 강아지는 손 요즘 너무 잘 하더라구요!!!</p>
                                    </div>
                                    <div>
                                        <p>{boardData.boardDate.substr(0,4)+"."+
                                                boardData.boardDate.substr(5,2)+"."+
                                                boardData.boardDate.substr(8,2)+"  "+
                                                boardData.boardDate.substr(11,2)+"."+
                                                boardData.boardDate.substr(14,2)
                                                }
                                            </p>
                                        <div className="commentBtns">
                                            <button>수정</button>
                                            <button>삭제</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )
                        ) : (
                            <>
                                댓글이 없습니다.
                            </>
                        )}
                            
                        </Four>
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
export default BoardDetail;
const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    
`;
const Div = styled.div`
    background-color: #EEC759;
        margin-right : 10px;
        width : 100px;
        font-weight: bold;
        border-radius: 40px;
        text-align: center;
        padding : 7px;
        
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
const Three = styled.div`
    width : 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    img{
        max-width: 1300px;
    }
    .like{
        width : 100px;
        height : 100px;
        border: 1px solid black;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const Four = styled.div`
    border-top : 3px solid gray;
    width : 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .commentCount{
        font-size : 35px;
    }
    img{
        width : 60px;
        height : 60px;
    }
    .commentProfile{
        display: flex;
        justify-content: space-between;
        padding : 10px;
    }
    .commentProfile:not(:last-child){
        border-bottom: 1px solid gray;
        
    }
`;
//댓글
const ContentTextarea = styled.textarea`
    width: 100%;
    col : 2;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 100px;
    resize: vertical; /* 사용자가 세로 크기 조정 가능 */

    &:focus {
        outline: none;
        border-color: #6c63ff;
    }
`;
const Error = styled.div`
    color: red;
`;

