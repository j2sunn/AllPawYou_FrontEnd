import { useEffect, useState } from "react";
import { deleteNotice, listNotices } from "../service/NoticeService";
//import HeaderComponent from "../components/common/HeaderComponent";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AdminSideBar from "../components/common/AdminSideBar";
//import FooterComponent from "../components/common/FooterComponent";

const ListNoticeComponent = () => {
  const [notices, setNotices] = useState([
    {
      noticeTitle: "a",
      noticeDate: "2024-11-02",
    },
    {
      noticeTitle: "b",
      noticeDate: "2024-11-02",
    },
    {
      noticeTitle: "c",
      noticeDate: "2024-11-02",
    },
    {
      noticeTitle: "d",
      noticeDate: "2024-11-02",
    },
  ]);

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

  function removeNotice(noticeNo) {
    console.log(noticeNo);

    deleteNotice(noticeNo)
      .then((response) => {
        console.log(response);
        getAllNotices();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Container>
        <AdminSideBar />
        <Content>
          <Title>공지사항 관리</Title>
          <br/>
          <Button variant="outlined" color="error" sx={{width: '20%'}}>
            새 공지사항
          </Button>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EEC759" }}>
                <TableRow>
                  <TableCell align="center" sx={{width: '14%'}}>번호</TableCell>
                  <TableCell align="center" sx={{width: '30%'}}>제목</TableCell>
                  <TableCell align="center" sx={{width: '30%'}}>등록일</TableCell>
                  <TableCell align="center" sx={{ width: "8%" }}>
                    수정
                  </TableCell>
                  <TableCell align="center" sx={{ width: "8%" }}>
                    삭제
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notices.map((item, index) => (
                  <TableRow key={item.noticeTitle}>
                    <TableCell align="center" sx={{width: '14%'}}>{index + 1}</TableCell>
                    <TableCell align="center" sx={{width: '30%'}}>{item.noticeTitle}</TableCell>
                    <TableCell align="center" sx={{width: '30%'}}>{item.noticeDate}</TableCell>
                    <TableCell align="center" sx={{ width: "8%" }}>
                      <Button variant="outlined" color="error">
                        수정
                      </Button>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "8%" }} onClick={() => removeNotice(item.noticeNo)}>
                      <Button variant="outlined" color="error">
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pages>1 2 3 4 5 6</Pages>
        </Content>
      </Container>
    </>
  );
};

export default ListNoticeComponent;


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

