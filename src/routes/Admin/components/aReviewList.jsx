import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AllReview, DeleteReview, ToggleVisibility } from "../../../service/Review";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiEyeBold, PiEyeSlashBold, PiStarFill, PiStarHalfFill, PiStarLight } from "react-icons/pi";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 시 돌이킬 수 없습니다.",
      icon: "warning",

      showCancelButton: true, // false가 default
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteReview(reviewNo)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "삭제 되었습니다.",
              confirmButtonColor: "#527853",
              confirmButtonText: "닫기",
            }).then(() => {
              location.reload(true);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
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

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const PerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(reviews.length / PerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  

  return (
    <>
      <Title>후기 관리</Title>
      <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem", marginLeft: "3rem", boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderTop: "2px solid rgba(0,0,0,0.8)", borderBottom: "2px solid rgba(0,0,0,0.8)" }}>
              <TableCell align="center" sx={{ width: "10rem" }}>
                별점
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                상품
              </TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center" sx={{ width: "20rem" }}>
                내용
              </TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                공개 / 삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentReviews.map((item) => {
              // 별 개수 계산
              const totalStars = 5;
              const fullStars = Math.floor(item.reviewStar); // 리뷰의 별점 가져오기
              const halfStar = item.reviewStar % 1 >= 0.5 ? 1 : 0; // 반쪽 별
              const emptyStars = totalStars - fullStars - halfStar; // 빈 별 개수

              return (
                <TableRow key={item.reviewNo} sx={{ borderTop: "2px solid rgba(0,0,0,0.3)", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                  <TableCell align="center" sx={{ color: "#EEC759" }}>
                    {/* 채워진 별 */}
                    {[...Array(fullStars)].map((_, i) => (
                      <PiStarFill className="star-lg" key={`full-${i}`} />
                    ))}
                    {/* 반쪽 별 (있을 경우) */}
                    {halfStar > 0 && <PiStarHalfFill className="star-lg half" />}
                    {/* 빈 별 */}
                    {[...Array(emptyStars)].map((_, i) => (
                      <PiStarLight className="star-lg" key={`empty-${i}`} />
                    ))}
                  </TableCell>
                  <TableCell align="center">{item.productName}</TableCell>
                  <TableCell align="center">{item.username}</TableCell>
                  <TableCell align="center">{formatContent(item.reviewContent)}</TableCell>
                  <TableCell align="center">{item.reviewDate.substring(0, 10)}</TableCell>
                  <TableCell align="center">
                    {item.reviewVisible === "Y" ? (
                      <Button variant="contained" color="primary" onClick={() => changeVisibility(item.reviewNo)} sx={{ marginRight: "1.5rem" }}>
                        숨김
                      </Button>
                    ) : (
                      <Button variant="contained" color="error" onClick={() => changeVisibility(item.reviewNo)} sx={{ marginRight: "1.5rem" }}>
                        해제
                      </Button>
                    )}
                    <Button variant="outlined" color="primary" onClick={() => removeReview(item.reviewNo)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
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

const Pages = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
