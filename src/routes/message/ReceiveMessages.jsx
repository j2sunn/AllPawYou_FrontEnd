import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { receiveMessage, deleteMessage } from "../../service/Message"; // Import deleteMessage
import MypageSideBar from "../../components/common/MypageSideBar";

const ReceiveMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getReceiveMessage();
  }, []);

  // 사용자 no 받기
  const receiver = localStorage.getItem("no");

  function getReceiveMessage() {
    receiveMessage(receiver)
      .then((response) => {
        console.log(response);
        setMessages(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const goCreateMessage = () => {
    const width = 600; // 팝업의 너비
    const height = 800; // 팝업의 높이
    const left = window.innerWidth / 2 - width / 2; // 화면 중앙에 위치
    const top = window.innerHeight / 2 - height / 2; // 화면 중앙에 위치

    window.open("/mypage/createMessage", "popup", `width=${width},height=${height},top=${top},left=${left}`);
  };

  // Handle checkbox change
  const handleSelectMessage = (event, id) => {
    if (event.target.checked) {
      setSelectedMessages((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedMessages((prevSelected) => prevSelected.filter((messageId) => messageId !== id));
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // 현재 페이지의 메시지 ID만 선택
      const currentMessagesIds = currentMessages.map((message) => message.id);
      setSelectedMessages((prevSelected) => [...new Set([...prevSelected, ...currentMessagesIds])]);
    } else {
      // 현재 페이지에 해당하는 메시지 ID만 해제
      const currentMessagesIds = currentMessages.map((message) => message.id);
      setSelectedMessages((prevSelected) => prevSelected.filter((id) => !currentMessagesIds.includes(id)));
    }
  };

  // Handle delete selected messages
  const handleDeleteSelected = async () => {
    try {
      for (let messageId of selectedMessages) {
        await deleteMessage(messageId);
      }
      getReceiveMessage();
      setSelectedMessages([]);
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const messagesPerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const totalPages = Math.ceil(messages.length / messagesPerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Determine the state of the "Select All" checkbox for the current page
  const isSelectAllChecked = currentMessages.length > 0 && currentMessages.every((message) => selectedMessages.includes(message.id));

  return (
    <Container>
      <MypageSideBar />

      <Content>
        <Title>받은 쪽지함</Title>
        <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem", marginLeft: "3rem", boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ borderTop: "2px solid rgba(0,0,0,0.8)", borderBottom: "2px solid rgba(0,0,0,0.8)" }}>
                <TableCell align="center">
                  <Checkbox checked={isSelectAllChecked} onChange={handleSelectAll} />
                </TableCell>
                <TableCell align="center" sx={{ width: "15rem", fontWeight: "bold" }}>
                  보낸사람
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
                  <TableCell align="center">
                    <Checkbox checked={selectedMessages.includes(item.id)} onChange={(event) => handleSelectMessage(event, item.id)} />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    <Link to={`/mypage/messageDetail/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {item.senderNickname}
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
          <Button
            variant="contained"
            sx={{ marginTop: "25px", marginRight: "1rem" }}
            onClick={handleDeleteSelected}
            disabled={selectedMessages.length === 0}
            color="error"
          >
            삭제
          </Button>
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

export default ReceiveMessages;

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

const AddProductButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;