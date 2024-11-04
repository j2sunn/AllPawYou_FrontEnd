import styled from "styled-components";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import { Button } from "@mui/material";

const OrderList = () => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <Title>주문 목록</Title>
        <Content>
          <SideBar>사이드바</SideBar>
          <Orders>
            <Order>
              <OrderInfo>
                <Product>
                  <ProductImg as="div" />
                  <Detail>
                    <div>제품명</div>
                    <div>설명</div>
                    <div>가격</div>
                  </Detail>
                </Product>
                <Product>
                  <ProductImg as="div" />
                  <Detail>
                    <div>제품명</div>
                    <div>설명</div>
                    <div>가격</div>
                  </Detail>
                </Product>
              </OrderInfo>
              <Buttons>
                <Button variant="outlined">주문 상세</Button>
                <Button variant="outlined">주문 취소</Button>
                <Button variant="outlined">후기 작성하기</Button>
                <Button variant="outlined" color="error">후기 삭제하기</Button>
              </Buttons>
            </Order>
            <Order>
              <OrderInfo>
                <Product>
                  <ProductImg as="div" />
                  <Detail>
                    <div>제품명</div>
                    <div>설명</div>
                    <div>가격</div>
                  </Detail>
                </Product>
              </OrderInfo>
              <Buttons>
                <Button variant="outlined">주문 상세</Button>
                <Button variant="outlined">주문 취소</Button>
                <Button variant="outlined">후기 작성하기</Button>
                <Button variant="outlined" color="error">후기 삭제하기</Button>
              </Buttons>
            </Order>
          </Orders>
        </Content>
      </Container>
      <FooterComponent />
    </>
  )
};

export default OrderList;

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
  width: 100%;
  display: flex;
`;

const SideBar = styled.div`
  width: 25%;
  height: 500px;
  border: 1px solid black;
`;

const Orders = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Order = styled.div`
  display: flex;
  border: 3px solid #EEC759;
  border-radius: 10px;
  width: 80%;
  margin: 2rem;
  padding: 1rem;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 75%;
  border-right: 1px solid black;
`;

const Product = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const ProductImg = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid black;
  margin-right: 30px;
`;

const Detail = styled.div`
  padding: 1rem;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 2rem;
  button {
    margin: 0.5rem;
  }
`;
