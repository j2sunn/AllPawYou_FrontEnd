import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import { AllReview, DeleteReview } from "../../service/Review";
// import {loadMine} from "../service/BoardService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MypageSideBar from "../components/common/MypageSideBar";
// import { AuthApi } from "../service/AuthApi";
const MyPageBoardList = () => {
  const [boardList, setBoardList] = useState([]);

  const navigate = useNavigate(); // useNavigate 훅 사용

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const messagesPerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = boardList.slice(indexOfFirstMessage, indexOfLastMessage);

  const totalPages = Math.ceil(boardList.length / messagesPerPage); // 전체 페이지 수
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    scrollTo(0, 0);
    let no = localStorage.getItem("no");
    console.log("회원번호 : " + no);
    loadMine(no);
  }, []);

  const loadMine = () => {
    axios.get("http://localhost:8081/board/myBoard/" + localStorage.getItem("no")).then((resp) => {
      setBoardList(resp.data);
    });
  };

  return (
    <>
      <Container>
        <MypageSideBar />

        <Content>
          <Title>내 글 관리</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem", marginLeft: "3rem", boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ borderTop: "2px solid rgba(0,0,0,0.8)", borderBottom: "2px solid rgba(0,0,0,0.8)" }}>
                  {/* 제목,내용,작성일,좋아요 수,댓글 수,썸네일 
                  썸네일, 제목, 내용, 댓글 수, 좋아요 수, 작성일 순서!*/}
                  <TableCell align="center" sx={{ width: "10rem" }}>
                    썸네일
                  </TableCell>
                  <TableCell align="center" sx={{ width: "30rem" }}>
                    제목
                  </TableCell>
                  <TableCell align="center" sx={{ width: "30rem" }}>
                    내용
                  </TableCell>
                  <TableCell align="center" sx={{ width: "8rem" }}>
                    댓글 수
                  </TableCell>
                  <TableCell align="center" sx={{ width: "8rem" }}>
                    좋아요 수
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10rem" }}>
                    작성일
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              {currentMessages.length>0 ? currentMessages.map((board,index)=>(
                        <TableRow key={board.boardNo} onClick={() => navigate(`/board/${board.boardNo}`)}>
                        <TableCell align="center">
                          {board.imgList && board.imgList.length > 0 ? (
                            <img
                            key={board.boardNo}
                            src={
                               `http://localhost:8081/images/board/${board.imgList[0].boardImageRename}`
                                
                            }
                            alt={ board.imgList[0].boardImageRename } 
                            style={{ width: "5rem", height: "5rem" }}
                          />
                          ) : (
                                <>
                                </>
                          )}
                          
                        </TableCell>
                        <TableCell align="center">{board.boardTitle}</TableCell>
                        <TableCell align="center">{board.boardContent.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0]}</TableCell>
                        <TableCell align="center">{board.commentCount}</TableCell>
                        <TableCell align="center">{board.likeCount}</TableCell>
                        <TableCell align="center">{board.boardDate}</TableCell>
                      </TableRow>
                    )) : (
                        <>
                            게시글 로딩중입니다.
                        </>
                    )
                }
                

                  {currentMessages.length > 0 ? (
                    currentMessages.map((board) => (
                      <TableRow key={board.boardNo} sx={{ borderTop: "2px solid rgba(0,0,0,0.3)", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                        <TableCell align="center">
                          <img
                            key={board.boardNo}
                            src={
                              board.imgList && board.imgList.length > 0 // 이미지 배열이 존재하고 길이가 0보다 큰 경우
                                ? `http://localhost:8081/images/board/${board.imgList[0].boardImageRename}`
                                : null // 이미지가 없으면 null
                            }
                            alt={board.imgList && board.imgList.length > 0 ? board.imgList[0].boardImageRename : "이미지가 없습니다."} // 이미지가 없을 때 대체 텍스트
                            style={{ width: "5rem", height: "5rem" }}
                          />
                        </TableCell>
                        <TableCell align="center">{board.boardTitle}</TableCell>
                        <TableCell align="center">{board.boardContent.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0]}</TableCell>
                        <TableCell align="center">{board.commentCount}</TableCell>
                        <TableCell align="center">{board.likeCount}</TableCell>
                        <TableCell align="center">{board.boardDate}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <>게시글 로딩중입니다.</>
                  )}

              </TableBody>
            </Table>
          </TableContainer>

          <Pages>
            {totalPages > 1 && (
              <Pagination
                count={totalPages} // 총 페이지 수
                page={currentPage} // 현재 페이지
                onChange={handlePageChange} // 페이지 변경 핸들러
                siblingCount={2} // 현재 페이지 주변에 보이는 페이지 수
                boundaryCount={2} // 처음과 끝에 보이는 페이지 수
                color="primary"
              />
            )}
          </Pages>
        </Content>
      </Container>
    </>
  );
};

export default MyPageBoardList;

const Container = styled.div`
  display: flex;
`;

const SideBarTitle = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
`;

const Title = styled(SideBarTitle)`
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

const Content = styled.div`
  width: 100%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
