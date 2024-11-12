import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addCommentService } from "../service/BoardService";
import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from "@mui/material";
import { IoMdHeartEmpty } from "react-icons/io"; //빈 하트
import { IoHeart } from "react-icons/io5"; //채워진 하트
import Swal from "sweetalert2";
const BoardDetail = () => {
  //1110작업 전에 백업해놨다
  /*
    Swal.fire({
      icon: "success",
      title: "로그아웃 되었습니다.",
      confirmButtonColor: "#527853",
      confirmButtonText: "닫기",
    });
    
    
    
    */
  const params = useParams();

  const { state } = useLocation();

  const cp = state?.cp.currentPage;
  const selectedCategory = state?.selectedCategory.selectedCategory;
  const searchOpt = state?.searchOpt.searchOpt;
  const keyword = state?.keyword.keyword;

  //************************************************************************************** */
  //************************************************************************************** */
  const [onUpdateCommentNo, setOnUpdateCommentNo] = useState(0); //수정중인 댓글 번호 저장
  const [onUpdateComment, setOnUpdateComment] = useState(""); //수정중인 댓글 내용 저장
  //************************************************************************************** */
  //************************************************************************************** */
  const bNo = useRef(params?.boardNo); // 초기값을 params.boardNo로 설정
  const [boardNo, setBoardNo] = useState(params?.boardNo);
  const [boardData, setBoardData] = useState(null);
  const [commentData, setCommentData] = useState(null); //댓글
  // const [profile, setProfile] = useState({}); //로그인한 회원 정보
  const [error, setError] = useState({});
  const [comment, setComment] = useState(""); //댓글 작성 시 댓글 길이 체크용
  const [result, setResult] = useState("");
  //==============================================================================
  const [isBoardAuthor, setIsBoardAuthor] = useState(false); //게시글 작성자 여부
  const [isLiked, setIsLiked] = useState(0); //좋아요 여부
  //==============================================================================
  const navigate = useNavigate();
  let no = 0; //로그인한 회원 번호
  useEffect(() => {
    bNo.current = params?.boardNo; // params가 변경될 때마다 bNo 업데이트
    setBoardNo(bNo.current); // boardNo 상태 업데이트

    if (localStorage.getItem("no") != null) {
      no = Number(localStorage.getItem("no"));
    }
    renew();

    console.log("이펙트:" + no);
  }, [params?.boardNo]);
  const renew = () => {
    //게시글 전체 정보 새로 불러오기
    loadData(boardNo).then((resp) => {
      setBoardData(resp);
      setCommentData(resp.commentList); //댓글리스트
      // const updatedCommentData = resp.commentList.map(comment => ({
      //     ...comment,
      //     canEdit: comment.no === boardData.no
      // }));
      // setCommentData(updatedCommentData);
      console.log("포" + resp.likeOrNot);
      setIsLiked(resp.likeOrNot);
    });
  };

  //글 정보 새로 불러오기
  const loadData = async (boardNo) => {
    no = Number(localStorage.getItem("no"));

    const response = await axios.get("http://localhost:8081/board/" + boardNo + "/" + no);
    return response.data;
  };

  const handleContentChange = (e) => {
    setComment(e.target.value);

    let text = e.target.value.replace(/<script.*?>.*?<\/script>/gi, "");
    setResult(text.replace(/\n/g, "<e>").replace(/ /g, "<s>"));
  };

  const goCreateMessage = () => {
    if (localStorage.getItem("email") == null) {
        Swal.fire({
          title: "로그인 하시겠습니까?",
          text: "로그인 후에 쪽지 기능 이용이 가능합니다.",
          icon: "warning",
  
          showCancelButton: true, // false가 default
          confirmButtonColor: "#527853",
          cancelButtonColor: "#d33",
          confirmButtonText: "이동",
          cancelButtonText: "취소",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
            return;
          } else {
            setError({ ...error, comment: "" });
          }
        });
      }else{

          const width = 650; // 팝업의 너비
          const height = 500; // 팝업의 높이
          const left = window.innerWidth / 2 - width / 2; // 화면 중앙에 위치
          const top = window.innerHeight / 2 - height / 2; // 화면 중앙에 위치
          
          window.open(
              "/mypage/createMessage",
              "popup",
              `width=${width},height=${height},top=${top},left=${left},scrollbars=no`
            );
        }
  };

  const addComment = () => {
    if (localStorage.getItem("email") == null) {
      Swal.fire({
        title: "로그인 하시겠습니까?",
        text: "로그인 후에 댓글 작성이 가능합니다.",
        icon: "warning",

        showCancelButton: true, // false가 default
        confirmButtonColor: "#527853",
        cancelButtonColor: "#d33",
        confirmButtonText: "이동",
        cancelButtonText: "취소",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        } else {
          setError({ ...error, comment: "" });
        }
      });
    }
    if (comment.trim().length == 0) {
      setError({ comment: "댓글을 입력해 주세요." });
      return;
    }
    addCommentService(boardNo, result, localStorage.getItem("email"), setCommentData, renew);
    document.querySelector("#comment").value = "";
    setBoardData((prevBoardData) => ({
      ...prevBoardData,
      commentCount: prevBoardData.commentCount + 1,
    }));
    renew();
    setResult("");
    setComment("");
    setError({ ...error, comment: "" });
  };

  const toggleLike = (boardNo, loginEmail) => {
    if (localStorage.getItem("email") == null) {
      Swal.fire({
        title: "로그인 하시겠습니까?",
        text: "로그인 후 좋아요 표시가 가능합니다.",
        icon: "warning",

        showCancelButton: true, // false가 default
        confirmButtonColor: "#527853",
        cancelButtonColor: "#d33",
        confirmButtonText: "이동",
        cancelButtonText: "취소",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        }
      });
    }

    axios
      .post("http://localhost:8081/board/like/insert", {
        boardNo,
        email: loginEmail,
      })
      .then((response) => {
        // loadData(boardNo,setBoardData);
        // setIsLiked(prev => prev==0 ? 1 : 0);
        renew();
      });
  };
  const boardDelete = (boardNo) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 시 돌이킬 수 없습니다.",
      icon: "warning",

      showCancelButton: true, // false가 default
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8081/board/delete/" + boardNo).then((resp) => {
          Swal.fire({
            icon: "success",
            title: "삭제 성공",
            text: "게시글이 성공적으로 삭제되었습니다.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });

          navigate("/boardList");
        });
      }
    });
  };
  const deleteComment = (commentNo) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 시 돌이킬 수 없습니다.",
      icon: "warning",

      showCancelButton: true, // false가 default
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8081/board/comment/delete/" + commentNo).then((resp) => {
          if (resp.data > 0) {
            Swal.fire({
              icon: "success",
              title: "삭제 성공",
              text: "댓글이 성공적으로 삭제되었습니다.",
              confirmButtonColor: "#527853",
              confirmButtonText: "닫기",
            });
            setTimeout(() => {
              renew();
            }, 500);
          } else {
            Swal.fire({
              title: "삭제 실패",
              text: "삭제 중 오류가 발생했습니다. 다시 시도해 주세요.",
              icon: "warning",

              confirmButtonColor: "#527853",
              confirmButtonText: "확인",

              reverseButtons: true,
            });
          }
        });
      }
    });
  };

  //댓글 수정 API 요청
  const updateComment = (onUpdateComment, onUpdateCommentNo) => {
    if (onUpdateComment.trim().length == 0) {
      Swal.fire({
        icon: "warning",
        title: "내용이 없습니다.",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
      return;
    }

    axios
      .put("http://localhost:8081/board/comment/update", {
        commentContent: onUpdateComment,
        commentNo: onUpdateCommentNo,
      })
      .then((resp) => {
        if (resp.data > 0) {
          Swal.fire({
            icon: "success",
            title: "수정 성공",
            text: "댓글이 성공적으로 수정되었습니다.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });

          // loadData(boardNo,setBoardData);
          setTimeout(() => {
            setOnUpdateCommentNo(0);
            renew();
          }, 500);
        } else {
          Swal.fire({
            title: "삭제 실패",
            text: "삭제 중 오류가 발생했습니다. 다시 시도해 주세요.",
            icon: "warning",

            confirmButtonColor: "#527853",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",

            reverseButtons: true,
          });
        }
      });
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        {boardData ? (
          <>
            <Container>
              <DetailHeader style={{ marginTop: "3rem" }}>
                <Div>
                  {" "}
                  {boardData.category === 1
                    ? "강아지"
                    : boardData.category === 2
                    ? "고양이"
                    : "기타"}
                </Div>
                <div style={{ fontSize: "2rem" }}>{boardData.boardTitle}</div>
                <Profile>
                  <BoardWriter>
                    <img
                      src={
                        boardData.boardProfile != null
                          ? `http://localhost:8081${boardData.boardProfile}`
                          : `http://localhost:8081/file/images/profile/defaultprofile.png`
                      }
                    />
                    <div style={{ marginLeft: "1.5rem" }}>
                      <WriterInfo>
                        <div
                          style={{ marginRight: "1rem", fontSize: "1.5rem" }}
                        >
                          {boardData.boardUsername}
                        </div>
                        {localStorage.getItem("no") != boardData.no ? (
                          <Button
                            variant="contained"
                            sx={{ height: "2rem" }}
                            onClick={goCreateMessage}
                          >
                            쪽지
                          </Button>
                        ) : (
                          <></>
                        )}
                      </WriterInfo>
                      <div
                        style={{
                          marginTop: "0.5rem",
                          color: "rgba(0,0,0,0.6)",
                        }}
                      >
                        {boardData.boardDate.substr(0, 4) +
                          "." +
                          boardData.boardDate.substr(5, 2) +
                          "." +
                          boardData.boardDate.substr(8, 2) +
                          "  " +
                          boardData.boardDate.substr(11, 2) +
                          ":" +
                          boardData.boardDate.substr(14, 2)}
                      </div>
                    </div>
                  </BoardWriter>
                  <div className="btns">
                    {boardData.no == localStorage.getItem("no") ? (
                      <>
                        <Button
                          variant="contained"
                          sx={{ fontSize: "1rem", marginTop: "1rem" }}
                          onClick={() =>
                            navigate(`/boardUpdate`, {
                              state: { boardNo: boardNo },
                            })
                          }
                        >
                          수정
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            fontSize: "1rem",
                            marginTop: "1rem",
                            marginLeft: "1rem",
                          }}
                          onClick={() => boardDelete(boardData.boardNo)}
                        >
                          삭제
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "1rem",
                        marginTop: "1rem",
                        marginLeft: "1rem",
                      }}
                      onClick={() =>
                        navigate(`/boardList`, {
                          state: {
                            cp: cp,
                            selectedCategory: selectedCategory,
                            searchOpt: searchOpt,
                            keyword: keyword,
                          },
                        })
                      }
                    >
                      목록으로
                    </Button>
                  </div>
                </Profile>
              </DetailHeader>

              <BoardText>
                {/* <p>{boardData.boardContent.replace(/<s>/g," ").replace(/<e>/g,"\n")}</p> */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: boardData.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />"),
                  }}
                />
              </BoardText>
              <BoardImages>
                {boardData.imgList && boardData.imgList.length > 0 ? (
                  <>
                    {boardData.imgList.map((img, index) => (
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
                <div className="like" onClick={() => toggleLike(boardNo, localStorage.getItem("email"))}>
                  {isLiked == 1 ? <IoHeart className="heart" /> : <IoMdHeartEmpty className="heart" />}
                  <p className="likeNum">{boardData.likeCount}</p>
                </div>
                <Button
                  variant="contained"
                  sx={{ fontSize: "1rem", marginTop: "1rem" }}
                  onClick={() =>
                    navigate(`/boardList`, {
                      state: {
                        cp: cp,
                        selectedCategory: selectedCategory,
                        searchOpt: searchOpt,
                        keyword: keyword,
                      },
                    })
                  }
                >
                  목록으로
                </Button>
              </BoardImages>
              <Comments>
                <CommentHeader>
                  <div className="commentCount">
                    댓글({boardData.commentCount})
                  </div>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "1rem",
                      marginLeft: "auto",
                      height: "2.5rem",
                    }}
                    onClick={() => addComment()}
                  >
                    작성하기
                  </Button>
                </CommentHeader>

                <ContentTextarea id="comment" onChange={(e) => handleContentChange(e)} />
                <Error>{error.comment}</Error>

                {/* <button onClick={()=>addComment()}>작성하기</button> */}
                {commentData && commentData.length > 0 ? (
                  commentData.map((comments, ind) => (
                    <Comment key={ind}>
                      <div style={{ width: "80%" }}>
                        {onUpdateCommentNo == comments.commentNo ? (
                          <>
                            {/* 수정중인 경우 */}
                            {/* <textarea placeholder="수정할 내용을 작성해주세요" 
                                                value={onUpdateComment}
                                                onChange={(e) => setOnUpdateComment(e.target.value)}
                                                /> */}
                            <ContentTextarea
                              placeholder={comments.commentContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />")}
                              value={onUpdateComment}
                              onChange={(e) => setOnUpdateComment(e.target.value)}
                              style={{ width: "600px" }}
                            />
                          </>
                        ) : (
                          <div style={{ display: "flex", flexDirection: 'column' }}>
                            {/* 수정중이지 않은 경우 */}
                            {/* 댓글 작성자 프로필이미지 */}
                            <CommentWriter>
                              <img
                                style={{ marginBlock: "1rem" }}
                                src={
                                  comments.commentProfile != null
                                    ? `http://localhost:8081${comments.commentProfile}`
                                    : `http://localhost:8081/file/images/profile/defaultprofile.png`
                                }
                              />
                              <div style={{display: 'flex', alignItems: 'center' }}>
                                <div style={{fontSize: '1.2rem'}}>{comments.commentUsername}</div>
                                {localStorage.getItem("no") != comments.no ? (
                                  <Button
                                    variant="contained"
                                    onClick={goCreateMessage}
                                    sx={{
                                      fontSize: "1rem",
                                      width: '3rem',
                                      height: "2rem",
                                      marginLeft: '1rem'
                                    }}
                                  >
                                    쪽지
                                  </Button>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </CommentWriter>

                            {/* <p dangerouslySetInnerHTML={{ __html: boardData.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} /> */}
                            <div
                              style={{ width: "100%" }}
                              dangerouslySetInnerHTML={{
                                __html: comments.commentContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />"),
                              }}
                            />
                            {/* <p>{comment.commentContent}</p> */}
                          </div>
                        )}
                      </div>
                      <div>
                        <p>
                          {comments.commentDate.substr(0, 4) +
                            "." +
                            comments.commentDate.substr(5, 2) +
                            "." +
                            comments.commentDate.substr(8, 2) +
                            "  " +
                            comments.commentDate.substr(11, 2) +
                            ":" +
                            comments.commentDate.substr(14, 2)}
                        </p>
                        <Buttons>
                          {localStorage.getItem("email") === comments.email &&
                          onUpdateCommentNo !== comments.commentNo ? (
                            <>
                              {/* 로그인한 회원이 작성자인데 수정 중이 아닐 경우 */}
                              <Button
                                variant="contained"
                                sx={{ fontSize: "1rem", marginTop: "1rem" }}
                                onClick={() => {
                                  setOnUpdateComment(comments.commentContent),
                                    setOnUpdateCommentNo(comments.commentNo);
                                }}
                              >
                                수정
                              </Button>
                              <Button
                                onClick={() => deleteComment(comments.commentNo)}
                                variant="contained"
                                sx={{
                                  fontSize: "1rem",
                                  marginTop: "1rem",
                                  marginLeft: "1rem",
                                }}
                              >
                                삭제
                              </Button>
                            </>
                          ) : localStorage.getItem("email") === comments.email && onUpdateCommentNo === comments.commentNo ? (
                            <>
                              {/* 로그인한 회원이 작성자인데 수정 중인 경우 */}
                              {/* 수정 중일 때 보여줄 JSX 컴포넌트를 여기에 추가 */}

                              <Button
                                variant="contained"
                                sx={{ fontSize: "1rem", marginTop: "1rem" }}
                                onClick={() => updateComment(onUpdateComment, onUpdateCommentNo)}
                              >
                                저장
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  fontSize: "1rem",
                                  marginTop: "1rem",
                                  marginLeft: "1rem",
                                }}
                                onClick={() => setOnUpdateCommentNo(0)}
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
                        </Buttons>
                      </div>
                    </Comment>
                  ))
                ) : (
                  <NoData>댓글이 없습니다.</NoData>
                )}
              </Comments>
            </Container>

            <hr />
          </>
        ) : (
          <p>게시글을 로딩 중...</p>
        )}
      </div>
    </>
  );
};
export default BoardDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  background-color: #eec759;
  margin-right: 10px;
  width: 100px;
  font-weight: bold;
  border-radius: 40px;
  text-align: center;
  padding: 7px;
  margin-bottom: 1rem;
`;

const DetailHeader = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border-bottom: 3px solid gray;
  padding: 1rem 0;
  margin: 2rem 0;
  .profile .btns {
    margin-left: auto;
  }
  p {
    font-size: 30px;
  }
  img {
    width: 80px;
    height: 80px;
  }
  .boardInfo {
    display: flex;
    align-items: center;
    p {
      margin: 0px 10px;
      font-size: 20px;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
`;

const BoardWriter = styled.div`
  display: flex;
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
`;

const BoardText = styled.div`
  width: 50%;
  font-size: 1.2rem;
`;

const BoardImages = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  img {
    max-width: 1300px;
  }
  .like {
    &:hover {
      cursor: pointer;
    }
    width: 100px;
    height: 100px;
    margin-top: 30px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .heart {
    color: red;
    font-weight: bold;
    font-size: 40px;
  }
  .likeNum {
    font-size: 20px;
  }
`;

const Comments = styled.div`
  border-top: 3px solid gray;
  padding: 1rem 0;
  margin: 2rem 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .commentCount {
    font-size: 1.5rem;
  }
  img {
    width: 60px;
    height: 60px;
    margin-right: 1rem;
  }
  .commentBoxes {
    display: flex;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

//댓글
const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  font-size: 1rem;
  border: 1px solid #ccc;
  resize: vertical; /* 사용자가 세로 크기 조정 가능 */

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
`;

const CommentWriter = styled.div`
  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  width: 100%;
`;

const Error = styled.div`
  color: red;
`;

const NoData = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  margin: 3rem 0;
`;
