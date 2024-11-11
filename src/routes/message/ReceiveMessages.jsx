import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { receiveMessage, deleteMessage } from "../../service/Message"; // Import deleteMessage
import MypageSideBar from "../../components/common/MypageSideBar";

const ReceiveMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]); // Track selected messages
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
    navigate(`/mypage/createMessage`);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  // Handle checkbox change
  const handleSelectMessage = (event, id) => {
    if (event.target.checked) {
      setSelectedMessages((prevSelected) => [...prevSelected, id]); // Add selected message ID
    } else {
      setSelectedMessages((prevSelected) => prevSelected.filter((messageId) => messageId !== id)); // Remove from selected
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedMessages(messages.map((message) => message.id)); // Select all
    } else {
      setSelectedMessages([]); // Deselect all
    }
  };

  // Handle delete selected messages
  const handleDeleteSelected = async () => {
    try {
      for (let messageId of selectedMessages) {
        await deleteMessage(messageId); // Delete each selected message
      }
      // Refresh messages after deletion
      getReceiveMessage();
      setSelectedMessages([]); // Reset selected messages
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  // Determine the state of the "Select All" checkbox
  const isSelectAllChecked = selectedMessages.length === messages.length; // All selected

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
                  <Checkbox
                    checked={isSelectAllChecked} // Check if all are selected
                    onChange={handleSelectAll} // Handle select all checkbox change
                  />
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
              {messages.map((item) => (
                <TableRow key={item.id} sx={{ borderTop: "2px solid rgba(0,0,0,0.3)", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                  <TableCell align="center">
                    <Checkbox
                      checked={selectedMessages.includes(item.id)} // Check if the message is selected
                      onChange={(event) => handleSelectMessage(event, item.id)} // Handle single checkbox change
                    />
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
            onClick={handleDeleteSelected} // Trigger delete for selected messages
            disabled={selectedMessages.length === 0} // Disable if no messages are selected
            color="error"
          >
            삭제
          </Button>
          <Button variant="contained" sx={{ marginTop: "25px" }} onClick={goCreateMessage}>
            쪽지보내기
          </Button>
        </AddProductButton>
        <Pages></Pages>
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

const Pages = styled.div`
  width: 80%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

const AddProductButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;
