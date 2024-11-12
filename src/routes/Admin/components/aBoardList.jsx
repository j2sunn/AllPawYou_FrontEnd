import styled from "styled-components";
import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loadList } from "../../../service/BoardService";
import { AuthApi } from "../../../service/AuthApi";
import Swal from "sweetalert2";
const AdminBoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [hideYN, setHideYN] = useState(false);

  useEffect(() => {
    loadList();
  }, []);
  const loadList = () => {
    AuthApi.get("http://localhost:8081/board/adminBoardList").then((resp) => {
      console.log("데이터 :" + resp.data);
      setBoardList(resp.data);
      setHideYN(resp.data.boardVisible == 1 ? false : true); //숨겼는지 여부
    });
  };

  const hideBoard = (boardNo) => {
    // console.log("boardNo이다"+boardNo);
    // console.log("hideYN : "+hideYN);
    AuthApi.put("http://localhost:8081/board/adminhide/" + boardNo).then((resp) => {
      // console.log("resp :"+resp.data);
      loadList();
    });
  };
  const deleteBoard = async (boardNo) => {
    // 삭제 확인 알림 표시
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 시 돌이킬 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    });

    // 사용자가 삭제를 확인한 경우
    if (result.isConfirmed) {
      try {
        // 게시글 삭제
        await AuthApi.delete("http://localhost:8081/board/admindelete/" + boardNo);
        // 삭제 성공 시 알림 표시
        await Swal.fire({
          icon: "success",
          title: "삭제 성공",
          text: "게시글이 성공적으로 삭제되었습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
        loadList(); // 목록 갱신
        window.location.reload(); // 성공 후 페이지 새로고침
      } catch (error) {
        console.error(error);
        // 오류 발생 시 알림 표시
        await Swal.fire({
          icon: "error",
          title: "삭제 실패",
          text: "삭제 중 오류가 발생했습니다. 다시 시도해 주세요.",
          confirmButtonColor: "#d33",
          confirmButtonText: "닫기",
        });
      }
    }
  };

  const formatContent = (content) => {
    // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
    const singleLineContent = content.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0];

    // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
    return singleLineContent.length > 25 ? `${singleLineContent.slice(0, 25)}...` : singleLineContent;
  };

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const PerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const currentBoardList = boardList.slice(indexOfFirst, indexOfLast);
  console.log(currentBoardList);

  const totalPages = Math.ceil(boardList.length / PerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Title>자유게시판 관리</Title>
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
              <TableCell align="center" sx={{ width: "5rem" }}>
                글 번호
              </TableCell>
              <TableCell align="center" sx={{ width: "40rem" }}>
                제목
              </TableCell>
              <TableCell align="center" sx={{ width: "8rem" }}>
                작성자 닉네임
              </TableCell>
              <TableCell align="center" sx={{ width: "8rem" }}>
                공개
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                곧개 / 삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBoardList?.length > 0 ? (
              currentBoardList.map((board) => (
                <TableRow
                  key={board.boardNo}
                  sx={{
                    borderTop: "2px solid rgba(0,0,0,0.3)",
                    borderBottom: "2px solid rgba(0,0,0,0.3)",
                  }}
                >
                  <TableCell align="center">{board.boardNo}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => navigate(`/board/${board.boardNo}`)}
                  >
                    {formatContent(board.boardTitle)}
                  </TableCell>
                  <TableCell align="center">{board.boardUsername}</TableCell>
                  <TableCell align="center">{board.boardVisible == 0 ? "비공개 " : "공개됨"}</TableCell>
                  <TableCell align="center">
                    {board.boardVisible == 0 ? (
                      <>
                        <Button variant="contained" color="error" onClick={() => hideBoard(board.boardNo)} sx={{ marginRight: "10px" }}>
                          해제
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="contained" onClick={() => hideBoard(board.boardNo)} sx={{ marginRight: "10px" }}>
                          숨김
                        </Button>
                      </>
                    )}

                    <Button variant="outlined" onClick={() => deleteBoard(board.boardNo)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  게시글 로딩중입니다.
                </TableCell>
              </TableRow>
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

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
