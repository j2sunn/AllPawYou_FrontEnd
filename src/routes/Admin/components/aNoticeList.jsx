import axios from "axios";
import { useEffect, useState } from "react";
import { listNotices } from "../../../service/NoticeService";
import styled from "styled-components";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ListNoticeComponent = () => {
  
  const [notices, setNotices] = useState([]);

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

  const goAddNotice = () => {
    navigate(`/admin/noticeWrite`);
  };

  const goNoticeUpdate = (data) => {
    navigate(`/admin/noticeUpdate/${data.noticeNo}`, { state: data });
  };

  function removeNotice(noticeNo) {
    Swal.fire({
      title: "해당 공지사항을 삭제하시겠습니까?",
      icon: 'warning',
      
      showCancelButton: true, // false가 default
      confirmButtonColor: '#527853',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      reverseButtons: true
      
   }).then(result => {
      if (result.isConfirmed) { 
        axios
        .delete("http://localhost:8081/api/notice/delete/" + noticeNo)
        .then(() => {
          getAllNotices();
        });
         Swal.fire({
          icon: "success",
          title:'삭제되었습니다.',
          confirmButtonColor: '#527853'
        });
      }
   });
  }

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <Title>공지사항 관리</Title>
      <TableContainer
        component={Paper}
        sx={{ width: "90%", marginTop: "3rem" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#EEC759" }}>
            <TableRow>
              <TableCell align="center" sx={{ width: "8rem" }}>
                번호
              </TableCell>
              <TableCell align="center" sx={{ width: "20rem" }}>
                제목
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                등록일
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                수정/삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((item, index) => (
              <TableRow key={item.noticeTitle}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center" onClick={()=>navigate(`/noticeDetail/${item.noticeNo}`,{state:item})}>{item.noticeTitle}</TableCell>
                <TableCell align="center">{item.noticeDate}</TableCell>
                <TableCell align="center" sx={{ width: "10rem" }}>
                  <Button
                    variant="contained"
                    sx={{ marginRight: "10px" }}
                    onClick={() => goNoticeUpdate(item)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => removeNotice(item.noticeNo)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProductButton>
        <Button
          variant="contained"
          sx={{ marginTop: "25px" }}
          onClick={() => goAddNotice()}
        >
          공지사항 등록
        </Button>
      </AddProductButton>
      <Pages></Pages>
    </>
  );
};

export default ListNoticeComponent;

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
