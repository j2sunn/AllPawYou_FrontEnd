import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadBoard } from "../service/BoardService";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
const BoardWrite = () => {
  const navigator = useNavigate();
  let ACCESS_TOKEN = "";

  useEffect(() => {
    ACCESS_TOKEN = localStorage.getItem("accessToken");
    console.log("토큰 : " + ACCESS_TOKEN);

    if (ACCESS_TOKEN) {
      console.log("토큰 : " + ACCESS_TOKEN);
      const payload = JSON.parse(atob(ACCESS_TOKEN.split(".")[1]));
      setLoginEmail(payload["user-email"]);
      // console.log("email : "+ payload['user-email']);
      // console.log("email : "+loginEmail);
      setIsLoading(false); // 로그인한 경우 로딩 완료로 설정
    } else {
      alert("로그인 후 이용해주세요.");
      // navigator('/login');
      location.href = "/login";
      return;
    }
  }, []);
  const [loginEmail, setLoginEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState(""); //이거는 한 자라도 작성했는지 체크용
  const [images, setImages] = useState([]);
  const [error, setError] = useState({});
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  // console.log("images : "+images);
  console.log("제목길이" + boardTitle.trim().length);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("여기보기!!!e.target.files : " + e.target.files);
    if (files.length + images.length > 8) {
      alert("최대 8장까지 업로드할 수 있습니다.");
      return;
    }

    // const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...files]);
    // console.log("여기여기"+e.target.files);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    console.log("요기닷" + images);
    // blob:http://localhost:3000/93d8fcf8-92c3-417c-9dc5-66fa2ad5338a,blob:http://localhost:3000/8740daa0-5050-44ad-adc5-7fc2546510cf
    /*
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const indexToRemove = 2; 

        arr.splice(indexToRemove, 1);

        console.log(arr); // ["a", "b", "d", "e"]
        
        */
  };
  const doSubmit = async () => {
    // 유효성 검사
    if (validation()) {
      const formData = new FormData();

      // 필드 추가
      formData.append("email", loginEmail);
      formData.append("category", selectedCategory);
      formData.append("boardTitle", boardTitle);
      formData.append("boardContent", boardContent); // result 변수가 정의되지 않아 boardContent로 변경

      // 파일 추가
      images.forEach((image) => {
        formData.append("imgFile", image); // 'imgFile' 이름으로 여러 파일 추가 가능
      });

      console.log("프론트 email : " + loginEmail); // 디버깅용 로그

      // 게시판 업데이트 호출
      try {
        await uploadBoard(formData, navigator);
        // 성공 시 알림 표시
        await Swal.fire({
          icon: "success",
          title: "등록 성공",
          text: "게시글이 성공적으로 등록되었습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
      } catch (error) {
        console.error("게시글 수정 실패:", error);
        // 수정 실패 시 알림 표시
        await Swal.fire({
          icon: "error",
          title: "등록 실패",
          text: "게시글 등록 중 오류가 발생했습니다.",
          confirmButtonColor: "#d33",
          confirmButtonText: "닫기",
        });
      }
    }
  };

  const validation = () => {
    //필수값 다 작성했는지 검사
    let obj = {};
    if (boardTitle.trim().length == 0) {
      obj = { ...obj, title: "제목을 입력해 주세요." };
      setError(obj);
      return false;
    }

    if (boardContent.trim().length == 0) {
      obj = { ...obj, content: "내용을 입력해 주세요." };
      setError(obj);
      return false;
    }

    return true;
  };
  const handleContentChange = (e) => {
    console.log("댓글내용 : " + e.target.value);
    let text = e.target.value.replace(/<script.*?>.*?<\/script>/gi, ""); //script가 있을 경우 제거
    setBoardContent(text);
    setResult(text.replace(/\n/g, "<e>").replace(/ /g, "<s>"));

    console.log("result : " + result);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  if (isLoading) return null; // 로딩 중일 때 아무것도 렌더링하지 않음

  return (
    //강아지(1) 고양이(2) 기타(3)
    <>
      {/* <img src={`http://localhost:8080/images/board/푸들.png`} alt="푸들" /> */}
      {/* {ACCESS_TOKEN ? ( //로그인한 상태인 경우
                    <>
                        토큰이 있습니다.

                    </>
                                    ) : ( //로그인 안 한 상태인 경우
                    <>
                        토큰이 없습니다.
                    </>
                )} */}

      {/* 
                <div class="boardImg">
                    <label for="img3">
                        <img class="preview" src="">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img3" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>
                
                */}
      {ACCESS_TOKEN != null ? (
        <>
          <Container>
            <One>
              <h5>
                카테고리<span>*</span>
              </h5>
              <div className="cateCon">
                <Div className="category" onClick={() => setSelectedCategory(1)} selected={selectedCategory === 1}>
                  강아지
                </Div>
                <Div className="category" onClick={() => setSelectedCategory(2)} selected={selectedCategory === 2}>
                  고양이
                </Div>
                <Div className="category" onClick={() => setSelectedCategory(3)} selected={selectedCategory === 3}>
                  기타
                </Div>
              </div>
            </One>
            <Two>
              <h5>
                제목<span>*</span>
              </h5>
              <TitleInput onChange={(e) => setBoardTitle(e.target.value)} />
              <Error>{error.title}</Error>

              <h5>
                내용<span>*</span>
              </h5>
              {/* <ContentTextarea onChange={(e) => setBoardContent(e.target.value)}/> */}
              <ContentTextarea onChange={(e) => handleContentChange(e)} />
              <Error>{error.content}</Error>
            </Two>
            <Three>
              <h5>사진 업로드</h5>
              <ImgContainer>
                {images.map((image, index) => (
                  <Thumbnail key={index}>
                    <Image src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
                    <RemoveButton onClick={() => handleRemoveImage(index)}>X</RemoveButton>
                  </Thumbnail>
                ))}
              </ImgContainer>
              <UploadButton>
                <FileInput type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e)} />
                📷 사진 첨부
              </UploadButton>
              <p>최대 8장까지 업로드 가능합니다.</p>
            </Three>
            <Button variant="contained" onClick={doSubmit} sx={{marginBottom: '2rem', width: '5rem'}}>등록</Button>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default BoardWrite;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Div = styled.div`
  background-color: ${({ selected }) => (selected ? "#EEC759" : "RGB(240, 240, 243)")};
  margin-right: 10px;
  width: 100px;
  font-weight: bold;
  border-radius: 20px;
  text-align: center;
  padding: 7px;
  &:hover {
    cursor: pointer;
  }
`;
const One = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
const Two = styled.div`
  width: 50%;
  h5 {
    margin-top: 30px;
  }
  h5 span {
    color: red;
  }
`;
const Three = styled.div`
  width: 50%;
  h5 {
    margin-top: 30px;
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
const ImgContainer = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  background-color: #fff3c4; /* 배경 색상 */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow-x: auto;
  white-space: nowrap; /* 썸네일들이 한 줄로 나오도록 설정 */
`;

const Thumbnail = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #eee;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: black;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const UploadButton = styled.label`
  background-color: RGB(240, 240, 243);
  border-radius: 15px;
  padding: 5px;
  display: inline-block;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
`;

const FileInput = styled.input`
  display: none;
`;

const EndBtn = styled.button`
  background-color: #eec759;
  border: 3px solid #eec759;
  margin: 30px 0;
  border-radius: 15px;
  padding: 5px;
  width: 100px;
  font-weight: bold;
  border-radius: 20px;
  text-align: center;
  padding: 7px;
  &:hover {
    background-color: white;
  }
`;
const Error = styled.div`
  color: red;
`;
