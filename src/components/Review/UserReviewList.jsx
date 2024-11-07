import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AllReview, DeleteReview, getReviewByreviewNo } from "../../service/Review";
import { useNavigate } from "react-router-dom";
import MypageSideBar from "../common/MypageSideBar";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
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

  return (
    <>
      <Container>
        <MypageSideBar />

        <Content>
          <Title>내 후기 관리</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EEC759" }}>
                <TableRow>
                  <TableCell align="center">사진</TableCell>
                  <TableCell align="center">별점</TableCell>
                  <TableCell align="center">상품</TableCell>
                  <TableCell align="center" sx={{ width: "15rem" }}>
                    내용
                  </TableCell>
                  <TableCell align="center">작성일</TableCell>
                  <TableCell align="center" sx={{ width: "3rem" }}>
                    수정
                  </TableCell>
                  <TableCell align="center" sx={{ width: "3rem" }}>
                    삭제
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews
                  .filter((item) => item.userNo === Number(localStorage.getItem("no"))) // localStorage에서 'no' 값을 가져와 필터링
                  .map((item) => (
                    <TableRow key={item.reviewNo}>
                      <TableCell align="center">
                        <img
                          key={item.reviewImgNo}
                          src={`http://localhost:8081${item.reviewImg[0].reviewImgPath}${item.reviewImg[0].reviewImgRename}`}
                          alt={item.reviewImgOriginName} // 원본 이름을 alt로 사용
                          style={{ width: "100px", height: "100px" }} // 원하는 스타일 적용
                        />
                      </TableCell>
                      <TableCell align="center">{item.reviewStar}</TableCell>
                      <TableCell align="center">{item.productName}</TableCell>
                      <TableCell align="center">{item.reviewContent}</TableCell>
                      <TableCell align="center">{item.reviewDate.substring(0, 10)}</TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" color="error" onClick={() => handleUpdate(item.reviewNo)}>
                          수정
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" color="error" onClick={() => removeReview(item.reviewNo)}>
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

export default ReviewList;

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
  width: 100%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
