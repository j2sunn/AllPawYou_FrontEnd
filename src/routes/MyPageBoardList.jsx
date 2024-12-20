import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
  const currentBoardList = boardList.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

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
    axios
      .get("http://localhost:8081/board/myBoard/" + localStorage.getItem("no"))
      .then((response) => {
        setBoardList(response.data);
      });
  };

  return (
    <Box>
      <MypageSideBar />
      <Container>
        <Content>
          <Title>내 글 관리</Title>
          <TableContainer
            component={Paper}
            sx={{
              width: "90%",
              marginTop: "3rem",
              marginLeft: "3rem",
              boxShadow: "none",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderTop: "2px solid rgba(0,0,0,0.8)",
                    borderBottom: "2px solid rgba(0,0,0,0.8)",
                  }}
                >
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
                {boardList.length > 0 ? (
                  currentBoardList.map((board) => (
                    <TableRow
                      key={board.boardNo}
                      onClick={() => navigate(`/board/${board.boardNo}`)}
                    >
                      <TableCell align="center">
                        {board.imgList && board.imgList.length > 0 ? (
                          <img
                            key={board.boardNo}
                            src={`http://localhost:8081/images/board/${board.imgList[0].boardImageRename}`}
                            alt={board.imgList[0].boardImageRename}
                            style={{ width: "5rem", height: "5rem" }}
                          />
                        ) : (
                          <></>
                        )}
                      </TableCell>
                      <TableCell align="center">{board.boardTitle}</TableCell>
                      <TableCell align="center">
                        {
                          board.boardContent
                            .replace(/<e>/g, " ")
                            .replace(/<s>/g, " ")
                            .split("\n")[0]
                        }
                      </TableCell>
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
    </Box>
  );
};

export default MyPageBoardList;

const Box = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
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
