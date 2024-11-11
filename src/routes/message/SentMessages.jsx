import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material"; // Import Pagination component
import { Link } from "react-router-dom";
import { sentMessage } from "../../service/Message";
import MypageSideBar from "../../components/common/MypageSideBar";

const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const messagesPerPage = 10; // Messages per page

  useEffect(() => {
    getSentMessage();
  }, []);

  // 사용자 no 받기
  const sender = localStorage.getItem("no");

  function getSentMessage() {
    sentMessage(sender)
      .then((response) => {
        setMessages(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const goCreateMessage = () => {
    const width = 650; // 팝업의 너비
    const height = 500; // 팝업의 높이
    const left = window.innerWidth / 2 - width / 2; // 화면 중앙에 위치
    const top = window.innerHeight / 2 - height / 2; // 화면 중앙에 위치

    window.open("/mypage/createMessage", "popup", `width=${width},height=${height},top=${top},left=${left},scrollbars=no`);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(messages.length / messagesPerPage);

  return (
    <Container>
      <MypageSideBar />
      <Content>
        <Title>보낸 쪽지함</Title>
        <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem", marginLeft: "3rem", boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ borderTop: "2px solid rgba(0,0,0,0.8)", borderBottom: "2px solid rgba(0,0,0,0.8)" }}>
                <TableCell align="center" sx={{ width: "15rem", fontWeight: "bold" }}>
                  받은사람
                </TableCell>
                <TableCell align="center" sx={{ width: "40rem" }}>
                  내용
                </TableCell>
                <TableCell align="center" sx={{ width: "20rem" }}>
                  날짜
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentMessages.map((item) => (
                <TableRow key={item.id} sx={{ borderTop: "2px solid rgba(0,0,0,0.3)", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    <Link to={`/mypage/messageDetail/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {item.receiverNickname}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{item.content}</TableCell>
                  <TableCell align="center">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <AddProductButton>
          <Button variant="contained" sx={{ marginTop: "25px" }} onClick={goCreateMessage}>
            쪽지보내기
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
      </Content>
    </Container>
  );
};

export default SentMessages;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  padding-left: 4rem;
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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
