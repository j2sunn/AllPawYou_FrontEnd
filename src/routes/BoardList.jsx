import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import {loadList} from "../service/BoardService";
import { Button,TextField} from "@mui/material";
const BoardList = ()=>{
    const navigator = useNavigate();
    const [boardList, setBoardList] = useState([]);
    useEffect(()=>{
        console.log("크카크카크")
        loadList(setBoardList);
    },[]);
    return(
        <>
            <Container>
                <One>
                    <div className="title"><span>자유게시판</span></div>
                    <div style={{marginLeft: "auto"}} className="searchBox">
                        <select style={{marginRight : "10px"}}>
                            <option>제목</option>
                            <option>내용</option>
                            <option>작성자</option>
                        </select>
                        <TextField label="게시글 검색"
                                id="search"
                                variant="outlined"
                                // value={values.email}
                                placeholder="작성자/제목/내용"
                                sx={{ width: "350px", paddingBottom: "10px" }}
                                />
                    </div>
                </One>
                <Two>
                    {/* 최신순 인기순 할 땐 List<MyEntity> findAllByOrderByAAscBDesc(); 이용하기 */}
                <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem', marginRight: '1rem', marginBottom: '1rem',height : '2rem'}} 
                        >
                최신순
            </Button>
            <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem',height : '2rem'}} 
                        >
                인기순
            </Button>
                </Two>
                <Three>
                    {boardList.length>0 ? boardList.map((board,index)=>(
                        <Con key={index} onClick={()=>navigator(`/board/${board.boardNo}`)} style={{border : "1px solid gray", borderRadius : "10px", padding : "10px", marginBottom : "10px"}}>
                            {/*  Con을 반복하기 */}
                            <div className="first">
                                <Div> {board.category === 1 
                                        ? "강아지" 
                                        : board.category === 2 
                                            ? "고양이" 
                                            : "기타"}</Div>
                                <p className="boardTitle">{board.boardTitle}</p>
                                <p className="boardContent">{board.boardContent}</p>
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
                            게시글이 존재하지 않습니다.
                        </>
                    )
                }
                    
                    
                </Three>
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