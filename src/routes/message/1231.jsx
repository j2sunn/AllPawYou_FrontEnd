import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { messageDetail } from "../../service/Message"; // Your axios function
import styled from "styled-components";

const MessageDetail = () => {
  const { messageId } = useParams(); // Extract the messageId from the URL
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getMessageDetail(messageId);
  }, [messageId]);

  // Function to fetch the message details using axios
  const getMessageDetail = (id) => {
    messageDetail(id)
      .then((response) => {
        setMessage(response); // Set the fetched message data
      })
      .catch((error) => {
        console.error("Error fetching message detail:", error);
      });
  };

  return (
    <Container>
      {message ? (
        <>
          <Title>{message.title}</Title> {/* You can use the title if available */}
          <Sender>보낸사람: {message.senderNickname}</Sender>
          <Content>{message.content}</Content>
          <Date>날짜: {message.date}</Date>
        </>
      ) : (
        <p>Loading...</p> // Show loading text while the data is being fetched
      )}
    </Container>
  );
};

export default MessageDetail;

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Sender = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const Content = styled.p`
  font-size: 1.2rem;
`;

const Date = styled.p`
  font-size: 1rem;
  color: gray;
`;
