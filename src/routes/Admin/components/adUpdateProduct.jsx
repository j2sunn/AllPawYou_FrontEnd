import { Radio, RadioGroup, FormControlLabel, Select, MenuItem, Button } from "@mui/material";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProduct, getProductByProductId, DeleteProductFile } from "../../../service/ProductService";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigator = useNavigate();
  const [ACCESS_TOKEN, setAccessToken] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAccessToken(token);
      setLoginEmail(payload["user-email"]);
    } else {
      alert("로그인 후 이용해주세요.");
      location.href = "/login";
    }
  }, []);

  // 상품정보 불러오기
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [thumbnail, setThumbnail] = useState({ file: null, preview: null }); // 썸네일 이미지
  const [images, setImages] = useState([]); // 상품 설명 이미지들

  console.log("id :", id);

  useEffect(() => {
    if (id) {
      getProductByProductId(id)
        .then((response) => {
          setProductInfo(response);
          console.log("상품정보 : ", response);
        })
        .catch((error) => {
          console.log("에러발생 : ", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (productInfo) {
      setThumbnail({
        file: productInfo.productFileDTO.find((file) => file.productFileTypeId === 1)?.imageRename,
        preview: `http://localhost:8081${productInfo.productFileDTO.find((file) => file.productFileTypeId === 1)?.imagePath}`,
      });

      const detailImages = productInfo.productFileDTO
        .filter((file) => file.productFileTypeId === 2)
        .map((file) => ({
          id: file.id,
          file: file.imageRename,
          preview: `http://localhost:8081${file.imagePath}`,
        }));

      setImages(detailImages);
    }
  }, [productInfo]);

  // 썸네일 이미지 업로드 핸들러 (하나만 업로드 가능)
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    console.log("새 썸네일 파일:", file);
    if (file) {

      setThumbnail({
        file: file, // 실제 파일 객체 저장
        preview: URL.createObjectURL(file), // 미리보기 URL 저장
      });
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail({ file: null, preview: null });
  };

  // 상품 설명 이미지 업로드 핸들러 (최대 8장)
  const handleDetailImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("상세이미지 : ", files);
    if (files.length + images.length > 8) {
      alert("최대 8장까지 업로드할 수 있습니다.");
      return;
    }

    const newImages = files.map((file) => ({
      file, // 실제 파일 객체 저장
      preview: URL.createObjectURL(file), // 미리보기 URL 저장
    }));

    console.log("추가된 상세 이미지 파일들:", newImages);
    setImages((prevImages) => [...prevImages, newImages]);
  };

  const handleRemoveDetailImage = (index) => {

    const imageToRemove = images[index];
    console.log("imageToRemove.id : ", imageToRemove.id);

    if (imageToRemove && imageToRemove.id) {
      // 서버에 삭제 요청 보내기
      DeleteProductFile(Number(imageToRemove.id))
        .then((response) => {
          console.log("이미지 삭제 완료: " + imageToRemove.id);
          setImages(images.filter((_, i) => i !== index));
        })
        .catch((error) => {
          console.error("이미지 삭제 오류: ", error);
          alert("이미지 삭제에 실패했습니다.");
        });
    }
  };

  const updateHandler = (event, key) => {
    const { value } = event.target;
    setProductInfo((prev) => ({ ...prev, [key]: value }));
  };

  const doSubmit = () => {
    const formData = new FormData();
    formData.append("category", productInfo.category);
    formData.append("name", productInfo.name);
    formData.append("price", productInfo.price);
    formData.append("releaseStatus", productInfo.releaseStatus);

    if (thumbnail.file) {
      formData.append("thumbImage", thumbnail.file);
      console.log("썸네일:: ", thumbnail.file);
    }

    images.forEach((imageObj) => {
      formData.append("detailImage", imageObj.file);
      console.log(imageObj.file);
    });

    try {
      // 상품 수정 API 호출
      updateProduct(id, formData);
      // 성공적으로 상품을 등록한 후, 상품 목록 페이지로 이동
      navigator("/admin/productlist"); // 이동할 페이지 URL을 설정
      alert("상품이 수정되었습니다.");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      {productInfo ? (
        <>
          <One>
            <h4 onClick={() => console.log(images)}>상품 수정</h4>
            <h5>
              카테고리<span>*</span>
            </h5>
            <Select
              labelId="category-label"
              id="category"
              style={{ width: "150px" }}
              onChange={(event) => updateHandler(event, "category")}
              value={productInfo.category}
            >
              <MenuItem value="food">사료</MenuItem>
              <MenuItem value="goods">용품</MenuItem>
              <MenuItem value="health">건강</MenuItem>
              <MenuItem value="clothes">의류</MenuItem>
            </Select>
          </One>
          <Two>
            <h5>
              제목<span>*</span>
            </h5>
            <TitleInput id="productName" value={productInfo.name} onChange={(event) => updateHandler(event, "name")} />
            <h5>
              가격<span>*</span>
            </h5>
            <TitleInput id="productPrice" value={productInfo.price} onChange={(event) => updateHandler(event, "price")} />
          </Two>
          <Three>
            <h5>썸네일 사진 업로드</h5>
            <ImgContainer>
              {thumbnail.preview && (
                <ThumbnailContainer>
                  <Image src={thumbnail.preview} alt="Thumbnail" />
                  <RemoveButton onClick={handleRemoveThumbnail}>X</RemoveButton>
                </ThumbnailContainer>
              )}
            </ImgContainer>
            <UploadButton>
              <FileInput type="file" accept="image/*" onChange={handleThumbnailChange} />
              📷 사진 첨부
            </UploadButton>

            <h5>상품 설명 사진 업로드</h5>
            <ImgContainer>
              {images.map((image, index) => (
                <ProductDetail key={index}>
                  <Image src={image?.preview} alt={`Uploaded ${index + 1}`} />
                  <RemoveButton onClick={() => handleRemoveDetailImage(index)}>X</RemoveButton>
                </ProductDetail>
              ))}
            </ImgContainer>
            <UploadButton>
              <FileInput type="file" accept="image/*" multiple onChange={handleDetailImageChange} />
              📷 사진 첨부
            </UploadButton>
          </Three>
          <Three>
            <h5>상품 공개 여부</h5>
            <RadioGroup value={productInfo.releaseStatus} onChange={(event) => updateHandler(event, "releaseStatus")} row>
              <FormControlLabel value="OPEN" control={<Radio />} label="공개" />
              <FormControlLabel value="CLOSE" control={<Radio />} label="비공개" />
            </RadioGroup>
          </Three>
          <div style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Button variant="outlined" sx={{ margin: "10px" }}>
              취소
            </Button>
            <Button variant="contained" onClick={() => doSubmit()}>
              등록
            </Button>
          </div>
        </>
      ) : (
        <div>해당하는 상품이 없습니다.</div>
      )}
    </>
  );
};

export default UpdateProduct;

const One = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h5 {
    margin-top: 30px;
  }
  h5 span {
    color: red;
  }
  .cateCon {
    display: flex;
  }
`;
const Two = styled.div`
  width: 50%;
  h5 {
    margin-top: 30px;
  }
  h5 span {
    color: red;
  }
`;
const Three = styled.div`
  width: 50%;
  h5 {
    margin-top: 30px;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
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

const ProductDetail = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #eee;
`;

const ThumbnailContainer = styled.div`
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
  top: 5px;
  right: 5px;
  background: black;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const UploadButton = styled.label`
  background-color: RGB(240, 240, 243);
  border-radius: 15px;
  padding: 5px;
  display: inline-block;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
`;

const FileInput = styled.input`
  display: none;
`;
