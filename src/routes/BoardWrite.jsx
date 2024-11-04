import styled from "styled-components";
import { useState } from "react";

const BoardWrite = ()=>{
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if(ACCESS_TOKEN){
        console.log("토큰 : "+ACCESS_TOKEN);
    const payload = JSON.parse(atob(ACCESS_TOKEN.split(".")[1]));
    console.log("email : "+ payload['user-email']);
    const loginEmail = payload['user-email']; 
    }
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardContent] = useState("");
    const [images, setImages] = useState([]);
    // console.log("images : "+images);
    
    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);
        
        if (files.length + images.length > 8) {
            alert("최대 8장까지 업로드할 수 있습니다.");
            return;
        }
        
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };
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

                    <h5>내용<span>*</span></h5>
                    <ContentTextarea onChange={(e) => setBoardContent(e.target.value)}/>
                </Two>
                <Three>
                    <h5>사진 업로드</h5>
                    <ImgContainer>
                        {images.map((image, index) => (
                            <Thumbnail key={index}>
                                <Image src={image} alt={`Uploaded ${index + 1}`} />
                                <RemoveButton onClick={() => handleRemoveImage(index)}>X</RemoveButton>
                            </Thumbnail>
                        ))}
                    </ImgContainer>
                    <UploadButton>
                        <FileInput
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        📷 사진 첨부
                    </UploadButton>
                    <p>최대 8장까지 업로드 가능합니다.</p>
                </Three>
                <EndBtn >등록</EndBtn>
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