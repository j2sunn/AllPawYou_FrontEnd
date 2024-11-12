import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AllReview, DeleteReview } from "../../service/Review";
import { useNavigate } from "react-router-dom";
import MypageSideBar from "../common/MypageSideBar";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    scrollTo(0, 0);
    getAllReviews();
  }, []);

  function getAllReviews() {
    AllReview()
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeReview(reviewNo) {
    console.log(reviewNo);

    DeleteReview(reviewNo)
      .then((response) => {
        console.log(response);
        getAllReviews();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleUpdate = (reviewNo) => {
    navigate(`/review/updateReview/${reviewNo}`);
  };

  const formatContent = (content) => {
    // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
    const singleLineContent = content
      .replace(/<e>/g, " ")
      .replace(/<s>/g, " ")
      .split("\n")[0];

    // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
    return singleLineContent.length > 25
      ? `${singleLineContent.slice(0, 25)}...`
      : singleLineContent;
  };

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const perPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLastMessage = currentPage * perPage;
  const indexOfFirstMessage = indexOfLastMessage - perPage;
  const currentReviews = reviews
    .filter((item) => item.userNo === Number(localStorage.getItem("no")))
    .slice(indexOfFirstMessage, indexOfLastMessage);

  const totalPages = Math.ceil(
    reviews.filter((item) => item.userNo === Number(localStorage.getItem("no")))
      .length / perPage
  ); // 전체 페이지 수
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <MypageSideBar />
      <Container>
        <Content>
          <Title>내 후기 관리</Title>
          <TableContainer
            component={Paper}
            sx={{
              width: "90%",
              marginTop: "3rem",
              marginLeft: "3rem",
              boxShadow: "none",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderTop: "2px solid rgba(0,0,0,0.8)",
                    borderBottom: "2px solid rgba(0,0,0,0.8)",
                  }}
                >
                  <TableCell align="center" sx={{ width: "10rem" }}>
                    사진
                  </TableCell>
                  <TableCell align="center" sx={{ width: "5rem" }}>
                    별점
                  </TableCell>
                  <TableCell align="center">상품</TableCell>
                  <TableCell align="center" sx={{ width: "15rem" }}>
                    내용
                  </TableCell>
                  <TableCell align="center">작성일</TableCell>
                  <TableCell align="center" sx={{ width: "15rem" }}>
                    수정 / 삭제
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentReviews.map((item) => (
                  <TableRow
                    key={item.reviewNo}
                    sx={{
                      borderTop: "2px solid rgba(0,0,0,0.3)",
                      borderBottom: "2px solid rgba(0,0,0,0.3)",
                    }}
                  >
                    <TableCell align="center">
                      <img
                        key={item.reviewImgNo}
                        src={
                          item.reviewImg && item.reviewImg.length > 0 // 이미지 배열이 존재하고 길이가 0보다 큰 경우
                            ? `http://localhost:8081${item.reviewImg[0].reviewImgPath}${item.reviewImg[0].reviewImgRename}`
                            : null // 이미지가 없으면 null
                        }
                        alt={
                          item.reviewImg && item.reviewImg.length > 0
                            ? item.reviewImgOriginName
                            : "이미지가 없습니다."
                        } // 이미지가 없을 때 대체 텍스트
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    </TableCell>
                    <TableCell align="center">{item.reviewStar}</TableCell>
                    <TableCell align="center">{item.productName}</TableCell>
                    <TableCell align="center">
                      {formatContent(item.reviewContent)}
                    </TableCell>
                    <TableCell align="center">
                      {item.reviewDate.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(item.reviewNo)}
                        sx={{ marginRight: "1.5rem" }}
                      >
                        <MdDriveFileRenameOutline size="25" />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeReview(item.reviewNo)}
                      >
                        <FaRegTrashAlt size="25" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pages>
            {totalPages > 1 && (
              <Pagination
                count={totalPages} // 총 페이지 수
                page={currentPage} // 현재 페이지
                onChange={handlePageChange} // 페이지 변경 핸들러
                siblingCount={2} // 현재 페이지 주변에 보이는 페이지 수
                boundaryCount={2} // 처음과 끝에 보이는 페이지 수
                color="primary"
              />
            )}
          </Pages>
        </Content>
      </Container>
    </Box>
  );
};

export default ReviewList;

const Box = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
`;

const Content = styled.div`
  width: 100%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
