import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { creaetMessage } from "../../service/Message";

const MessageSendPage = () => {
  const [values, setValues] = useState({
    receiver: "",
    content: "",
  });

  const [error, setError] = useState({
    content: "",
  }); // 오류 메시지 상태

  // 닉네임값 받기
  const nickname = localStorage.getItem("nickname");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    const data = {
      receiverNickname: values.receiver, // 받는 사람 (닉네임)
      content: values.content, // 메시지 내용
    };

    if (validation()) {
      try {
        await creaetMessage(nickname, data); // await를 사용하여 비동기적으로 메시지 전송
        await Swal.fire({
          icon: "success",
          title: "쪽지를 보냈습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
        window.close(); // 확인 버튼 클릭 시 창 닫기
      } catch (error) {
        // 에러가 발생하면 catch 블록이 실행됨
        await Swal.fire({
          icon: "warning",
          title: "쪽지를 보내지 못했습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
      }
    }
  };

  const validation = () => {
    let valid = true;
    let obj = {};

    let regex = /^.{5,500}$/i; // 정규식 수정 (5자 이상 500자 이하)
    if (!regex.test(values.content.trim())) {
      obj = { ...obj, content: "쪽지는 5자 이상 500자 이하로 작성해주세요." };
      valid = false;
    } else {
      obj = { ...obj, content: "" };
    }

    setError(obj);
    return valid;
  };

  return (
    <Container>
      <Content>
        <Message>
          <Title>쪽지 보내기</Title>
          <Form onSubmit={handleSubmit}>
            <RecipientField label="받는 사람(닉네임)" id="receiver" onChange={handleChange} required variant="outlined" fullWidth margin="normal" />
            <MessageField label="내용" id="content" variant="outlined" onChange={handleChange} multiline rows={4} fullWidth margin="normal" />
            <Error>{error.content}</Error>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
              보내기
            </Button>
          </Form>
        </Message>
      </Content>
    </Container>
  );
};

export default MessageSendPage;

const Container = styled.div`
  width: 100%;
  min-height: 500px;
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
  margin-top: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const RecipientField = styled(TextField)`
  margin-bottom: 1rem;
`;

const MessageField = styled(TextField)`
  margin-bottom: 1rem;
`;

const Error = styled.div`
  color: red;
`;
