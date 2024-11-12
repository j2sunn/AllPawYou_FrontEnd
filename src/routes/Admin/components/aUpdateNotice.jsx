import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateNotice } from "../../../service/NoticeService";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
const NoticeUpdate = () => {
  const { state } = useLocation();

  const [noticeNo, setNoticeNo] = useState(state?.noticeNo);
  const [noticeData, setNoticeData] = useState(null);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState(""); //이거는 한 자라도 작성했는지 체크용

  const [error, setError] = useState({});
  const [result, setResult] = useState("");

  const navigator = useNavigate();

  // let ACCESS_TOKEN = "";
  console.log("수정할 noticeNo : " + noticeNo);
  useEffect(() => {
    console.log(state);
    setNoticeTitle(state?.noticeTitle);
    setNoticeContent(state?.noticeContent);
    setResult(state?.noticeContent.replace(/\n/g, "<e>").replace(/ /g, "<s>"));
  }, []);

  // 제목 수정 핸들러
  const handleTitleChange = (e) => {
    setNoticeTitle(e.target.value);
  };

  // 내용 수정 핸들러

  const handleContentChange = (e) => {
    console.log("댓글내용 : " + e.target.value);
    setNoticeContent(e.target.value);
    let text = e.target.value.replace(/<script.*?>.*?<\/script>/gi, ""); //script가 있을 경우 제거
    setResult(text.replace(/\n/g, "<e>").replace(/ /g, "<s>"));
  };

  const cancel = () => {
    Swal.fire({
      title: "공지사항 목록으로 돌아가시겠습니까?",
      text: "진행상황이 저장되지 않습니다.",
      icon: "warning",

      showCancelButton: true, // false가 default
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "이동",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigator(-1);
      }
    });
  };

  const doSubmit = () => {
    if (validation()) {
      Swal.fire({
        title: "수정 성공",
        text: "공지사항이 성공적으로 수정되었습니다.",
        icon: "success",

        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
      const formData = new FormData();

      // 필드 추가
      formData.append("noticeTitle", noticeTitle);
      formData.append("noticeContent", noticeContent);

      updateNotice(noticeNo, { noticeTitle, noticeContent, noticeData });
      navigator("/admin/noticeList");
      setTimeout(() => {
        console.log(1);
      }, 3000);
    }
  };
  const validation = () => {
    //필수값 다 작성했는지 검사
    let obj = {};
    if (noticeTitle.trim().length == 0) {
      obj = { ...obj, title: "제목을 입력해 주세요." };
      setError(obj);
      return false;
    }

    if (noticeContent.trim().length == 0) {
      obj = { ...obj, content: "내용을 입력해 주세요." };
      setError(obj);
      return false;
    }

    return true;
  };

  return (
    <>
      {state ? (
        <>
          <Title>공지사항 수정</Title>
          <Content>
            <h5>
              제목<span>*</span>
            </h5>
            <TitleInput onChange={handleTitleChange} value={noticeTitle} />
            <Error>{error.title}</Error>

            <h5>
              내용<span>*</span>
            </h5>
            <ContentTextarea onChange={handleContentChange} value={noticeContent} />

            <Error>{error.content}</Error>
          </Content>
          <Buttons>
            <Button variant="outlined" onClick={cancel} sx={{ width: "5rem", marginRight: "2rem" }}>
              취소
            </Button>
            <Button variant="contained" onClick={doSubmit} sx={{ width: "5rem" }}>
              수정
            </Button>
          </Buttons>
        </>
      ) : (
        <NoData>
          존재하지 않는 공지사항입니다.
          <Button variant="contained" onClick={() => navigator("/admin/noticeList")} sx={{ fontSize: "1.5rem", marginTop: "2rem" }}>
            공지사항 목록으로
          </Button>
        </NoData>
      )}
    </>
  );
};
export default NoticeUpdate;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3rem;
  margin-bottom: 3rem;
  h5 {
    margin-top: 30px;
  }
  h5 span {
    color: red;
  }
  .cateCon {
    display: flex;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px;
  resize: vertical; /* 사용자가 세로 크기 조정 가능 */

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const Buttons = styled.div`
  width: 90%;
  margin-left: 3rem;
  display: flex;
  justify-content: end;
`;

const Error = styled.div`
  color: red;
`;

const NoData = styled.div`
  font-size: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
