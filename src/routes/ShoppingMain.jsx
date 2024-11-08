import styled from "styled-components";
import { useEffect, useState } from "react";
import { listProducts } from "../service/ProductService";
import { useNavigate } from 'react-router-dom';

const ShoppingMain = () => {

    const [product, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

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

    const goDetail = ( productId ) => {
        navigate(`/shoppingDetail/${productId}`);
    };

    return (
        <>
            <GoodsSection>
                <IconTitle>쇼핑 카테고리</IconTitle>
                <IconContainer>
                    <IconCard>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_1.png" alt="사료" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>전체</div>
                        </IconCardBottom>
                    </IconCard>
                    <IconCard>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_1.png" alt="사료" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>사료</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_2.png" alt="간식" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>간식</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_3.png" alt="용품" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>용품</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_4.png" alt="건강" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>건강</div>
                        </IconCardBottom>
                    </IconCard>

                    <IconCard>
                        <IconBack>
                            <IconImg src="/src/assets/mainImage/icon/mainicon_5.png" alt="의류" />
                        </IconBack>
                        <IconCardBottom style={{ textAlign: "center" }}>
                            <div>의류</div>
                        </IconCardBottom>
                    </IconCard>
                </IconContainer>
                <div id="goods-section">
                    <ul>
                        {product.map((item, index) => (
                            <li key={index}  onClick={() => goDetail(item.id)}>
                            <a>
                                <div className="thumb_area">
                                    <span className="thumb">
                                        <img src={`http://localhost:8081${item.productFileDTO.find(file => file.productFileTypeId === 1)?.imagePath}`}></img>
                                    </span>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: 'bold' }} >{item.price}</span>
                                </div>
                            </a>
                        </li>
                       ))}
                    </ul>
                </div>
            </GoodsSection>
        </>
    );
}
export default ShoppingMain;


const GoodsSection = styled.div`
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
