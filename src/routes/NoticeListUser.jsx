// import { useLocation, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { IoIosSearch } from "react-icons/io";
// import { AiOutlineLike } from "react-icons/ai";
// import { useEffect, useState } from "react";
// import {loadList} from "../service/BoardService";
// import { Button,FormControl,InputLabel,MenuItem,Select,TextField} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { listNotices } from "../service/NoticeService";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoticeListUser = ()=>{
    const [notices, setNotices] = useState([
        // {
        //   noticeTitle: "a",
        //   noticeDate: "2024-11-02",
        // },
        // {
        //   noticeTitle: "b",
        //   noticeDate: "2024-11-02",
        // },
        // {
        //   noticeTitle: "c",
        //   noticeDate: "2024-11-02",
        // },
        // {
        //   noticeTitle: "d",
        //   noticeDate: "2024-11-02",
        // },
      ]);
    
      const [noticeData, setNoticeData] = useState(null);
    
      const navigate = useNavigate();
    
      useEffect(() => {
        getAllNotices();
      }, []);
    
      function getAllNotices() {
        listNotices()
          .then((response) => {
            console.log(response.data);
            setNotices(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      
      const goNoticeDetail = (data) => {
        navigate(`/noticeDetail/${data.noticeNo}`,{state: data});

      }
    

    // const navigator = useNavigate();
    // const [noticeList, setBoardList] = useState([]);

    // const { state } = useLocation();
    // const cp = state?.cp;
    // console.log("여기 cp : "+JSON.stringify(cp));

    // useEffect(()=>{
    //     console.log("크카크카크")
    //     loadList(setBoardList);
    //     if(cp !=null) {
    //         setCurrentPage(cp.currentPage);
    //     }
    //     console.log("currentPage : "+currentPage);
    // },[]);
    // const formatContent = (content) => {
    //     // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
    //     const singleLineContent = content.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0];
        
    //     // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
    //     return singleLineContent.length > 10 
    //         ? `${singleLineContent.slice(0, 10)}...` 
    //         : singleLineContent;
    // };
    // const ITEMS_PER_PAGE = 8; // 한 페이지에 표시할 게시글 수
    

    // //===========================================================================================================
    // //상세조회,리스트 조회 페이지 서로 이동 시 전달해야할 데이터
    // const [selectedCategory, setSelectedCategory] = useState(1); //필터해서 볼 카테고리(강아지고양이)
    // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지쪽수 초기값
    // const [searchOpt, setSearchOpt] = useState("a"); //검색옵션(작성자,제목,내용)
    // // console.log("검색 옵션 : "+searchOpt);
    // //===========================================================================================================
    // const totalPages = Math.ceil(boardList.length / ITEMS_PER_PAGE);
    //  // 현재 페이지에 해당하는 게시글 슬라이싱
    //     const currentBoardList = boardList.slice(
    //     (currentPage - 1) * ITEMS_PER_PAGE,
    //     currentPage * ITEMS_PER_PAGE
    // );
    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };

    //게시글 상세조회랑 리스트랑 주고받을 정보 : cp, 카테고리 선택 상태, 검색옵션,검색키워드
    return(
        <>
            <Container>
        <Content>
          <Title>공지사항</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EEC759" }}>
                <TableRow>
                  <TableCell align="center" sx={{ width: "8rem" }}>번호</TableCell>
                  <TableCell align="center" sx={{ width: "20rem" }}>제목</TableCell>
                  <TableCell align="center" sx={{ width: "10rem" }}>등록일</TableCell>
                  {/* <TableCell align="center" sx={{ width: "15rem" }}>
                    수정/삭제
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {notices.map((item, index) => (
                  <TableRow key={item.noticeTitle}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center" onClick={()=>goNoticeDetail(item)}>{item.noticeTitle}</TableCell>
                    <TableCell align="center">{item.noticeDate}</TableCell>
                        {/* <TableCell align="center" sx={{ width: "10rem" }} >
                            <Button variant="contained"
                                sx={{ marginRight: '10px' }} 
                                onClick={() => navigate(`/admin/noticeUpdate`,{state:{ noticeNo : noticeData.noticeNo}})} >수정</Button>
                            <Button variant="outlined" onClick={() => removeNotice(item.noticeNo)}>삭제</Button>
                        </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* <AddProductButton>
                <Button variant="contained" sx={{ marginTop : '25px'}}
                onClick={() => goAddNotice()}>공지사항 등록</Button>
          </AddProductButton> */}
          <Pages></Pages>
        </Content>
      </Container>
            
            
            
            
        </>
    );
}
export default NoticeListUser;



const Container = styled.div`
  width: 100%;
  min-height: 600px;
  margin: 2rem 4rem;
  display: flex;
`;

const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  margin: 0 2rem;
  `;
  
const Title = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;


const Pages = styled.div`
  width: 80%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

const AddProductButton = styled.div`
     display: flex;
  justify-content: flex-end;
   width: 90%; 
`;