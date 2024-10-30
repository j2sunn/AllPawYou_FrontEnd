import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Slide from "../components/common/Slide";

const CommunityRank = styled.h4`
  padding-top: 30px;
  text-align: center;
  font-weight: bold;
`;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];

const MainPage = () => {
  return (
    <>
      <HeaderComponent />
      <CommunityRank>커뮤니티 인기글</CommunityRank>
      <Container>
        <SlArrowLeft size={45} />
        <BoardCard>
          <BoardImg src="/src/assets/mainImage/dog.jpg" alt="이미지1" />
          <BoardCardBottom style={{ boxShadow: "0px 0px 5px #444" }}>
            <div>강아지 산책 하루에 얼마나.. </div>
            <BoardLike>
              <FaRegHeart style={{ color: "red" }} />
              <div style={{ color: "red" }}>220</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
        <BoardCard>
          <BoardImg src="/src/assets/mainImage/cat.jpg" alt="이미지2" />
          <BoardCardBottom style={{ boxShadow: "0px 0px 5px #444" }}>
            <div>아기 고양이 사료 추천</div>
            <BoardLike>
              <FaRegHeart style={{ color: "red" }} />
              <div style={{ color: "red" }}>175</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
        <BoardCard>
          <BoardImg src="/src/assets/mainImage/hamster.jpg" alt="이미지3" />
          <BoardCardBottom style={{ boxShadow: "0px 0px 5px #444" }}>
            <div>우리집 햄스터 자랑</div>
            <BoardLike>
              <FaRegHeart style={{ color: "red" }} />
              <div style={{ color: "red" }}>100</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
        <SlArrowRight size={45} />
      </Container>

      <BestItemSection>
        <h4 style={{ fontWeight: "bold" }}>이번주 베스트 아이템</h4>
        <Slide />
      </BestItemSection>

      <FooterComponent />
    </>
  );
};

export default MainPage;

const BestItemSection = styled.div`
  text-align: center;
  margin-top: 3rem;
  position: relative;
`;

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

const BoardImg = styled.img`
  width: 300px;
  height: 250px;
  box-shadow: 0px 0px 5px #444;
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
  box-shadow: 0px 0px 5px #444;
`;

const ProductCardBottom = styled(BoardCardBottom)`
  flex-direction: column;
`;
