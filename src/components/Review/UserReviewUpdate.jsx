import { FaRegStar, FaStar } from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewByreviewNo, UpdateReview } from "../../service/Review";
import MypageSideBar from "../common/MypageSideBar";
import { FaPhotoFilm } from "react-icons/fa6";

const UserReviewUpdate = () => {
  const { reviewNo } = useParams();
  // console.log(reviewNo);

  useEffect(() => {
    getReviewByreviewNo(reviewNo) // reviewNo를 API 호출에 사용
      .then((response) => {
        console.log(response);
        setProductNo(response.productNo);
        setStarScore(response.reviewStar); // 받은 데이터로 상태 업데이트
        setReviewContent(response.reviewContent);
        setImages(response.reviewImg); // 기존 이미지 설정
      })
      .catch((error) => {
        console.error("리뷰 데이터를 가져오는 데 실패했습니다:", error);
        alert("리뷰 데이터를 가져오는 데 실패했습니다.");
      });
  }, [reviewNo]); // reviewNo가 변경될 때마다 호출

  const [productNo, setProductNo] = useState();
  const [starScore, setStarScore] = useState();
  const [reviewContent, setReviewContent] = useState();
  const [images, setImages] = useState([]);

  // console.log(images);
  // console.log(images[0]);

  // if (images.length > 0) {
  //   console.log(images[0].reviewImgRename);
  //   console.log(images[1].reviewImgRename);
  //   console.log(`${images[0].reviewImgPath}${images[0].reviewImgRename}`);
  // } else {
  //   console.log("images 배열이 비어 있습니다.");
  // }

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

    // const reviewData = {
    //   reviewNo: reviewNo,
    //   userNo: localStorage.getItem("no"), // localStorage에서 사용자 번호 가져오기
    //   productNo: productNo,
    //   reviewStar: starScore,
    //   reviewContent: reviewContent,
    //   reviewVisible: "Y",
    // };

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("reviewNo", reviewNo);
    formData.append("userNo", localStorage.getItem("no"));
    formData.append("productNo", productNo);
    formData.append("reviewStar", starScore);
    formData.append("reviewContent", reviewContent);
    formData.append("reviewVisible", "Y");

    images.forEach((image) => {
      formData.append("reviewImg", image);
    });

    UpdateReview(formData)
      .then((response) => {
        alert("리뷰가 수정되었습니다.");
        navigate("/review/myReview"); // 원하는 경로로 이동 (예: 내 후기 관리 페이지)
      })
      .catch((error) => {
        console.error("리뷰 수정 실패:", error);
        alert("리뷰 수정에 실패했습니다.");
      });
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 8) {
      alert("최대 8장까지 업로드할 수 있습니다.");
      return;
    }

    // const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...files]);
    // console.log("여기여기"+e.target.files);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    console.log("이미지 삭제 :: " + images);
  };

  return (
    <>
      <Container>
        <MypageSideBar />

        <Content>
          <Title>후기 수정</Title>
          <ReviewContainer>
            <StarSection>
              {ratingStarHandler()}
              <span>(필수)*</span>
            </StarSection>

            {/* <ImgUploadContainer>
              <ImgContainer>
                {images.length > 0 ? (
                  images.map(
                    (images) => console.log(image[index].reviewImgRename)
                    // <Thumbnail key={index}>
                    //   <Image src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
                    //   <br />
                    //   <RemoveButton onClick={() => handleRemoveImage(index)}>X</RemoveButton>
                    // </Thumbnail>
                  )
                ) : (
                  <p>이미지가 없습니다.</p> // 이미지가 없을 경우 메시지 표시
                )}
              </ImgContainer>
              <Button component="label" role={undefined} variant="outlined" tabIndex={-1} startIcon={<FaPhotoFilm />}>
                사진 첨부
                <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e)} />
              </Button>
            </ImgUploadContainer> */}

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
                수정하기
              </Button>
            </ButtonContainer>
          </ReviewContainer>
        </Content>
      </Container>
    </>
  );
};

export default UserReviewUpdate;

const Container = styled.div`
  display: flex;
`;

const ReviewContainer = styled.div`
  padding: 10x 20px;
  margin: 2 auto;
  position: relative;
  width: 90%;
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

const ImgUploadContainer = styled.div`
  width: 50%;
  margin: 1rem 0 1rem;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  background-color: #fff3c4; /* 배경 색상 */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow-x: auto;
  white-space: nowrap; /* 썸네일들이 한 줄로 나오도록 설정 */
`;

const Thumbnail = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #eee;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: black;
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  margin: "1rem",
});
