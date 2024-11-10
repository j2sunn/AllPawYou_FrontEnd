import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import Slide from "../components/common/Slide";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { customerCount } from "../service/UserAPI";

const MainPage = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    customerCount();
  },[]);

  return (
    <Box>
      <Slider>
        <Slide/>
      </Slider>
      <Container>
        <Title>추천 아이템</Title>
        <Grid>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping1.png" alt="상품 이미지" />
            <GridTitle>상품 1</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping2.png" alt="상품 이미지" />
            <GridTitle>상품 2</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping3.png" alt="상품 이미지" />
            <GridTitle>상품 3</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping4.jpg" alt="상품 이미지" />
            <GridTitle>상품 4</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping5.jpg" alt="상품 이미지" />
            <GridTitle>상품 5</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping6.jpg" alt="상품 이미지" />
            <GridTitle>상품 6</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping1.png" alt="상품 이미지" />
            <GridTitle>상품 1</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping2.png" alt="상품 이미지" />
            <GridTitle>상품 2</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping3.png" alt="상품 이미지" />
            <GridTitle>상품 3</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
          <GridItem>
            <GridImage src="/src/assets/mainImage/shopping4.jpg" alt="상품 이미지" />
            <GridTitle>상품 4</GridTitle>
            <GridText>10000원</GridText>
          </GridItem>
        </Grid>
      </Container>
      <Container>
        <Title>커뮤니티 인기글</Title>
        <BoardList>
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
            <BoardImg src="/src/assets/mainImage/hamster.jpg" alt="이미지3" />
            <BoardCardBottom style={{ boxShadow: "0px 0px 5px #444" }}>
              <div>우리집 햄스터 자랑</div>
              <BoardLike>
                <FaRegHeart style={{ color: "red" }} />
                <div style={{ color: "red" }}>175</div>
              </BoardLike>
            </BoardCardBottom>
          </BoardCard>
          <BoardCard>
            <BoardImg src="/src/assets/mainImage/cat.jpg" alt="이미지2" />
            <BoardCardBottom style={{ boxShadow: "0px 0px 5px #444" }}>
              <div>아기 고양이 사료 추천</div>
              <BoardLike>
                <FaRegHeart style={{ color: "red" }} />
                <div style={{ color: "red" }}>100</div>
              </BoardLike>
            </BoardCardBottom>
          </BoardCard>
        </BoardList>
      </Container>
    </Box>
  );
};

export default MainPage;

const Box = styled.div`
  overflow-x: hidden;
`;

const Slider = styled.div`
  margin: 0;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
`;

const Title = styled.h4`
  padding: 3rem 10rem;
  font-size: 1.8rem;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5rem 1rem;
  margin: 0 8rem;
`;

const GridItem = styled.div`
  min-width: 200px;
  border
`;

const GridImage = styled.img`
  width: 100%;
  height: 250px;
  margin-bottom: 1rem;
`;

const GridTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.2rem 1rem;
`;

const GridText = styled.div`
  padding: 0.2rem 1rem;
`;

const BoardList = styled.div`
  display: flex;
  justify-content: space-evenly;
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