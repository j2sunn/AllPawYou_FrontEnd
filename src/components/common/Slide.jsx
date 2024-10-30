import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRef } from "react";

export default function SimpleSlider() {
  const slideRef = useRef(null);

  function SampleNextArrow() {
    return <IoIosArrowForward onClick={() => slideRef.current.slickNext()} />;
  }

  function SamplePrevArrow() {
    return <IoIosArrowBack onClick={() => slideRef.current.slickPrev()} />;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500, // 속도
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 속도
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings} ref={slideRef}>
      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping1.png" alt="이미지1" />
        <ProductCardBottom>
          <div>go 그레인프리 건식사료</div>
          <div>75,150원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping2.png" alt="이미지1" />
        <ProductCardBottom>
          <div>강아지 배변패드 100매</div>
          <div>12,900원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping3.png" alt="이미지1" />
        <ProductCardBottom>
          <div>반려동물 마약 방석</div>
          <div>9,800원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping4.jpg" alt="이미지1" />
        <ProductCardBottom>
          <div>바잇미 강아지 하네스</div>
          <div>25,160원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping5.jpg" alt="이미지1" />
        <ProductCardBottom>
          <div>반려동물 리드줄</div>
          <div>13,900원</div>
        </ProductCardBottom>
      </ProductCard>
      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping1.png" alt="이미지1" />
        <ProductCardBottom>
          <div>go 그레인프리 건식사료</div>
          <div>75,150원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping2.png" alt="이미지1" />
        <ProductCardBottom>
          <div>강아지 배변패드 100매</div>
          <div>12,900원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping3.png" alt="이미지1" />
        <ProductCardBottom>
          <div>반려동물 마약 방석</div>
          <div>9,800원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping4.jpg" alt="이미지1" />
        <ProductCardBottom>
          <div>바잇미 강아지 하네스</div>
          <div>25,160원</div>
        </ProductCardBottom>
      </ProductCard>

      <ProductCard>
        <ProductImg src="/src/assets/mainImage/shopping5.jpg" alt="이미지1" />
        <ProductCardBottom>
          <div>반려동물 리드줄</div>
          <div>13,900원</div>
        </ProductCardBottom>
      </ProductCard>
    </Slider>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 5rem 0 10rem;
  width: 100%;
  align-items: center;
`;

const BoardCard = styled.div`
  width: 300px;
  height: 300px;
`;

const BoardCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const ProductCard = styled(BoardCard)`
  width: 200px;
  height: 220px;
`;

const ProductImg = styled.img`
  width: 200px;
  height: 150px;
  box-shadow: 0px 0px 5px #444;
`;

const ProductCardBottom = styled(BoardCardBottom)`
  flex-direction: column;
`;
