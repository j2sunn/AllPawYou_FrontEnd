import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AdminSideBar from "./AdminSideBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadList} from "../../service/BoardService";
const AdminBoardList = ()=>{
    
    const [boardList, setBoardList] = useState(null);
    useEffect(()=>{
        loadList(setBoardList);
        
    },[]);
    const formatContent = (content) => {
        // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
        const singleLineContent = content.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0];
        
        // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
        return singleLineContent.length > 10 
            ? `${singleLineContent.slice(0, 10)}...` 
            : singleLineContent;
    };
    return (
        <>
        
        <Container>
                <AdminSideBar />
                <Content>
                    <Title>상품 관리</Title>
                    {boardList ? (
                        <>
                            <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: "#EEC759" }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ width: '8rem' }}>번호</TableCell>
                                            <TableCell align="center" sx={{ width: '10rem' }}>제목</TableCell>
                                            <TableCell align="center" sx={{ width: '30rem' }}>내용</TableCell>
                                            <TableCell align="center" sx={{ width: '10rem' }}>작성자</TableCell>
                                            <TableCell align="center" sx={{ width: '10rem' }}>댓글 수</TableCell>
                                            <TableCell align="center" sx={{ width: "15rem" }}>삭제</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {boardList.map((board, index) => (
                                            <TableRow key={board.boardNo} >
                                                {/* {`공개여부 : ${board.boardVisible}`} */}
                                                <TableCell align="center" sx={{ width: '8rem' }}>{board.boardNo}</TableCell>
                                                <TableCell align="center" sx={{ width: '10rem' }}>
                                                    <Link to={`/board/${board.boardNo}`} style={{textDecoration : 'none', textDecorationColor : 'inherit', color: 'inherit'}}>
                                                        {board.boardTitle}
                                                    </Link>
                                                </TableCell>
                                                {/* <p dangerouslySetInnerHTML={{ __html: boardData.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} /> */}
                                                <TableCell align="center" sx={{ width: '30rem' }}>{formatContent(board.boardContent)}</TableCell>
                                                <TableCell align="center" sx={{ width: '10rem' }}>{board.boardUsername}</TableCell>
                                                <TableCell align="center" sx={{ width: '10rem' }}>{board.commentCount}</TableCell>
                                                <TableCell align="center" sx={{ width: "10rem" }} >
                                                    <Button variant="outlined" >삭제</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <AddProductButton>
                                <Button variant="contained" sx={{ marginTop : '25px'}}>상품 등록</Button>
                            </AddProductButton>
                            <Pages>1 2 3 4 5 6</Pages>
                        </>
                    ) : (
                        <>
                            작성된 게시글이 존재하지 않습니다.
                        </>
                    )}
                    
                    
                </Content>
            </Container>
            </>
        );
}
export default AdminBoardList;
const Container = styled.div`
    display: flex;
`;
const SideBarTitle = styled.div`
    font-size: 2rem;
    padding-bottom: 3rem;
`;
const Title = styled(SideBarTitle)`
    width: 90%;
    border-bottom: 3px solid #c4e1f6;
`;

const Content = styled.div`
    width: 75%;
`;

const Pages = styled.div`
    width: 90%;
    margin-top: 3rem;
    display: flex;
    justify-content: center;
`;

const AddProductButton = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 90%; 
`;