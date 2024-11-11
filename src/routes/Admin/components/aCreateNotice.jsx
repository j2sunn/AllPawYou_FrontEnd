import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNotice } from "../../../service/NoticeService";
import Swal from "sweetalert2";

const NoticeWrite = () => {

  const navigator = useNavigate();
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [result, setResult] = useState();
  const [error, setError] = useState({});

  const cancel = () => {
    Swal.fire({
        title: "공지사항 목록으로 돌아가시겠습니까?",
        icon: 'warning',
        
        showCancelButton: true, // false가 default
        confirmButtonColor: '#527853',
        cancelButtonColor: '#d33',
        confirmButtonText: '이동',
        cancelButtonText: '취소',
        reverseButtons: true
        
     }).then(result => {
        if (result.isConfirmed) {
            navigator(-1);
        }
    });
}

  const doSubmit = () => {
    if (validation()) {
      let data = { noticeTitle, noticeContent };
      createNotice(data, navigator);
      navigator("/admin/noticeList");
      setTimeout(() => {
        console.log(1);
      }, 3000);
    }
  };

  const handleNoticeContent = (e) => {
    setNoticeContent(e.target.value);
    let text = e.target.value.replace(/<script.*?>.*?<\/script>/gi, ''); 
    setResult(text.replace(/\n/g, '<e>').replace(/ /g, '<s>'));
  }

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

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <Title>공지사항 등록</Title>
      <One>
        <h5>
          제목<span>*</span>
        </h5>
        <TitleInput onChange={(e) => setNoticeTitle(e.target.value)} />
        <Error>{error.title}</Error>

        <h5>
          내용<span>*</span>
        </h5>
        <ContentTextarea onChange={handleNoticeContent} />

        <Error>{error.content}</Error>
      </One>
      <Btn onClick={cancel}>취소</Btn>
      <EndBtn onClick={doSubmit}>등록</EndBtn>
    </>
  );
};
export default NoticeWrite;

const Title = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

const One = styled.div`
  width: 90%;
  h5 {
    margin-top: 30px;
  }
  h5 span {
    color: red;
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

const Btn = styled.button`
    background-color: white;
    border : 3px solid #EEC759;
    margin : 30px 0;
    border-radius: 15px;
    padding : 5px;
    width : 100px;
    font-weight: bold;
    border-radius: 20px;
    text-align: center;
    padding : 7px;
`;

const EndBtn = styled(Btn)`
    background-color: #EEC759;
    border : 3px solid #EEC759;
    margin : 30px 0;
    border-radius: 15px;
    padding : 5px;
    width : 100px;
    font-weight: bold;
    border-radius: 20px;
    text-align: center;
    padding : 7px;
    &:hover{
        background-color: white;
    }
`;

const Error = styled.div`
  color: red;
`;