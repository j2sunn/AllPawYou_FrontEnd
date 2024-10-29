import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";

const CommunityRank = styled.h4`
padding-top: 30px;
text-align : center;
font-weight:bold;
`;

const MainPage = () => {
  return (
    <>
      <HeaderComponent />
      <div><CommunityRank>커뮤니티 인기글</CommunityRank><hr style={{width: '80%', margin: '0 auto'}}/></div>
      <Container>
        <BoardCard>
          <BoardImg src="/src/assets/mainImage/dog.jpg" alt="이미지1"/>
          <BoardCardBottom  style={{ boxShadow: '0px 0px 5px #444' }}>
            <div>강아지 산책 하루에 얼마나.. </div>
            <BoardLike>
              <FaRegHeart/>
              <div>220</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
        <BoardCard>
          <BoardImg src="/src/assets/mainImage/cat.jpg" alt="이미지2" />
          <BoardCardBottom  style={{ boxShadow: '0px 0px 5px #444' }}>
            <div>아기 고양이 사료 추천</div>
            <BoardLike>
              <FaRegHeart />
              <div>175</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
        <BoardCard>
          <BoardImg src="/src/assets/mainImage/hamster.jpg" alt="이미지3" />
          <BoardCardBottom  style={{ boxShadow: '0px 0px 5px #444' }}>
            <div>우리집 햄스터 자랑</div>
            <BoardLike>
              <FaRegHeart />
              <div>100</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
      </Container>
      <BestItemSection>
        <h4 style={{fontWeight:'bold'}}>이번주 베스트 아이템</h4>
      <Container>
        <ProductCard>
          <ProductImg src="/src/assets/mainImage/shopping1.png" alt="이미지1"  />
          <ProductCardBottom>
            <div>go 그레인프리 건식사료</div>
            <div>75,150원</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="/src/assets/mainImage/shopping2.png" alt="이미지1"  />
          <ProductCardBottom>
            <div>강아지 배변패드 100매</div>
            <div>12,900원</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="/src/assets/mainImage/shopping3.png" alt="이미지1"  />
          <ProductCardBottom>
            <div>반려동물 마약 방석</div>
            <div>9,800원</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="/src/assets/mainImage/shopping4.jpg" alt="이미지1"  />
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
          <ProductImg src="/src/assets/mainImage/shopping6.jpg" alt="이미지1" />
          <ProductCardBottom>
            <div>강아지 노즈워크 장난감</div>
            <div>13,000원</div>
          </ProductCardBottom>
        </ProductCard>
      </Container>
      </BestItemSection>
      <FooterComponent />
    </>
  )
};

export default MainPage;

const BestItemSection = styled.div`
  text-align: center;
  margin-top: 3rem;
`;


const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 5rem 0 10rem;
  width: 100%;
`;

const BoardCard = styled.div`
  width: 300px;
  height: 300px;
`;

const BoardImg = styled.img`
  width: 300px;
  height: 250px;
box-shadow:0px 0px 5px #444;
`;

const BoardCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  
`;

const BoardLike = styled.div`
  width: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCard = styled(BoardCard)`
  width: 200px;
  height: 220px;
`;

const ProductImg = styled.img`
    width: 200px;
    height: 150px;
    box-shadow:0px 0px 5px #444;
`;

const ProductCardBottom = styled(BoardCardBottom)`
    flex-direction: column;
`;