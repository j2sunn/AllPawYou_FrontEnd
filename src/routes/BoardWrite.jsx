import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {uploadBoard} from "../service/BoardService";
const BoardWrite = ()=>{
    
    const navigator = useNavigate();
    let ACCESS_TOKEN = "";
    let loginEmail="";
    useEffect(()=>{
        ACCESS_TOKEN = localStorage.getItem("accessToken");
        console.log("토큰 : "+ACCESS_TOKEN);

        if(ACCESS_TOKEN){
            console.log("토큰 : "+ACCESS_TOKEN);
        const payload = JSON.parse(atob(ACCESS_TOKEN.split(".")[1]));
        loginEmail = payload['user-email']; 
        // console.log("email : "+ payload['user-email']);
        console.log("email : "+loginEmail);
        }else{
            alert("로그인 후 이용해주세요.");
            // navigator('/login');
            location.href='/login';
            return;
        }
    },[]);
    
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardContent] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState({});
    // console.log("images : "+images);
    console.log("제목길이"+boardTitle.trim().length);
    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);
        
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
        console.log("요기닷"+images);
        // blob:http://localhost:3000/93d8fcf8-92c3-417c-9dc5-66fa2ad5338a,blob:http://localhost:3000/8740daa0-5050-44ad-adc5-7fc2546510cf
        /*
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const indexToRemove = 2; 

        arr.splice(indexToRemove, 1);

        console.log(arr); // ["a", "b", "d", "e"]
        
        */
    };
    const doSubmit = ()=>{
        if(validation()){
            //필수사항 다 작성한 경우
            //selectedCategory, boardTitle, boardContent, images를 제출
            // const board = {
            //     email : loginEmail,
            //     category : selectedCategory,
            //     boardTitle,
            //     boardContent,
            //     imgFile : images
            // };
            // uploadBoard(board);
            const formData = new FormData();

        // 필드 추가
        formData.append("email", loginEmail);
        formData.append("category", selectedCategory);
        formData.append("boardTitle", boardTitle);
        formData.append("boardContent", boardContent);

        // 파일 추가
        images.forEach((image //,i

        ) => {
            formData.append("imgFile", image);  // 'imgFile' 이름으로 여러 파일 추가 가능
        });

        uploadBoard(formData);
        }
    }
    const validation = ()=>{ //필수값 다 작성했는지 검사
        let obj={};
        if(boardTitle.trim().length==0){
            obj={...obj, title:"제목을 입력해 주세요."}
            setError(obj);
            return false;
        }

        if(boardContent.trim().length==0){
            obj={...obj, content:"내용을 입력해 주세요."}
            setError(obj);
            return false;
        }
        
        return true;
    }
    return ( //강아지(1) 고양이(2) 기타(3)
        <>
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
            <Container>
                <One>
                
                    <h5>카테고리<span>*</span></h5>
                    <div className="cateCon">
                        <Div className="category"
                        onClick={() => setSelectedCategory(1)}
                        selected={selectedCategory === 1}
                        >강아지</Div>
                        <Div className="category"
                        onClick={() => setSelectedCategory(2)}
                        selected={selectedCategory === 2}
                        >고양이</Div>
                        <Div className="category"
                        onClick={() => setSelectedCategory(3)}
                        selected={selectedCategory === 3}
                        >기타</Div>
                    </div>
                </One>
                <Two>
                    <h5>제목<span>*</span></h5>
                    <TitleInput onChange={(e) => setBoardTitle(e.target.value)}/>
                    <Error>{error.title}</Error>

                    <h5>내용<span>*</span></h5>
                    <ContentTextarea onChange={(e) => setBoardContent(e.target.value)}/>
                    
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
                        <FileInput
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e)=>handleImageChange(e)}
                        />
                        📷 사진 첨부
                    </UploadButton>
                    <p>최대 8장까지 업로드 가능합니다.</p>
                </Three>
                <EndBtn onClick={doSubmit}>등록</EndBtn>
            </Container>
        </>
    );
}
export default BoardWrite;
const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    
`;
const Div = styled.div`
    background-color: ${({ selected }) => (selected ? '#EEC759' : 'RGB(240, 240, 243)')};
        margin-right : 10px;
        width : 100px;
        font-weight: bold;
        border-radius: 20px;
        text-align: center;
        padding : 7px;
        &:hover{
        cursor: pointer;
        }
`;
const One = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h5{
        margin-top: 30px;
        
    }
    h5 span{
        color: red;
    }
    .cateCon{
        display: flex;
    }
    
`;
const Two = styled.div`
    width: 50%;
    h5{
        margin-top: 30px;
    }
    h5 span{
        color: red;
    }
`;
const Three = styled.div`
    width: 50%;
    h5{
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
    padding : 5px;
    display: inline-block;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
`;

const FileInput = styled.input`
    display: none;
`;

const EndBtn = styled.button`
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