import { FaRegStar, FaStar } from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { CreateReview } from "../../service/Review";
import { useNavigate, useParams } from "react-router-dom";
import { FaPhotoFilm } from "react-icons/fa6";
import MypageSideBar from "../common/MypageSideBar";
import { findByName } from "../../service/ProductService";

const UserReviewCreate = () => {
  const { orderName } = useParams(); // URL 파라미터에서 orderName 추출
  const [images, setImages] = useState([]);
  const [starScore, setStarScore] = useState(0);
  const [productId, setProductId] = useState(null); // 상품 ID 상태 추가
  const [reviewContent, setReviewContent] = useState(""); // 후기를 저장할 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 사용

  const ratingStarHandler = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i + 1} onClick={() => setStarScore(i + 1)}>
        {i + 1 <= starScore ? <FaStar className="star" /> : <FaRegStar className="star" />}
      </span>
    ));
  };

  findByName(orderName);

  useEffect(() => {
    const fetchProductId = async () => {
      if (orderName) {
        try {
          const response = await findByName(orderName); // findByName 호출
          const productData = response.data; // Axios 응답에서 data 추출

          // 데이터에서 id만 추출
          setProductId(productData.id); // id를 상태로 설정
          console.log("Product ID:", productData.id);
        } catch (error) {
          console.error("Error fetching product by name:", error);
        }
      } else {
        console.warn("orderName is not provided.");
      }
    };

    fetchProductId(); // 함수 호출
  }, [orderName]); // orderName이 변경될 때마다 실행

  const handleSubmit = () => {
    if (starScore === 0 || reviewContent.trim() === "") {
      alert("별점과 후기를 모두 입력해주세요.");
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("userNo", localStorage.getItem("no"));
    formData.append("productNo", productId);
    formData.append("reviewStar", starScore);
    formData.append("reviewContent", reviewContent);
    formData.append("reviewVisible", "Y");

    images.forEach((image) => {
      formData.append("reviewImg", image);
    });

    CreateReview(formData)
      .then((response) => {
        alert("리뷰가 등록되었습니다.");
        navigate("/review/myReview");
      })
      .catch((error) => {
        console.log("에러 :: " + formData);
        console.error("리뷰 등록 실패:", error);
        alert("리뷰 등록에 실패했습니다.");
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

    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    console.log("이미지 삭제 :: " + images);
  };

  useEffect(()=>{
    scrollTo(0,0);
  },[])

  return (
    <>
      <Container>
        <MypageSideBar />

        <Content>
          <Title>후기 작성</Title>
          <ReviewContainer>
            <StarSection>
              {ratingStarHandler()}
              <span>(필수)*</span>
            </StarSection>

            <ImgUploadContainer>
              <ImgContainer>
                {images.map((image, index) => (
                  <Thumbnail key={index}>
                    <Image src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
                    <br />
                    <RemoveButton onClick={() => handleRemoveImage(index)}>X</RemoveButton>
                  </Thumbnail>
                ))}
              </ImgContainer>
              <Button component="label" role={undefined} variant="outlined" tabIndex={-1} startIcon={<FaPhotoFilm />}>
                사진 첨부
                <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e)} />
              </Button>
            </ImgUploadContainer>

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
  margin-top: 1rem;
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
