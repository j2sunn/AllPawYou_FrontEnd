import { useEffect, useState } from "react";
import { listNotices } from "../service/NoticeService";
import styled from "styled-components";
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoticeListUser = () => {
  const [notices, setNotices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotices();
  }, []);

  function getAllNotices() {
    listNotices()
      .then((response) => {
        console.log(response.data);
        setNotices(response.data.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const PerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const currentNotices = notices.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(notices.length / PerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const goNoticeDetail = (data) => {
    navigate(`/noticeDetail/${data.noticeNo}`, { state: data });
  };

  return (
    <>
      <Container>
        <Content>
          <Title>공지사항</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "1rem", boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ borderTop: "2px solid rgba(0,0,0,0.8)", borderBottom: "2px solid rgba(0,0,0,0.8)" }}>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    번호
                  </TableCell>
                  <TableCell align="center" sx={{ width: "60%", fontWeight: "bold" }}>
                    제목
                  </TableCell>
                  <TableCell align="center" sx={{ width: "30%" }}>
                    등록일
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentNotices.map((item, index) => (
                  <TableRow key={item.noticeTitle} sx={{ borderTop: "2px solid rgba(0,0,0,0.3)", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                    <TableCell align="center">{notices.length - index}</TableCell>
                    <TableCell align="center" onClick={() => goNoticeDetail(item)} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                      {item.noticeTitle}
                    </TableCell>
                    <TableCell align="center">{item.noticeDate}</TableCell>
                  </TableRow>
                ))}
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
export default NoticeListUser;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  margin: 2rem 4rem;
  display: flex;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  margin: 0 2rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 2rem 0;
  width: 90%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
