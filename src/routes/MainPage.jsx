import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import HeaderComponent from "../components/common/HeaderComponent";

const MainPage = () => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <BoardCard>
          <BoardImg src="#" alt="이미지1" as="div" />
          <BoardCardBottom>
            <div>제목1</div>
            <BoardLike>
              <FaRegHeart />
              <div>0</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
        <BoardCard>
          <BoardImg src="#" alt="이미지2" as="div" />
          <BoardCardBottom>
            <div>제목2</div>
            <BoardLike>
              <FaRegHeart />
              <div>0</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
        <BoardCard>
          <BoardImg src="#" alt="이미지3" as="div" />
          <BoardCardBottom>
            <div>제목3</div>
            <BoardLike>
              <FaRegHeart />
              <div>0</div>
            </BoardLike>
          </BoardCardBottom>
        </BoardCard>
      </Container>
      <Container>
        <ProductCard>
          <ProductImg src="#" alt="이미지1" as='div' />
          <ProductCardBottom>
            <div>이름</div>
            <div>가격</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="#" alt="이미지1" as='div' />
          <ProductCardBottom>
            <div>이름</div>
            <div>가격</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="#" alt="이미지1" as='div' />
          <ProductCardBottom>
            <div>이름</div>
            <div>가격</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="#" alt="이미지1" as='div' />
          <ProductCardBottom>
            <div>이름</div>
            <div>가격</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="#" alt="이미지1" as='div' />
          <ProductCardBottom>
            <div>이름</div>
            <div>가격</div>
          </ProductCardBottom>
        </ProductCard>
        <ProductCard>
          <ProductImg src="#" alt="이미지1" as='div' />
          <ProductCardBottom>
            <div>이름</div>
            <div>가격</div>
          </ProductCardBottom>
        </ProductCard>
      </Container>
    </>
  )
};

export default MainPage;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 5rem 0 10rem;
`;

const BoardCard = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 1rem;
`;

const BoardImg = styled.img`
  width: 300px;
  height: 250px;
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
`;

const ProductCardBottom = styled(BoardCardBottom)`
    flex-direction: column;
`;