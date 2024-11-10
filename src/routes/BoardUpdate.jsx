import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {loadData,updateBoard} from "../service/BoardService";
import styled from "styled-components";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
const BoardUpdate = ()=>{ //백업해둔 것!
    const  {state}  = useLocation();
    const [loginEmail, setLoginEmail] = useState("");
    const [boardNo,setBoardNo] = useState(state.boardNo);
    const [boardData, setBoardData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardContent] = useState(""); //이거는 한 자라도 작성했는지 체크용

    const [images, setImages] = useState([]); 
    
    const navigator = useNavigate();
    const [error, setError] = useState({});
    const [result,setResult] = useState("");

    //이미지 변경할 여부(1=미선택,2=안바꿔,3=바꿀래)
    const [changeImg, setChangeImg] = useState(1); //안바꿀거야가 기본값
    
    let ACCESS_TOKEN = "";
    console.log("수정할 boardNo : "+boardNo);
    useEffect(()=>{
        loadData(boardNo)
        .then((data)=>{
            // console.log("데이터 : "+data.boardTitle);
            setBoardData(data);
            console.log("카테고리 : "+data.category);
            setSelectedCategory(data.category);
            
            setBoardTitle(data?.boardTitle);
            let tempContent =data?.boardContent; 
            console.log("tempContent : "+tempContent);

            //result -> boardContent
            // let temp = tempContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />");
            let temp = tempContent.replace(/<e>/g, '\n').replace(/<s>/g, ' ')
            console.log("temp : "+temp);
            setBoardContent(temp);
            
            
        })
    },[boardNo]);
    useEffect(()=>{
        ACCESS_TOKEN = localStorage.getItem("accessToken");
        console.log("토큰 : "+ACCESS_TOKEN);

        if(ACCESS_TOKEN){
            console.log("토큰 : "+ACCESS_TOKEN);
        const payload = JSON.parse(atob(ACCESS_TOKEN.split(".")[1]));
        setLoginEmail(payload['user-email']);
        
        }else{
            alert("로그인 후 이용해주세요.");
            // navigator('/login');
            location.href='/login';
            return;
        }
    },[]);
    // 제목 수정 핸들러
const handleTitleChange = (e) => {
    setBoardTitle(e.target.value);
    };
    
  // 내용 수정 핸들러
//.replace(/<script.*?>.*?<\/script>/gi, '').replace(/\n/g, '<e>').replace(/ /g, '<s>')
    // const handleContentChange = (e)=>{
    //     //boardContent -> result
    //     console.log("댓글내용 : "+e.target.value);
    //     let text=e.target.value.replace(/<script.*?>.*?<\/script>/gi, ''); //script가 있을 경우 제거
    //     setBoardContent(e.target.value);
    //     setResult(text.replace(/\n/g, '<e>').replace(/ /g, '<s>'));
    //     setBoardContent(result);
    //     console.log("result : "+result);
    // }
    const handleRemoveImage = (index) => {
        // setImages(images.filter((_, i) => i !== index));
        // console.log("요기닷"+images);
        setImages(images.filter((_, i) => i !== index));
        // blob:http://localhost:3000/93d8fcf8-92c3-417c-9dc5-66fa2ad5338a,blob:http://localhost:3000/8740daa0-5050-44ad-adc5-7fc2546510cf
        /*
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const indexToRemove = 2; 

        arr.splice(indexToRemove, 1);

        console.log(arr); // ["a", "b", "d", "e"]
        
        */
    };
    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);
        console.log("여기보기!!!e.target.files : "+e.target.files);
        if (files.length + images.length > 8) {
            alert("최대 8장까지 업로드할 수 있습니다.");
            return;
        }
        
        // const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...files]);
        // console.log("여기여기"+e.target.files);
        
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
        formData.append("boardContent", 
            boardContent
            .replace(/<script.*?>.*?<\/script>/gi, '')
            .replace(/\n/g, '<e>').replace(/ /g, '<s>')
        );
        console.log("프론트 email : "+loginEmail);
        // 파일 추가
        images.forEach((image //,i

        ) => {
            formData.append("imgFile", image);  // 'imgFile' 이름으로 여러 파일 추가 가능
        });
        
        
        

        // console.log("프론트 email : "+loginEmail);
        updateBoard(formData,navigator,boardNo);
        
        
    
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

        if(changeImg ==1){
            obj={...obj, img:"이미지 변경 여부를 선택해 주세요."}
            setError(obj);
            return false;
        }

        //선택한다고 해놓고 선택 안한경우
        if(changeImg==3 && images.length==0){
            obj={...obj, imgSel:"이미지를 선택해 주세요."}
            setError(obj);
            return false;
        }
        
        return true;
    }

    
  useEffect(()=>{
    scrollTo(0,0);
  },[])
  
    return(
        <>
            {boardData ? (
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
                            <TitleInput 
                                onChange={handleTitleChange} 
                                value={boardTitle} />

                            <Error>{error.title}</Error>
        
                            <h5>내용<span>*</span></h5>
                            {/* <ContentTextarea onChange={(e) => setBoardContent(e.target.value)}/> */}
                            <ContentTextarea 
                                onChange={(e)=>setBoardContent(e.target.value)} 
                                value={boardContent} 
                                
                            />
                            <Error>{error.content}</Error>
                            
                        </Two>
                        <div className="formCon">
                            <FormControl >
                                <h5><FormLabel style={{color:"black"}}>이미지 변경 여부 <span style={{color:"red"}}>*</span></FormLabel></h5>
                                <Error>{error.img}</Error>
                                <RadioGroup name="radio-buttons-group"
                                onChange={(e) => setChangeImg(e.target.value)}>
                                    <FormControlLabel value="2" control={<Radio variant="outlined" />} label="No" />
                                    <FormControlLabel value="3" control={<Radio variant="soft" />} label="Yes" />
                                    
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {changeImg ==3? (
                            <Three>
                            <h5>사진 업로드</h5>
                            <Error>{error.imgSel}</Error>
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
                        ) : (
                            <>
                            </>
                        )}
                    
                        <EndBtn onClick={doSubmit}>등록</EndBtn>
                </Container>
            ) : (
                <>
                </>
            )}
            
        </>
    );
}
export default BoardUpdate;
const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    .formCon{
        width : 50%;
        display: flex;
        justify-content: flex-start;
        }
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