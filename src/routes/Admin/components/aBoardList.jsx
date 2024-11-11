import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loadList } from "../../../service/BoardService";
import { AuthApi } from "../../../service/AuthApi";
const AdminBoardList = () => {

  const [boardList, setBoardList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지쪽수 초기값
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [hideYN, setHideYN] = useState(false);
  const ITEMS_PER_PAGE = 8; // 한 페이지에 표시할 게시글 수
    

  useEffect(() => {
    loadList();
  }, []);
  const loadList = ()=>{
    AuthApi.get("http://localhost:8081/board/adminBoardList")
    .then(resp=>{
      console.log("데이터 :"+resp.data);
      setBoardList(resp.data);
      setHideYN(resp.data.boardVisible==1?false:true); //숨겼는지 여부
    })
  }
  const totalPages = Math.ceil(boardList?.length / ITEMS_PER_PAGE);
   // 현재 페이지에 해당하는 게시글 슬라이싱
      const currentBoardList = boardList?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
  );
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };
  
  const hideBoard = (boardNo)=>{
    // console.log("boardNo이다"+boardNo);
    // console.log("hideYN : "+hideYN);
    AuthApi.put("http://localhost:8081/board/adminhide/"+boardNo)
    .then(resp=>{
      // console.log("resp :"+resp.data);
      loadList();
    });
  }
  const deleteBoard = (boardNo)=>{
    // console.log("boardNo이다"+boardNo);
    if(confirm("정말 삭제하시겠습니까?")){
      AuthApi.delete("http://localhost:8081/board/admindelete/"+boardNo)
    .then(resp=>{
      loadList();
    });
    }

    
  }
  
  const formatContent = (content) => {
    // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
    const singleLineContent = content.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0];

    // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
    return singleLineContent.length > 25 ? `${singleLineContent.slice(0, 25)}...` : singleLineContent;
  };

  return (
    <>
      <Title>자유게시판 관리</Title>
      <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem", marginLeft: '3rem', boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{borderTop: '2px solid rgba(0,0,0,0.8)', borderBottom: '2px solid rgba(0,0,0,0.8)'}}>
              <TableCell align="center" sx={{ width: "5rem" }}>
                글 번호
              </TableCell>
              <TableCell align="center" sx={{ width: "40rem" }}>
                제목
              </TableCell>
              <TableCell align="center" sx={{ width: '8rem' }}>
                작성자 닉네임
              </TableCell>
              <TableCell align="center" sx={{ width: "8rem" }}>
                숨김 Y / N
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                숨김/삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentBoardList?.length>0 ? currentBoardList.map((board,index)=>(
                        <TableRow key={board.boardNo}  sx={{borderTop: '2px solid rgba(0,0,0,0.3)', borderBottom: '2px solid rgba(0,0,0,0.3)'}}>
                        <TableCell align="center">
                          {board.boardNo}
                        </TableCell>
                        <TableCell align="center" sx={{ "&:hover": {
                                                      cursor: "pointer"                        } }} 
        onClick={()=>navigate(`/board/${board.boardNo}`)}
                          >
                        {formatContent(board.boardTitle)}
                        </TableCell>
                        <TableCell align="center">
                          {board.boardUsername}
                        </TableCell>
                        <TableCell align="center">
                          {board.boardVisible==0  ? "Y" : "N"}
                        </TableCell>
                        <TableCell align="center">
                          {board.boardVisible==0  ? 
                          <>
                            <Button variant="contained" onClick={()=>hideBoard(board.boardNo)} sx={{ marginRight: "10px" }}>
                            숨김해제
                          </Button>
                          </>: 
                          <>
                          <Button variant="contained" onClick={()=>hideBoard(board.boardNo)} sx={{ marginRight: "10px" }}>
                            숨김
                          </Button>
                          </>}
                          
                          <Button variant="outlined" onClick={()=>deleteBoard(board.boardNo)}>
                            삭제
                          </Button>
                        </TableCell>
                      </TableRow> 
                    )) : (
                      <TableRow>
                      <TableCell align="center" colSpan={7}>게시글 로딩중입니다.</TableCell>
                    </TableRow>
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
      
    </>
  );
};
export default AdminBoardList;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
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
