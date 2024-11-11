import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { sentMessage } from "../../service/Message";
import MypageSideBar from "../../components/common/MypageSideBar";

const SentMessages = () => {
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getSentMessage();
  }, []);

  // 사용자 no 받기
  const sender = localStorage.getItem("no");

  function getSentMessage() {
    sentMessage(sender)
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
              {messages.map((item) => (
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
        <Pages></Pages>
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
