import styled from "styled-components";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import { Button, Checkbox } from "@mui/material";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

const Cart = () => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <Title>장바구니</Title>
        <Content>
          <ProductList>
            <Product>
              <Checkbox sx={{fontSize: '1.5rem'}}/>
              <ProductImg as="div" />
              <ProductName>상품명</ProductName>
              <Quantity>
                <BiMinusCircle style={{cursor:'pointer'}} />
                0
                <BiPlusCircle style={{cursor:'pointer'}} />
              </Quantity>
              <ProductPrice>10000</ProductPrice>
              <Button variant="outlined" color="error" sx={{height:'2.5rem'}}>삭제</Button>
            </Product>

            <Product>
              <Checkbox sx={{fontSize: '1.5rem'}}/>
              <ProductImg as="div" />
              <ProductName>상품명</ProductName>
              <Quantity>
                <BiMinusCircle style={{cursor:'pointer'}} />
                0
                <BiPlusCircle style={{cursor:'pointer'}} />
              </Quantity>
              <ProductPrice>10000</ProductPrice>
              <Button variant="outlined" color="error" sx={{height:'2.5rem'}}>삭제</Button>
            </Product>
            
            <Product>
              <Checkbox sx={{fontSize: '1.5rem'}}/>
              <ProductImg as="div" />
              <ProductName>상품명</ProductName>
              <Quantity>
                <BiMinusCircle style={{cursor:'pointer'}}/>
                0
                <BiPlusCircle style={{cursor:'pointer'}}/>
              </Quantity>
              <ProductPrice>10000</ProductPrice>
              <Button variant="outlined" color="error" sx={{height:'2.5rem'}}>삭제</Button>
            </Product>
          </ProductList>

          <TotalPrice>
            <TotalPriceHeader>결제 정보</TotalPriceHeader>
            <TotalPriceContent>
              <div>총 결제 금액</div>
              <div>10000원</div>
            </TotalPriceContent>
            <Button variant="contained" sx={{fontSize: '1.5rem', marginTop: '1.5rem'}}>구매하기</Button>
          </TotalPrice>
        </Content>
      </Container>
      <FooterComponent />
    </>
  )
};

export default Cart;

const Container = styled.div`
  min-height: 600px;
  margin: 2rem 10rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5rem 0;
`;

const Content = styled.div`
  border-top: 2px solid black;
  display: flex;
`;

const ProductList = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Product = styled.div`
  border: 3px solid #EEC759;
  border-radius: 15px;
  margin: 2rem 0;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 2rem;
  border: 1px solid black;
`;

const ProductName = styled.div`
  width: 30%;
  font-size: 1.3rem;
`;

const Quantity = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  margin: 0 1rem;
`;

const ProductPrice = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  margin: 0 1rem;
`;



const TotalPrice = styled.div`
  width: 35%;
  height: 300px;
  margin-top: 3rem;
  padding: 1.5rem;
  border: 3px solid #EEC759;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const TotalPriceHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const TotalPriceContent = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  padding: 1.5rem 0;
`;