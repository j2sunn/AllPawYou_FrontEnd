import axios from "axios";
import { useEffect, useState } from "react";
import { listNotices } from "../../../service/NoticeService";
import styled from "styled-components";
import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ListNoticeComponent = () => {
  const [notices, setNotices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotices();
  }, []);

  function getAllNotices() {
    listNotices()
      .then((response) => {
        console.log(response.data);
        setNotices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const goAddNotice = () => {
    navigate(`/admin/noticeWrite`);
  };

  const goNoticeUpdate = (data) => {
    navigate(`/admin/noticeUpdate/${data.noticeNo}`, { state: data });
  };

  function removeNotice(noticeNo) {
    Swal.fire({
      title: "해당 공지사항을 삭제하시겠습니까?",
      icon: "warning",

      showCancelButton: true, // false가 default
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8081/api/notice/delete/" + noticeNo)
          .then(() => {
            getAllNotices();
          });
        Swal.fire({
          icon: "success",
          title: "삭제되었습니다.",
          confirmButtonColor: "#527853",
        });
      }
    });
  }

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const PerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const currentNotices = notices.slice(indexOfFirst, indexOfLast);
  console.log(currentNotices);

  const totalPages = Math.ceil(notices.length / PerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <Title>공지사항 관리</Title>
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
                번호
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "30rem", fontWeight: "bold" }}
              >
                제목
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                등록일
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                수정/삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentNotices.map((item) => (
              <TableRow
                key={item.noticeNo}
                sx={{
                  borderTop: "2px solid rgba(0,0,0,0.3)",
                  borderBottom: "2px solid rgba(0,0,0,0.3)",
                }}
              >
                <TableCell align="center">{item.noticeNo}</TableCell>
                <TableCell
                  align="center"
                  onClick={() =>
                    navigate(`/noticeDetail/${item.noticeNo}`, { state: item })
                  }
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  {item.noticeTitle}
                </TableCell>
                <TableCell align="center">{item.noticeDate}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ marginRight: "10px" }}
                    onClick={() => goNoticeUpdate(item)}
                  >
                    수정
                  </Button>
                  <Button variant="outlined" onClick={() => console.log(item)}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProductButton>
        <Button
          variant="contained"
          sx={{ marginTop: "25px" }}
          onClick={() => goAddNotice()}
        >
          공지사항 등록
        </Button>
      </AddProductButton>
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

export default ListNoticeComponent;

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

const AddProductButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;
