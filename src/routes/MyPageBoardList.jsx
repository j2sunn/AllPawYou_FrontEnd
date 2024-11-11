import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import { AllReview, DeleteReview } from "../../service/Review";
// import {loadMine} from "../service/BoardService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import MypageSideBar from "../components/common/MypageSideBar";
// import { AuthApi } from "../service/AuthApi";
const MyPageBoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지쪽수 초기값
  const navigate = useNavigate(); // useNavigate 훅 사용

  const ITEMS_PER_PAGE = 8; // 한 페이지에 표시할 게시글 수
    

    
  const totalPages = Math.ceil(boardList.length / ITEMS_PER_PAGE);
   // 현재 페이지에 해당하는 게시글 슬라이싱
      const currentBoardList = boardList.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
  );
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };
  useEffect(() => {
    scrollTo(0,0);
    let no = localStorage.getItem("no");
    console.log("회원번호 : "+no);
    loadMine(no);
  }, []);
  
  const loadMine = ()=>{
    axios.get("http://localhost:8080/board/myBoard/"+localStorage.getItem("no"))
    .then(resp=>{
      setBoardList(resp.data);
    });
  }


  return (
    <>
      <Container>
        <MypageSideBar />

        <Content>
          <Title>내 글 관리</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EEC759" }}>
                <TableRow>
                  {/* 제목,내용,작성일,좋아요 수,댓글 수,썸네일 
                  썸네일, 제목, 내용, 댓글 수, 좋아요 수, 작성일 순서!*/}
                  <TableCell align="center" sx={{ width: "10rem" }}>
                    썸네일
                  </TableCell>
                  <TableCell align="center" sx={{ width: "30rem" }}>제목</TableCell>
                  <TableCell align="center" sx={{ width: "30rem" }}>내용</TableCell>
                  <TableCell align="center" sx={{ width: "8rem" }}>
                    댓글 수
                  </TableCell>
                  <TableCell align="center" sx={{ width: "8rem" }}>좋아요 수</TableCell>
                  <TableCell align="center" sx={{ width: "10rem" }}>
                    작성일
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {currentBoardList.length>0 ? currentBoardList.map((board,index)=>(
                        <TableRow key={board.boardNo} onClick={() => navigate(`/board/${board.boardNo}`)}>
                        <TableCell align="center">
                          <img
                            key={board.boardNo}
                            src={
                              board.imgList && board.imgList.length > 0 // 이미지 배열이 존재하고 길이가 0보다 큰 경우
                                ? `http://localhost:8080/images/board/${board.imgList[0].boardImageRename}`
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
                    )) : (
                        <>
                            게시글 로딩중입니다.
                        </>
                    )
                }
                
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination>
                    <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>이전</Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button key={i + 1} onClick={() => handlePageChange(i + 1)}
                        className={currentPage == i + 1 ? 'selected' : ''}>{i + 1}</Button>
                    ))}
                    <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>다음</Button>
                </Pagination>
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    .selected{
        background-color: #EEC759;
    }
    Button{
        margin : 5px;
    }
`;