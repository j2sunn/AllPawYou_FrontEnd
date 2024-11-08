import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AllReview, DeleteReview, ToggleVisibility } from "../../../service/Review";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]); // reviews로 변경

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

  function changeVisibility(reviewNo) {
    console.log(reviewNo);

    ToggleVisibility(reviewNo)
      .then((response) => {
        console.log(response);
        getAllReviews();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Title>후기 관리</Title>
      <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#EEC759" }}>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">별점</TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                상품
              </TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                내용
              </TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                출력 / 삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((item) => (
              <TableRow key={item.reviewNo}>
                <TableCell align="center">{item.reviewNo}</TableCell>
                <TableCell align="center">{item.reviewStar}</TableCell>
                <TableCell align="center" sx={{ width: "10rem" }}>
                  {item.productName}
                </TableCell>
                <TableCell align="center">{item.username}</TableCell>
                <TableCell align="center">{item.reviewContent}</TableCell>
                <TableCell align="center">{item.reviewDate.substring(0, 10)}</TableCell>
                <TableCell align="center">
                  {item.reviewVisible === "Y" ? (
                    <Button variant="contained" color="secondary" onClick={() => changeVisibility(item.reviewNo)} sx={{ marginRight: "1.5rem" }}>
                      <PiEyeSlashBold size="25" />
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => changeVisibility(item.reviewNo)} sx={{ marginRight: "1.5rem" }}>
                      <PiEyeBold size="25" />
                    </Button>
                  )}
                  <Button variant="contained" color="error" onClick={() => removeReview(item.reviewNo)}>
                    <FaRegTrashAlt size="25" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Pages>1 2 3 4 5 6</Pages> */}
    </>
  );
};

export default ReviewList;

const Title = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;
