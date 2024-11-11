//import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";

const NoticeDetail = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      {state ? (
        <>
          <Container>
            <Title>공지시항</Title>
            <NoticeHeader>
              <NoticeTitle>{state.noticeTitle}</NoticeTitle>
              <div>
                {state.noticeDate.substr(0, 4) +
                  "." +
                  state.noticeDate.substr(5, 2) +
                  "." +
                  state.noticeDate.substr(8, 2) +
                  "  " +
                  state.noticeDate.substr(11, 2) +
                  ":" +
                  state.noticeDate.substr(14, 2)}
              </div>
            </NoticeHeader>
            <NoticeContent>
              <ContentTextarea defaultValue={state.noticeContent} disabled />
            </NoticeContent>

            <BtnContainer>
              <Button variant="contained" sx={{ fontSize: "1rem", marginTop: "1rem" }} onClick={() => navigate(-1)}>
                목록으로
              </Button>
            </BtnContainer>
          </Container>
        </>
      ) : (
        <Container>
          <NoData>존재하지 않는 공지사항입니다.</NoData>
          <Button variant="contained" onClick={() => navigate(-1)} sx={{ fontSize: "1.5rem", marginTop: "2rem" }}>
            이전 페이지로 돌아가기
          </Button>
        </Container>
      )}
    </>
  );
};
export default NoticeDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 650px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  align-self: flex-start;
  margin: 2rem 0;
  margin-left: 27rem;
`;

const NoticeHeader = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1rem;
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
`;

const NoticeTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NoticeContent = styled.div`
  width: 50%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border: none;
  min-height: 250px;
  resize: none;
  outline: none;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const NoData = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-top: 15rem;
`;
