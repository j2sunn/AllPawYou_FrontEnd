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

  const formatContent = (content) => {
    // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
    const singleLineContent = content.replace(/<e>/g, " ").replace(/<s>/g, " ").split("\n")[0];

    // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
    return singleLineContent.length > 25 ? `${singleLineContent.slice(0, 25)}...` : singleLineContent;
  };

  return (
    <>
      <Title>후기 관리</Title>
      <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem", marginLeft: '3rem', boxShadow: 'none'  }}>
        <Table>
          <TableHead>
            <TableRow sx={{borderTop: '2px solid rgba(0,0,0,0.8)', borderBottom: '2px solid rgba(0,0,0,0.8)'}}>
              <TableCell align="center" sx={{width: '5rem'}}>번호</TableCell>
              <TableCell align="center" sx={{width: '5rem'}}>별점</TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                상품
              </TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center" sx={{ width: "20rem" }}>
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
              <TableRow key={item.reviewNo} sx={{borderTop: '2px solid rgba(0,0,0,0.3)', borderBottom: '2px solid rgba(0,0,0,0.3)'}}>
                <TableCell align="center">{item.reviewNo}</TableCell>
                <TableCell align="center">{item.reviewStar}</TableCell>
                <TableCell align="center">
                  {item.productName}
                </TableCell>
                <TableCell align="center">{item.username}</TableCell>
                <TableCell align="center">{formatContent(item.reviewContent)}</TableCell>
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
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
`;

