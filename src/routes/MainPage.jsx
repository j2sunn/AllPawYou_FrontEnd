import styled from "styled-components";
import Slide from "../components/common/Slide";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customerCount } from "../service/UserAPI";
import BoardImageList from "../components/common/ImageList";
import { listProducts } from "../service/ProductService";

const MainPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await listProducts();
    console.log(response.data);
    if (response.data.length > 10) {
      setProducts(response.data.slice(0, 10));
    } else {
      setProducts(response.data);
    }
  };
  useEffect(() => {
    scrollTo(0, 0);
    customerCount();
    loadProducts();
  }, []);

  return (
    <Box>
      <Slider>
        <Slide />
      </Slider>
      <Container>
        <Title>추천 아이템</Title>
        <Grid>
          {products?.map((product) => {
            return (
              <GridItem key={product?.id} onClick={() => navigate(`/shoppingDetail/${product?.id}`)}>
                <GridImage
                  src={`http://localhost:8081${product.productFileDTO?.find((file) => file.productFileTypeId === 1)?.imagePath}`}
                  alt="상품 이미지"
                />
                <GridTitle>{product?.name}</GridTitle>
                <GridText>{product?.price.toLocaleString()}원</GridText>
              </GridItem>
            );
          })}
        </Grid>
      </Container>
      <Container>
        <Title>커뮤니티 인기글</Title>
        <BoardImageList />
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
  cursor: pointer;
  min-width: 200px;
`;

const GridImage = styled.img`
  width: 100%;
  height: 300px;
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
