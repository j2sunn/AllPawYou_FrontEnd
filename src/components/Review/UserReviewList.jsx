import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AllReview, DeleteReview } from "../../service/Review";
import { useNavigate } from "react-router-dom";

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
    navigate(`/review/updateReview/${reviewNo}`); // 수정 페이지로 이동
  };

  const goMyBoard = () => {
    navigate(`/review/myReview`);
  };

  return (
    <>
      <Container>
        <SideBar>
          <SideBarTitle>마이 페이지</SideBarTitle>
          <SimpleTreeView>
            <TreeItem itemId="profile" label="프로필" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
            <TreeItem itemId="updateProfile" label="프로필 수정" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
            <TreeItem itemId="order" label="구매 내역" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
            <TreeItem itemId="myData" label="내 활동" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
              <TreeItem itemId="myBoard" label="내 글 관리" onClick={() => goMyBoard()} />
              <TreeItem itemId="myReview" label="내 후기 관리" />
            </TreeItem>
          </SimpleTreeView>
        </SideBar>

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
                      <TableCell align="center">{item.reviewNo}</TableCell>
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

const SideBar = styled.div`
  width: 25%;
  height: 70vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
