import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import {loadList} from "../service/BoardService";
import { Button,FormControl,InputLabel,MenuItem,Select,TextField} from "@mui/material";
const BoardList = ()=>{
    const navigator = useNavigate();
    const [boardList, setBoardList] = useState([]);

    const { state } = useLocation();
    const cp = state?.cp;
    console.log("여기 cp : "+JSON.stringify(cp));

    useEffect(()=>{
        console.log("크카크카크")
        loadList(setBoardList);
        if(cp !=null) {
            setCurrentPage(cp.currentPage);
        }
        console.log("currentPage : "+currentPage);
    },[]);
    const formatContent = (content) => {
        // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
        const singleLineContent = content.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0];
        
        // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
        return singleLineContent.length > 10 
            ? `${singleLineContent.slice(0, 10)}...` 
            : singleLineContent;
    };
    const ITEMS_PER_PAGE = 8; // 한 페이지에 표시할 게시글 수
    

    //===========================================================================================================
    //상세조회,리스트 조회 페이지 서로 이동 시 전달해야할 데이터
    const [selectedCategory, setSelectedCategory] = useState(1); //필터해서 볼 카테고리(강아지고양이)
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지쪽수 초기값
    const [searchOpt, setSearchOpt] = useState("a"); //검색옵션(작성자,제목,내용)
    // console.log("검색 옵션 : "+searchOpt);
    //===========================================================================================================
    const totalPages = Math.ceil(boardList.length / ITEMS_PER_PAGE);
     // 현재 페이지에 해당하는 게시글 슬라이싱
        const currentBoardList = boardList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //게시글 상세조회랑 리스트랑 주고받을 정보 : cp, 카테고리 선택 상태, 검색옵션,검색키워드
    return(
        <>
            <Container>
                <One>
                    <div className="title"><span>자유게시판</span></div>
                    <div style={{marginLeft: "auto"}} className="searchBox">
                        
                        <FormControl fullWidth style={{width: "120px", marginRight: "1rem"}}>
                        <InputLabel id="demo-simple-select-label">선택하세요</InputLabel>
                        <Select onChange={(e)=>setSearchOpt(e.target.value)}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={''}
                            label="선택하세요"
                            style={{width: "120px"}}
                        >
                            <MenuItem value={'u'}>작성자</MenuItem>
                            <MenuItem value={'t'}>제목</MenuItem>
                            <MenuItem value={'c'}>내용</MenuItem>
                        </Select>
                        </FormControl>
                        <TextField label="게시글 검색"
                                id="search"
                                variant="outlined"
                                // value={values.email}
                                placeholder="작성자/제목/내용"
                                sx={{ width: "350px" }}
                                />
                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem', marginLeft: '1rem', marginBottom: '1rem',height : '2rem'}} 
                            // onClick={}
                            >
                        검색
                        </Button>
                    </div>
                </One>
                <Two>
                    <div className="div2Con">
                        <Div2 className="category"
                            onClick={() => setSelectedCategory(1)}
                            selected={selectedCategory === 1}
                            >강아지</Div2>
                        <Div2 className="category"
                        onClick={() => setSelectedCategory(2)}
                        selected={selectedCategory === 2}
                        >고양이</Div2>
                        <Div2 className="category"
                        onClick={() => setSelectedCategory(3)}
                        selected={selectedCategory === 3}
                        >기타
                        </Div2>
                    </div>
                    <div className="div2ConBro">
                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem', marginRight: '1rem', marginBottom: '1rem',height : '2rem'}} 
                                    >
                            최신순
                        </Button>
                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem',height : '2rem'}} 
                                    >
                            인기순
                        </Button>
                    </div>
                    {/* 최신순 인기순 할 땐 List<MyEntity> findAllByOrderByAAscBDesc(); 이용하기 */}
                
                </Two>
                <Three>
                    {currentBoardList.length>0 ? currentBoardList.map((board,index)=>(
                        <Con key={index} onClick={()=>navigator(`/board/${board.boardNo}`, {state : {cp : {currentPage}}})} style={{border : "1px solid gray", borderRadius : "10px", padding : "10px", marginBottom : "10px"}}>
                            {/*  Con을 반복하기 */}
                            <div className="first">
                                <Div> {board.category === 1 
                                        ? "강아지" 
                                        : board.category === 2 
                                            ? "고양이" 
                                            : "기타"}</Div>
                                <p className="boardTitle">{board.boardTitle}</p>
                                {/* <p dangerouslySetInnerHTML={{ __html: boardData.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} /> */}
                                <p className="boardContent"
                                    // dangerouslySetInnerHTML={{ __html: board.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }}
                                    > {formatContent(board.boardContent)}</p>
                                <div className="boardInfo">
                                    <img src="http://localhost:8081/images/board/happy.png"/>
                                    <p className="boardNick">{board.boardUsername}</p>
                                    <p className="boardComment">댓글 : {board.commentCount}</p>
                                    <p className="boardLike"><AiOutlineLike />{board.likeCount}</p>
                                    
                                </div>
                            </div>
                            {
                                board.imgRename ? (
                                    <div className="second">
                                        <img src={`http://localhost:8081/images/board/${board.imgRename}`}/>
                                    </div>        
                                ) : (
                                    <>
                                    </>
                                )
                            }
                            
                        
                        
                        
                    </Con>
                    )) : (
                        <>
                            게시글 로딩중입니다.
                        </>
                    )
                }
                    
                    

                </Three>
                <Pagination>
                    <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>이전</Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button key={i + 1} onClick={() => handlePageChange(i + 1)}
                        className={currentPage == i + 1 ? 'selected' : ''}>{i + 1}</Button>
                    ))}
                    <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>다음</Button>
                </Pagination>
                <Four>
                    
                    <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem',marginBottom : "2rem"}} 
                        onClick={()=>navigator('/boardWrite')}>
                글 작성하기
            </Button>
                </Four>
            </Container>
            
            
            
            
        </>
    );
}
export default BoardList;
const Container = styled.div`
    display: flex;
    flex-direction : column;
    align-items: center;
`;
const One = styled.div`
    width : 50%;
    display : flex;
    align-items: center;
    .searchBox{
        display : flex;
        align-items : center;
    }
    .title{
        display : flex;
        align-items: center;
        padding : 10px;
        border : 2px solid black;
        border-radius : 20px;
        width : 100px;
        text-align: center;
    }

`;
const Two = styled.div`
    width : 50%;
    display : flex;
    .div2Con{
        display : flex;
        align-items: center;
    }
    .div2ConBro{
        margin-left : auto;
    }
`;
const Three = styled.div`
    width : 50%;
    
`;
const Con = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    height : 170px;
    .first{
        display: flex;
        flex-direction : column;
        .boardInfo{
            display: flex;
            flex-direction : row;
            align-items: center;
            img{
                width : 40px;
                height : 40px;
            }
            .boardNick{
                margin : 0px 10px;
            }    
            .boardComment{
                margin : 0px 10px;
            }   
            .boardLike{
                margin : 0px 10px;
                color : red;
            }   
        }
    }
    .second{
        display: flex;
        img{
            width : 100px;
            height : 100px;
        }
    }
    .boardTitle{
        font-size : 20px;
        font-weight: bold;
    }
    .boardContent{
        font-size : 13px;
        color : gray;
    }
`;
const Four = styled.div`
    width : 50%;
    display: flex;
    justify-content: flex-end;
`;
const Div = styled.div`

    background-color: #EEC759;
        margin-right : 10px;
        width : 60px;
        height : 30px;
        font-weight: bold;
        border-radius: 40px;
        text-align: center;
        padding : 7px;
        margin : 3px;
`;
const Div2 = styled.div`
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
const Pagination = styled.div`
    display: flex;
    justify-content: center;
    .selected{
        background-color: #EEC759;
    }
    Button{
        margin : 5px;
    }
`;