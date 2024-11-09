import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import Slide from "../components/common/Slide";
import { useNavigate } from "react-router-dom";

const MainPage = () => {

  const navigate = useNavigate();

  return (
    <Box>
      <Slider>
        <Slide/>
      </Slider>
      <CommunityRank>커뮤니티 인기글</CommunityRank>
      <Container>
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

      </Container>

      <IconTitle>쇼핑 카테고리</IconTitle>
      <IconContainer>
        <IconCard>
          <IconBack>
            <IconImg src="/src/assets/mainImage/icon/mainicon_1.png" alt="전체" onClick={()=>navigate("/shopping")}/>
          </IconBack>
          <IconCardBottom style={{ textAlign: "center" }}>
            <div>전체</div>
          </IconCardBottom>
        </IconCard>

        <IconCard>
          <IconBack>
            <IconImg src="/src/assets/mainImage/icon/mainicon_2.png" alt="사료" onClick={()=>navigate("/shopping", {state: "food"})}/>
          </IconBack>
          <IconCardBottom style={{ textAlign: "center" }}>
            <div>사료</div>
          </IconCardBottom>
        </IconCard>

        <IconCard>
          <IconBack>
            <IconImg src="/src/assets/mainImage/icon/mainicon_3.png" alt="용품" onClick={()=>navigate("/shopping", {state: "goods"})}/>
          </IconBack>
          <IconCardBottom style={{ textAlign: "center" }}>
            <div>용품</div>
          </IconCardBottom>
        </IconCard>

        <IconCard>
          <IconBack>
            <IconImg src="/src/assets/mainImage/icon/mainicon_4.png" alt="건강" onClick={()=>navigate("/shopping", {state: "health"})}/>
          </IconBack>
          <IconCardBottom style={{ textAlign: "center" }}>
            <div>건강</div>
          </IconCardBottom>
        </IconCard>

        <IconCard>
          <IconBack>
            <IconImg src="/src/assets/mainImage/icon/mainicon_5.png" alt="의류" onClick={()=>navigate("/shopping", {state: "clothes"})}/>
          </IconBack>
          <IconCardBottom style={{ textAlign: "center" }}>
            <div>의류</div>
          </IconCardBottom>
        </IconCard>
      </IconContainer>
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

const CommunityRank = styled.h4`
  padding-top: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 5rem 0 7rem;
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

const IconTitle = styled.h4`
  text-align: center;
  font-weight: bold;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0 9rem;
  width: 100%;
  align-items: center;
`;

const IconCard = styled.div`
  width: 110px;
  height: 100px;
  margin: 0 40px;
`;

const IconBack = styled.div`
  cursor: pointer;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #c4e1f6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImg = styled.img`
  width: 80px;
`;

const IconCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
`;
