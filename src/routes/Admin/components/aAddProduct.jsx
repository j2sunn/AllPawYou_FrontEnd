import { Radio, RadioGroup, FormControlLabel, Select, MenuItem, Button } from "@mui/material";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../service/ProductService";
import { useState } from "react";
import Swal from "sweetalert2";

const AdminAddProduct = () => {
  const navigator = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("food"); //카테고리 선택
  const [thumbnail, setThumbnail] = useState({ file: null, preview: null }); // 썸네일 이미지
  const [images, setImages] = useState([]); // 상품 설명 이미지들
  const [isRelease, setIsPublic] = useState("OPEN"); //상품 공개 여부
  const [productName, setProductName] = useState(""); //상품명
  const [productPrice, setProductPrice] = useState(""); //가격

  // 상품명 변경 핸들러
  const handleNameChange = (event) => {
    setProductName(event.target.value);
  };

  // 가격 변경 핸들러
  const handlePriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleChange = (event) => {
    setIsPublic(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // 썸네일 이미지 업로드 핸들러 (하나만 업로드 가능)
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
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

    const newImages = files.map((file) => ({
      file: file, // 실제 파일 객체 저장
      preview: URL.createObjectURL(file), // 미리보기 URL 저장
    }));

    if (files.length + images.length + newImages.length > 8) {
      Swal.fire({
        title: "최대 8장까지 업로드할 수 있습니다.",
        icon: "warning",

        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
      return;
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveDetailImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const cancel = () => {
    Swal.fire({
      title: "상품 목록으로 돌아가시겠습니까?",
      text: "진행상황이 저장되지 않습니다.",
      icon: "warning",

      showCancelButton: true, // false가 default
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "이동",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigator(-1);
      }
    });
  };

  const doSubmit = () => {
    const formData = new FormData();
    formData.append("category", selectedCategory);
    formData.append("name", productName.trim());
    formData.append("price", +productPrice);
    formData.append("releaseStatus", isRelease);

    if (thumbnail.file) {
      formData.append("thumbImage", thumbnail.file);
    }

    images.forEach((imageObj) => {
      formData.append("detailImage", imageObj.file);
    });

    try {
      if (productName.trim().length == 0) {
        Swal.fire({
          title: "상품 이름을 입력해주세요.",
          icon: "warning",

          confirmButtonColor: "#527853",
          cancelButtonText: "확인",
        });
      } else if (+productPrice <= 0) {
        Swal.fire({
          title: "올바른 가격을 입력해주세요.",
          icon: "warning",

          confirmButtonColor: "#527853",
          cancelButtonText: "확인",
        });
      } else if (thumbnail.file == null) {
        Swal.fire({
          title: "썸네일 이미지를 등록해주세요.",
          icon: "warning",

          confirmButtonColor: "#527853",
          cancelButtonText: "확인",
        });
      } else {
        //상품 추가 API 호출
        addProduct(formData).then(()=>{
          Swal.fire({
            title: "등록 성공",
            text: "상품이 성공적으로 등록되었습니다.",
            icon: "success",
            confirmButtonColor: "#527853",
            cancelButtonText: "확인",
          });
          setTimeout(() => {
            console.log(1);
          }, 5000);
          navigator("/admin/productlist", { state: { refresh: true } });
        });
        // 성공적으로 상품을 등록한 후, 상품 목록 페이지로 이동
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      Swal.fire({
        title: "등록 실패",
        text: "등록 중 오류가 발생했습니다. 다시 시도해 주세요.",
        icon: "error",

        confirmButtonColor: "#527853",
        cancelButtonText: "확인",
      });
    }
  };

  return (
    <>
      <One>
        <h4>상품 등록</h4>
        <h5>
          카테고리<span>*</span>
        </h5>
        <Select labelId="category-label" id="category" style={{ width: "150px" }} onChange={handleCategoryChange} value={selectedCategory}>
          <MenuItem value="food">사료</MenuItem>
          <MenuItem value="goods">용품</MenuItem>
          <MenuItem value="health">건강용품</MenuItem>
          <MenuItem value="clothes">의류</MenuItem>
        </Select>
      </One>
      <Two>
        <h5>
          제목<span>*</span>
        </h5>
        <TitleInput id="productName" value={productName} onChange={handleNameChange} />
        <h5>
          가격<span>*</span>
        </h5>
        <TitleInput id="productPrice" type="number" value={productPrice} onChange={handlePriceChange} />
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
              <Image src={image.preview} alt={`Uploaded ${index + 1}`} />
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
        <RadioGroup value={isRelease} onChange={handleChange} row>
          <FormControlLabel value="OPEN" control={<Radio />} label="공개" />
          <FormControlLabel value="CLOSE" control={<Radio />} label="비공개" />
        </RadioGroup>
      </Three>
      <div style={{ marginTop: "30px", marginBottom: "50px" }}>
        <Button variant="outlined" sx={{ margin: "10px" }} onClick={cancel}>
          취소
        </Button>
        <Button variant="contained" onClick={doSubmit}>
          등록
        </Button>
      </div>
    </>
  );
};

export default AdminAddProduct;

const Div = styled.div`
  background-color: ${({ selected }) => (selected ? "#EEC759" : "RGB(240, 240, 243)")};
  margin-right: 10px;
  width: 100px;
  font-weight: bold;
  border-radius: 20px;
  text-align: center;
  padding: 7px;
  &:hover {
    cursor: pointer;
  }
`;
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

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px;
  resize: vertical; /* 사용자가 세로 크기 조정 가능 */

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

const Error = styled.div`
  color: red;
`;
