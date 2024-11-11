import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getProductsByCategory,
  getProductsByCategoryAndStatus,
  getProductsBySearch,
  getProductsByStatus,
  listProducts,
} from "../service/ProductService";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Pagination, TextField } from "@mui/material";
import Swal from "sweetalert2";

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
  };

  useEffect(() => {
    if (category === "all") {
      loadProducts();
    } else {
      getProductsByCategoryAndStatus(category, status)
        .then((response) => {
          console.log("response 정보 : ", response);
          setProducts(response);
        })
        .catch((error) => {
          console.log("에러발생 : ", error);
        });
    }
  }, [category, status]);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [searchItem, setSearchItem] = useState("");

  //상품 검색
  const getAllProductsBySearch = async () => {
    if (searchItem.trim().length > 0) {
      const response = await getProductsBySearch(searchItem);
      setProducts(response);
    } else {
      Swal.fire({
        title: "검색어를 입력해주세요.",
        icon: "warning",

        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    }
  };

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const PerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const currentProduct = product.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(product.length / PerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <GoodsSection>
        <div style={{ alignSelf: "end", marginRight: "10rem" }}>
          <Input onChange={() => setSearchItem(event.target.value)} />
          <Button onClick={getAllProductsBySearch} sx={{ height: "3rem" }}>
            검색
          </Button>
        </div>
        <IconTitle>쇼핑 카테고리</IconTitle>
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
              {currentProduct?.map((item, index) => (
                <GridItem key={index} onClick={() => goDetail(item.id)}>
                  <GridImage
                    src={`http://localhost:8081${item.productFileDTO.find((file) => file.productFileTypeId === 1)?.imagePath}`}
                    alt="상품 이미지"
                  />
                  <GridTitle>{item.name}</GridTitle>
                  <GridText>{item.price.toLocaleString()}원</GridText>
                </GridItem>
              ))}
            </Grid>
          ) : category == "all" ? (
            <NoData>등록된 상품이 없습니다.</NoData>
          ) : (
            <NoData>해당 카테고리의 상품이 없습니다.</NoData>
          )}
        </div>

        <Pages>
          {totalPages > 1 && (
            <Pagination
              count={totalPages} // 총 페이지 수
              page={currentPage} // 현재 페이지
              onChange={handlePageChange} // 페이지 변경 핸들러
              siblingCount={2} // 현재 페이지 주변에 보이는 페이지 수
              boundaryCount={2} // 처음과 끝에 보이는 페이지 수
              color="primary"
            />
          )}
        </Pages>
      </GoodsSection>
    </>
  );
};
export default ShoppingMain;

const GoodsSection = styled.div`
  width: 100%;
  min-height: 700px;
  margin: 5rem 0;
  display: flex;
  flex-direction: column;

  #goods-section ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    list-style: none;
  }

  #goods-section li {
    display: flex;
    margin: 0 5px 90px;
  }

  #goods-section li img {
    width: 280px;
    height: 380px;
    // border : 1px solid red;
  }
`;

const Input = styled.input`
  border-width: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  height: 2rem;
`;

const IconTitle = styled.h4`
  text-align: center;
  font-size: 1.8rem;
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
  &:hover img {
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
  font-size: 1.2rem;
  font-weight: bold;
`;

const NoData = styled.ul`
  font-size: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5rem 1rem;
  margin: 0 8rem;
`;

const GridItem = styled.div`
  min-width: 200px;
`;

const GridImage = styled.img`
  width: 100%;
  height: 350px;
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

const Pages = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
