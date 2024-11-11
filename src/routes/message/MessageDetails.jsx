import styled from "styled-components";
import MypageSideBar from "../../components/common/MypageSideBar";
import { useEffect, useState } from "react";
import { messageDetail } from "../../service/Message";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";

const DetailMessages = () => {
  const { messageId } = useParams();
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  const getReceiveDetail = (id) => {
    messageDetail(id)
      .then((response) => {
        setMessage(response); // 가져온 메시지 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching message detail:", error);
      });
  };

  useEffect(() => {
    getReceiveDetail(messageId);
  }, [messageId]);

  const goReceiveMessage = () => {
    navigate(`/mypage/receiveMessage`);
  };

  return (
    <Container>
      <MypageSideBar />
      <Content>
        <Message>
          <Title>쪽지 상세보기</Title>

          <Box key={message?.id} sx={{ borderTop: "2px solid rgba(0,0,0,0.3)", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
            <Sender>보낸사람: {message?.senderNickname}</Sender>
            <Sender>받은사람: {message?.receiverNickname}</Sender>
            <Date>날짜: {message?.date}</Date>

            <Content>{message?.content}</Content>
          </Box>
        </Message>

        <AddProductButton>
          <Button variant="contained" sx={{ marginTop: "25px" }} onClick={goReceiveMessage}>
            목록
          </Button>
        </AddProductButton>
      </Content>
    </Container>
  );
};

export default DetailMessages;

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

const Message = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 8rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const Sender = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const Date = styled.p`
  font-size: 1rem;
  color: gray;
`;

const AddProductButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;