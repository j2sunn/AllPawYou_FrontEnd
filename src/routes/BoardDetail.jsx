import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {loadData,addCommentService,updateCommentList} from "../service/BoardService";
import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { Button} from "@mui/material";
import { IoMdHeartEmpty } from "react-icons/io"; //빈 하트
import { IoHeart } from "react-icons/io5"; //채워진 하트
const BoardDetail = ()=>{ //백업해놨다
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

    const { state } = useLocation();
    const cp = state?.cp;
    console.log("cp : "+cp);
    //************************************************************************************** */
    //************************************************************************************** */
    const [onUpdateCommentNo, setOnUpdateCommentNo] = useState(0); //수정중인 댓글 번호 저장
    const [onUpdateComment, setOnUpdateComment] = useState(""); //수정중인 댓글 내용 저장
    //************************************************************************************** */
    //************************************************************************************** */
    const bNo = useRef(params?.boardNo);  // 초기값을 params.boardNo로 설정
    const [boardData, setBoardData] = useState(null);
    const [commentData,setCommentData] = useState(null); //댓글
    // const [profile, setProfile] = useState({}); //로그인한 회원 정보
    const [error, setError] = useState({});
    const [comment,setComment] = useState(""); //댓글 작성 시 댓글 길이 체크용
    const [result,setResult] = useState("");
    const [likeStatus, setLikeStatus] = useState(0); //로그인 회원이 좋아요 누른지 여부
    // const [loginUserEmail, setLoginUserEmail] = useState(""); //로그인한 회원의 이메일
    // const [writeUserEmail, setWriteUserEmail] = useState(""); //글을 작성한 회원의 이메일
    // 기본값을 0으로 설정
    let loginEmail=useRef("");
    const navigate = useNavigate();
    const updateCommentCnt = ()=>{
        setBoardData(prev => ({...prev, commentCount: prev.commentCount - 1}))
    }
    const loadBoardData = async() => {
        console.log("kokoko : "+bNo.current);
        const response = await loadData(bNo.current);

        if (response) {
            if (response.likeOrNot == 1) {
                // document.querySelector("#like").classList.add("liked");  // 좋아요 상태가 1이면 빨간색으로 설정
                setLikeStatus(1);
            } else {
                // document.querySelector("#like").classList.remove("liked");  // 좋아요 상태가 0이면 기본 상태로 설정
                setLikeStatus(0);
            }
        }
        console.log("받은데이터 : "+response.email); //이게 글 작성자 이메일
        setBoardData(response);
        setCommentData(response.commentList);
        
    }
    // useEffect(() => {
    //     const username = localStorage.getItem("username");
    //     const email = localStorage.getItem("email");
    //     const nickname = localStorage.getItem("nickname");
    //     const intro = localStorage.getItem("intro");
    //     const phone = localStorage.getItem("phone");
    //     const address = localStorage.getItem("address");
    //     const profileImage = localStorage.getItem("profile");
    
    //     // 가져온 데이터를 상태에 설정
    //     if (username && email && nickname && intro && phone && address && profileImage) {
    //         const userData = {
    //         username,
    //         email,
    //         nickname,
    //         intro,
    //         phone,
    //         address,
    //         profileImage,
    //                 };
        
    //         setProfile(userData);
    //     } else {
    //             console.error("사용자 정보가 localStorage에 없습니다.");
    //                 }
    //             }, []);
    
    useEffect(() => {
        loginEmail.current = localStorage.getItem('email');  // 로컬 스토리지에서 토큰을 가져옵니다.
        // console.log("토큰토큰 : "+loginEmail);
        bNo.current = params?.boardNo;  // params가 변경될 때마다 bNo 업데이트
        setBoardNo(bNo.current);  // boardNo 상태 업데이트
        // console.log("boardNo : " + boardNo);
        console.log("bNo : "+bNo.current); 
        // selectOne(boardNo,setBoardData);

        loadBoardData();
        
        console.log("보드데이터"+boardData);    
        console.log("로그인 이메일:", loginEmail.current); //이게 제대로 나온다!
        if(boardData){
            console.log("작성자이메일 : "+boardData.email);
        }
        
        // console.log("comment.email:", comment.email);
        
            // setLikeStatus(boardData.likeOrNot);
            
        
    }, [params?.boardNo]);  // params.boardNo가 변경될 때마다 실행
    // const imgList = boardData.imgList;
    // for(let i=0;i<imgList.length;i++){
    //     console.log(imgList[i].boardImagePath+imgList[i].boardImageRename);
    // }
    // console.log("최종 넘어온 boardData : "+boardData.imgList);
    const handleContentChange = (e)=>{
        setComment(e.target.value);
        
        console.log("comment : "+e.target.value);
        let text=e.target.value.replace(/<script.*?>.*?<\/script>/gi, '');
        setResult(text.replace(/\n/g, '<e>').replace(/ /g, '<s>'));
        console.log("댓글result : "+result);
    }
    const addComment = ()=>{
        if(localStorage.getItem('email') == null){
            alert("로그인 후 댓글 작성이 가능합니다.");
            navigate('/login');
            return;
        }
        if(comment.trim().length==0){
            setError({comment:"댓글을 입력해 주세요."});
            return;
        }
        
        addCommentService(boardNo,result,loginEmail.current,setCommentData);
        document.querySelector("#comment").value="";
        setBoardData(prevBoardData => ({
            ...prevBoardData,
            commentCount: prevBoardData.commentCount + 1
        }));
    }
    // for( let img of (boardData.imgList)){
    //     console.log(img.boardImagePath+img.boardImageRename);
    // }
    // console.log("이미지 : "+boardData?.imgList);
    const toggleLike=(boardNo, loginEmail)=>{
        console.log("boardNo : "+boardNo);
        console.log("loginEmail : "+loginEmail);
        if(localStorage.getItem('email') == null){
            alert("로그인 후 이용해 주세요.");
            navigate('/login');
            return;
        }
        axios.post('http://localhost:8081/board/like/insert', {boardNo, 
            email : loginEmail})
        .then(response => {
            //좋아요 추가/삭제하고 최종 좋아요 개수 반환받아오기
            console.log("업데이트된 좋아요 수 "+response.data);
            setBoardData(prevBoardData => ({
                ...prevBoardData,
                likeCount: response.data
            }));
            // document.querySelector("#like").classList.toggle("liked");
            setLikeStatus(prevLikeStatus => {
                if (prevLikeStatus == 1) setLikeStatus(0); 
                    else setLikeStatus(1);
            })
        });
    }
    const boardDelete = (boardNo)=>{
        console.log("boardNo : "+boardNo);
        if(confirm("정말 삭제하시겠습니까?")){
            axios.delete("http://localhost:8081/board/delete/"+boardNo)
            .then(resp=>{
                console.log("결과느으으은"+resp.data);
                alert("삭제되었습니다.");
                navigate("/boardList");
            })
        }
    }
    const deleteComment = (commentNo)=>{
        if(confirm("정말 삭제하시겠습니까?")){
            axios.delete("http://localhost:8081/board/comment/delete/"+commentNo)
            .then(resp =>{
                console.log("삭제 resp.data : "+resp.data);
                if(resp.data>0){
                    alert("삭제되었습니다.");
                    // window.location.reload();
                    updateCommentCnt();
                    updateCommentList(boardNo,setCommentData);
                }else{
                    alert("삭제에 실패하였습니다.");
                }
            })
        }
        
    }

    //댓글 수정 API 요청
    const updateComment = (onUpdateComment,onUpdateCommentNo)=>{
        axios.put('http://localhost:8081/board/comment/update', {
            commentContent :onUpdateComment,
            commentNo : onUpdateCommentNo})
        .then(resp=>{
            console.log("수정 resp.data : "+resp.data);
            if(resp.data>0){
                alert("댓글이 수정되었습니다.");
                // window.location.reload();
                setTimeout(()=>navigate("/board/"+boardNo),1000);
                // updateCommentList(boardNo,setCommentData);
            }else{
                alert("수정에 실패하였습니다.");
            }
        })
    }
    return (
        <>


            
        
            <div>
                
                {boardData ? (
                    <>
                    <Container>
                        <One style={{marginTop: '3rem'}}>
                            <Div >  {boardData.category === 1 
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
                                {boardData.email == loginEmail.current ? (
                                    <>
                                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem'}} 
                                            onClick={() => navigate(`/boardUpdate`,{state:{ boardNo : boardData.boardNo}})}        >
                                            수정
                                        </Button>
                                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem',marginLeft: '1rem'}} 
                                            onClick={() => boardDelete(boardData.boardNo)}        >
                                            삭제
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                                            
                                
                                
                                
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
                                
                                
                            </>
                        
                        ) : (
                            <p>이미지가 없습니다.</p>
                        )}
                        <div className="like" onClick={()=>toggleLike(boardNo, loginEmail.current)}>
                            
                                {likeStatus ==1 ? (
                                        <IoHeart className="heart"/>
                                    ) : (
                                        <IoMdHeartEmpty className="heart"/>
                                    )}
                                    <p className="likeNum">{boardData.likeCount}</p>
                            
                                    
                        </div>
                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem'}} 
                                        onClick={() => navigate(`/boardList`,{state:{ cp : cp}})}  
                                        >
                                            목록으로
                                        </Button>
                        </Three>
                        <Four>
                            <div className="commentBoxes">
                                <p className="commentCount">댓글({boardData.commentCount})</p>
                                <Button variant="contained" sx={{fontSize: '1rem', width:'6rem',marginLeft: 'auto',height:'2.7rem',marginTop: '0.5rem'}}  
                                            onClick={()=>addComment()}  
                                            >
                                                작성하기
                                            </Button>
                            </div>
                        
                        <ContentTextarea id="comment" onChange={(e) => handleContentChange(e)}/>
                        <Error>{error.comment}</Error>
                        
                        {/* <button onClick={()=>addComment()}>작성하기</button> */}
                        {commentData && commentData.length > 0 ? (
                            commentData.map((comment,ind)=>
                                
                                <div className="commentProfile" key={ind}>
                                    {/* 여기까지만 */}
                                    
                                    <div className="commentInfo">
                                        {onUpdateCommentNo == comment.commentNo ? (
                                            <>
                                                {/* 수정중인 경우 */}
                                                {/* <textarea placeholder="수정할 내용을 작성해주세요" 
                                                value={onUpdateComment}
                                                onChange={(e) => setOnUpdateComment(e.target.value)}
                                                /> */}
                                                <ContentTextarea 
                                                placeholder={comment.commentContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />")} 
                                                value={onUpdateComment}
                                                onChange={(e) => setOnUpdateComment(e.target.value)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {/* 수정중이지 않은 경우 */}
                                                {/* 댓글 작성자 프로필이미지 */}
                                                <img src="http://localhost:8080/images/board/happy.png"/>
                                                <p>{comment.commentUsername}</p>
                                                {/* <p dangerouslySetInnerHTML={{ __html: boardData.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} /> */}
                                                <p dangerouslySetInnerHTML={{ __html: comment.commentContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} />
                                                {/* <p>{comment.commentContent}</p> */}
                                            </>
                                        )}    
                                        
                                    </div>
                                    <div>
                                        <p>{comment.commentDate.substr(0,4)+"."+
                                                comment.commentDate.substr(5,2)+"."+
                                                comment.commentDate.substr(8,2)+"  "+
                                                comment.commentDate.substr(11,2)+"."+
                                                comment.commentDate.substr(14,2)
                                                }
                                        </p>
                                        <div className="commentBtns">
                                        {loginEmail.current === comment.email && onUpdateCommentNo !== comment.commentNo ? (
                                                <>   
                                                    {/* 로그인한 회원이 작성자인데 수정 중이 아닐 경우 */}
                                                    <Button variant="contained" sx={{ fontSize: '1rem', marginTop: '1rem' }}
                                                    onClick={()=>setOnUpdateCommentNo(comment.commentNo)}>
                                                        수정
                                                    </Button>
                                                    <Button
                                                        onClick={() => deleteComment(comment.commentNo)}
                                                        variant="contained"
                                                        sx={{ fontSize: '1rem', marginTop: '1rem', marginLeft: '1rem' }}
                                                        
                                                    >
                                                        삭제
                                                    </Button>
                                                </>
                                            ) : loginEmail.current === comment.email && onUpdateCommentNo === comment.commentNo ? (
                                                <>
                                                    {/* 로그인한 회원이 작성자인데 수정 중인 경우 */}
                                                    {/* 수정 중일 때 보여줄 JSX 컴포넌트를 여기에 추가 */}
                                                    
                                                    <Button variant="contained" sx={{ fontSize: '1rem', marginTop: '1rem' }}
                                                    onClick={()=>updateComment(onUpdateComment,onUpdateCommentNo)}
                                                    >
                                                        저장
                                                    </Button>
                                                    <Button
                                                        
                                                        variant="contained"
                                                        sx={{ fontSize: '1rem', marginTop: '1rem', marginLeft: '1rem' }}
                                                        onClick={()=>setOnUpdateCommentNo(0)}
                                                    >
                                                        취소
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    {/* 로그인한 회원이 작성자가 아닐 경우 */}
                                                    {/* 다른 사용자에게 보여줄 JSX 컴포넌트를 여기에 추가 */}
                                                </>
                                            )}


                                            
                                        </div>
                                    </div>
                                </div>
                        
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
        &:hover{
            cursor: pointer;
        }
        width : 100px;
        height : 100px;
        margin-top : 30px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .heart{
        color : red;
        font-weight : bold;
        font-size : 40px;
    }
    .likeNum{
        font-size : 20px;
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
    .commentBoxes{
        display : flex;
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

