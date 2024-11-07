import { FaRegStar, FaStar } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Button, TextField } from "@mui/material";
import { CreateReview } from "../../service/Review";
import { useNavigate } from "react-router-dom";

const UserReviewCreate = () => {
  const [starScore, setStarScore] = useState(0);
  const [reviewContent, setReviewContent] = useState(""); // 후기를 저장할 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 사용

  const ratingStarHandler = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i + 1} onClick={() => setStarScore(i + 1)}>
        {i + 1 <= starScore ? <FaStar className="star" /> : <FaRegStar className="star" />}
      </span>
    ));
  };

  const handleSubmit = () => {
    if (starScore === 0 || reviewContent.trim() === "") {
      // 별점 또는 후기가 비어있을 경우 경고
      alert("별점과 후기를 모두 입력해주세요.");
      return;
    }

    const reviewData = {
      userNo: localStorage.getItem("no"), // localStorage에서 사용자 번호 가져오기
      productNo: "1", // 같은 방식으로 상품 번호 가져오기 나중에 추가하기
      reviewStar: starScore,
      reviewContent: reviewContent,
      reviewVisible: "Y",
    };

    CreateReview(reviewData)
      .then((response) => {
        // 성공적으로 리뷰가 등록된 후의 처리
        alert("리뷰가 등록되었습니다.");
        navigate("/review/myReview"); // 원하는 경로로 이동 (예: 내 후기 관리 페이지)
      })
      .catch((error) => {
        console.error("리뷰 등록 실패:", error);
        alert("리뷰 등록에 실패했습니다.");
      });
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
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
              <TreeItem itemId="myBoard" label="내 글 관리" />
              <TreeItem itemId="myReview" label="내 후기 관리" />
            </TreeItem>
          </SimpleTreeView>
        </SideBar>

        <Content>
          <Title>후기 작성</Title>
          <ReviewContainer>
            <StarSection>
              {ratingStarHandler()}
              <span>(필수)*</span>
            </StarSection>

            <TextField
              label="후기"
              variant="outlined"
              placeholder="다른 고객님에게 도움이 되도록 상품에 대한 솔직한 평가를 남겨주세요."
              required
              rows={4}
              multiline
              fullWidth
              value={reviewContent} // 상태와 연결
              onChange={(e) => setReviewContent(e.target.value)} // 상태 업데이트
            />

            <ButtonContainer>
              <Button variant="outlined" onClick={handleCancel} sx={{ width: "100%", height: "56px", fontSize: "1.5rem", marginRight: "0.5rem" }}>
                취소하기
              </Button>

              <Button variant="contained" onClick={handleSubmit} sx={{ width: "100%", height: "56px", fontSize: "1.5rem", marginLeft: "0.5rem" }}>
                등록하기
              </Button>
            </ButtonContainer>
          </ReviewContainer>
        </Content>
      </Container>
    </>
  );
};

export default UserReviewCreate;

const Container = styled.div`
  display: flex;
`;

const ReviewContainer = styled.div`
  padding: 10x 20px;
  margin: 2 auto;
  position: relative;
  width: 90%;
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

const StarSection = styled.div`
  .star {
    color: #eec759;
    font-size: 3rem;
    cursor: pointer;
  }
  margin: 1rem 0 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
