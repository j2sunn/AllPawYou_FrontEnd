import { useEffect, useState } from "react";
import { listNotices } from "../service/NoticeService";
import styled from "styled-components";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoticeListUser = ()=>{
    const [notices, setNotices] = useState([]);
    
      const navigate = useNavigate();
    
      useEffect(() => {
        getAllNotices();
      }, []);
    
      function getAllNotices() {
        listNotices()
          .then((response) => {
            console.log(response.data);
            setNotices(response.data.reverse());
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      
      const goNoticeDetail = (data) => {
        navigate(`/noticeDetail/${data.noticeNo}`,{state: data});

      }
    
    return(
        <>
            <Container>
        <Content>
          <Title>공지사항</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "1rem", boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{borderTop: '2px solid rgba(0,0,0,0.8)', borderBottom: '2px solid rgba(0,0,0,0.8)'}}>
                  <TableCell align="center" sx={{ width: "10%" }}>번호</TableCell>
                  <TableCell align="center" sx={{ width: "60%", fontWeight: 'bold' }}>제목</TableCell>
                  <TableCell align="center" sx={{ width: "30%" }}>등록일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notices.map((item, index) => (
                  <TableRow key={item.noticeTitle} sx={{borderTop: '2px solid rgba(0,0,0,0.3)', borderBottom: '2px solid rgba(0,0,0,0.3)'}}>
                    <TableCell align="center">{notices.length - index}</TableCell>
                    <TableCell align="center" onClick={()=>goNoticeDetail(item)} sx={{fontWeight: 'bold'}}>{item.noticeTitle}</TableCell>
                    <TableCell align="center">{item.noticeDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
  width: 90%;
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  margin: 0 2rem;
  `;
  
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 2rem 0;
  width: 90%;
`;


const Pages = styled.div`
  width: 80%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;