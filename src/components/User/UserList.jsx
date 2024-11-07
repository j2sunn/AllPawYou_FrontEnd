import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AllReview, DeleteReview } from "../../service/Review";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]); // 초기 상태를 빈 배열로 설정

  useEffect(() => {
    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    try {
      const response = await AllReview();
      setReviews(response || []); // 응답이 undefined일 경우 빈 배열로 설정
    } catch (error) {
      console.error(error);
    }
  };

  const removeReview = async (reviewNo) => {
    try {
      await DeleteReview(reviewNo);
      getAllReviews(); // 리뷰 삭제 후 다시 리뷰 목록을 가져옵니다.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <SideBar>
          <SideBarTitle>관리자 메뉴</SideBarTitle>
          <SimpleTreeView sx={{border: '3px solid #EEC759', borderRadius: '15px', padding: '4rem'}}>
            <TreeItem itemId="0" label="회원관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem", fontWeight: 'bold' } }} />
            <TreeItem itemId="board" label="게시판 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem", fontWeight: 'bold' } }}>
              <TreeItem itemId="1" label="공지사항" sx={{"& .MuiTreeItem-label": {fontWeight: '100'}}}/>
              <TreeItem itemId="2" label="자유게시판" sx={{"& .MuiTreeItem-label": {fontWeight: '100'}}}/>
              <TreeItem itemId="3" label="FAQ" sx={{"& .MuiTreeItem-label": {fontWeight: '100'}}}/>
            </TreeItem>
            <TreeItem itemId="shopping-mall" label="쇼핑몰 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem", fontWeight: 'bold' } }}>
              <TreeItem itemId="4" label="상품 관리" sx={{"& .MuiTreeItem-label": {fontWeight: '100'}}}/>
              <TreeItem itemId="5" label="매출 관리" sx={{"& .MuiTreeItem-label": {fontWeight: '100'}}}/>
              <TreeItem itemId="6" label="주문 관리" sx={{"& .MuiTreeItem-label": {fontWeight: '100'}}}/>
            </TreeItem>
          </SimpleTreeView>
        </SideBar>
        <Content>
          <Title>리뷰 관리</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EEC759" }}>
                <TableRow>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">별점</TableCell>
                  <TableCell align="center">내용</TableCell>
                  <TableCell align="center">작성일</TableCell>
                  <TableCell align="center">사용자 번호</TableCell>
                  <TableCell align="center" sx={{ width: "15rem" }}>
                    삭제
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(reviews) &&
                  reviews.map(
                    (
                      item,
                      index // 조건부 렌더링
                    ) => (
                      <TableRow key={item.reviewNo}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{item.reviewStar}</TableCell>
                        <TableCell align="center">{item.reviewContent}</TableCell>
                        <TableCell align="center">{item.reviewDate || "N/A"}</TableCell> {/* 작성일이 없을 경우 N/A 표시 */}
                        <TableCell align="center">{item.userNo}</TableCell>
                        <TableCell align="center" sx={{ width: "15rem" }}>
                          <Button variant="outlined" color="error" onClick={() => removeReview(item.reviewNo)}>
                            리뷰 삭제
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pages></Pages>
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
  min-height: 700px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideBarTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
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
