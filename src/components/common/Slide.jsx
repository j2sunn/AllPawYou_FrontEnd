import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRef } from "react";

export default function SimpleSlider() {
  const slideRef = useRef(null);

  function SamplePrevArrow() {
    return <IoIosArrowBack size={64} onClick={() => slideRef.current.slickPrev()} style={{ display: 'block', color: 'white', position: 'sticky', left: '10px', zIndex: 5 }} />;
  }

  function SampleNextArrow() {
    return <IoIosArrowForward size={64} onClick={() => slideRef.current.slickNext()} style={{ display: 'block', color: 'white', position: 'sticky', right: '10px', zIndex: 5 }} />;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500, // 속도
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 속도
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
  };

  return (
    <SliderWrapper>
      <SamplePrevArrow />
      <StyledSlider {...settings} ref={slideRef}>
      <div>
          <ProductCard>
            <ProductImg src="/src/assets/mainImage/main7.png" />
          </ProductCard>
        </div>
        <div>
          <ProductCard>
            <ProductImg src="/src/assets/mainImage/main2.jpg" />
          </ProductCard>
        </div>
        <div>
          <ProductCard>
            <ProductImg src="/src/assets/mainImage/main1.jpg" />
          </ProductCard>
        </div>
        <div>
          <ProductCard>
            <ProductImg src="/src/assets/mainImage/main5.png" />
          </ProductCard>
        </div>
        <div>
          <ProductCard>
            <ProductImg src="/src/assets/mainImage/main4.jpg" />
          </ProductCard>
        </div>

 


      </StyledSlider>
      <SampleNextArrow />
    </SliderWrapper>
  );
}
const SliderWrapper = styled.div`
  display: flex;
  width: 110%;
  align-items: center;

`;

const StyledSlider = styled(Slider)`
  width: 93%;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 600px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 600px;
  box-shadow: 0px 0px 5px #444;
`;