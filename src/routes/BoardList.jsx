import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import {loadList} from "../service/BoardService";
const BoardList = ()=>{
    const navigator = useNavigate();
    const [boardList, setBoardList] = useState([]);
    useState(()=>{
        loadList(setBoardList);
    },[]);
    return(
        <>
            <Container>
                <One>
                    <div className="title">자유게시판</div>
                    <div className="search"><IoIosSearch /></div>
                </One>
                <Two>
                    <button>최신 순</button>
                    <button>인기 순</button>
                </Two>
                <Three>
                    {boardList?.map((board,index)=>(
                        <Con key={index}>
                            {/*  Con을 반복하기 */}
                            <div className="first">
                                <Div> 강아지</Div>
                                <p className="boardTitle">피부에 검은 좁쌀같은 각질</p>
                                <p className="boardContent">피부에 이런 좁쌀같은 각질이 발견되는데 관련 질병이 무엇이 있을 수 있나요ㅜㅜ</p>
                                <div className="boardInfo">
                                    <img src="http://localhost:8081/images/board/happy.png"/>
                                    <p className="boardNick">닉네임당근</p>
                                    <p className="boardComment">댓글 : 2</p>
                                    <p className="boardLike"><AiOutlineLike />200</p>
                                    
                                </div>
                            </div>
                            <div className="second">
                                <img src="http://localhost:8081/images/board/happy.png"/>
                            </div>
                        
                        
                        
                    </Con>
                    ))}
                    
                    
                </Three>
                <Four>
                    <button onClick={()=>navigator('/boardWrite')}>글 작성하기</button>
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
    
    .title{
        padding : 10px;
        border : 2px solid black;
        border-radius : 20px;
        width : 100px;
        text-align: center;
    }
    .search{
        border : 2px solid black;
        border-radius : 20px;
        width : 600px;
        height : 50px;
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