import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProductsByCategory, getProductsByCategoryAndStatus, getProductsBySearch, getProductsByStatus, listProducts } from "../service/ProductService";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField } from "@mui/material";


const ShoppingMain = () => {
    const [product, setProducts] = useState([]);
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("OPEN");

    function getAllProducts() {
        listProducts()
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const goDetail = (productId) => {
        navigate(`/shoppingDetail/${productId}`);
    };

    const loadProducts = async () => {
        const response = await getProductsByStatus(status);
        setProducts(response);
    }

    useEffect(() => {

        if (category === "all") {
            loadProducts();
        } else {
            getProductsByCategoryAndStatus(category, status)
                .then(response => {
                    console.log("response 정보 : ", response);
                    setProducts(response);
                }).catch((error) => {
                    console.log("에러발생 : ", error);
                });
        }
    }, [category, status]);

    useEffect(() => {
        scrollTo(0, 0);
    }, [])

    const [searchItem, setSearchItem] = useState("");

    //상품 검색
    const getAllProductsBySearch = async () => {

        console.log("searchItem:", searchItem);
        const response = await getProductsBySearch(searchItem)
        setProducts(response);
    }


    return (
        <>
            <GoodsSection>
                <IconTitle>쇼핑 카테고리</IconTitle>
                <TextField onChange={() => setSearchItem(event.target.value)} /><Button onClick={getAllProductsBySearch}>검색</Button>
                <IconContainer>
                    <IconCard onClick={() => setCategory("all")}>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_1.png" alt="사료" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>전체</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard onClick={() => setCategory("food")}>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_2.png" alt="간식" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>사료</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard onClick={() => setCategory("goods")}>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_3.png" alt="용품" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>용품</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard onClick={() => setCategory("health")}>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_4.png" alt="건강" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>건강</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard onClick={() => setCategory("clothes")}>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_5.png" alt="의류" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>의류</div>
                        </IconCardBottom>
                    </IconCard>
                </IconContainer>
                <div id="goods-section">
                    {product?.length > 0 ? (
                        <Grid>
                            {product?.map((item, index) => (
                                <GridItem key={index} onClick={() => goDetail(item.id)}>
                                    <GridImage src={`http://localhost:8081${item.productFileDTO.find(file => file.productFileTypeId === 1)?.imagePath}`} alt="상품 이미지" />
                                    <GridTitle>{item.name}</GridTitle>
                                    <GridText>{item.price.toLocaleString()}원</GridText>
                                </GridItem>
                            ))}
                        </Grid>
                    ) : (
                        category == "all" ? (
                            <NoData>등록된 상품이 없습니다.</NoData>
                        ) : (
                            <NoData>해당 카테고리의 상품이 없습니다.</NoData>
                        )
                    )}

                </div>
            </GoodsSection>
        </>
    );
}
export default ShoppingMain;


const GoodsSection = styled.div`
    min-height: 700px;
    margin: 5rem 0;
  #goods-section ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    list-style: none;
  }

  #goods-section li {
    display: flex;
    margin : 0 5px 90px;
  }

  #goods-section li img {
    width: 280px;
    height: 380px;
    // border : 1px solid red;
  }
`;

const IconTitle = styled.h4`
  text-align: center;
  font-size: 2rem;
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
  width: 90px;
  height: 90px;
  margin: 0 40px;
  cursor: pointer;
  &:hover img{
    scale: 1.2;
    transition: 0.5s;
  }
`;

const IconBack = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #c4e1f6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImg = styled.img`
  width: 50px;
`;

const IconCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NoData = styled.ul`
    font-size: 3rem;
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
  cursor: pointer;
`;

const GridTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.2rem 1rem;
  cursor: pointer;
`;

const GridText = styled.div`
  margin: 0.2rem 1rem;
  cursor: pointer;
`;