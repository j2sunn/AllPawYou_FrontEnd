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
              <OrderHeader>
                <OrderTitle>주문 1</OrderTitle>
                <div>
                  <Button variant="outlined">주문 상세</Button>
                  <Button variant="outlined" sx={{marginLeft: '1rem'}}>주문 취소</Button>
                </div>
              </OrderHeader>
              <Product>
                <OrderInfo>
                  <ProductImg as="div" />
                  <Detail>
                    <div>제품명</div>
                    <div>설명</div>
                    <div>가격</div>
                  </Detail>
                </OrderInfo>
                <Buttons>
                  <Button variant="outlined">후기 작성하기</Button>
                  <Button variant="outlined" color="error">후기 삭제하기</Button>
                </Buttons>
              </Product>
              <Product>
                <OrderInfo>
                  <ProductImg as="div" />
                  <Detail>
                    <div>제품명</div>
                    <div>설명</div>
                    <div>가격</div>
                  </Detail>
                </OrderInfo>
                <Buttons>
                  <Button variant="outlined">후기 작성하기</Button>
                  <Button variant="outlined" color="error">후기 삭제하기</Button>
                </Buttons>
              </Product>
            </Order>

            <Order>
              <OrderHeader>
                <OrderTitle>주문 2</OrderTitle>
                <div>
                  <Button variant="outlined">주문 상세</Button>
                  <Button variant="outlined" sx={{marginLeft: '1rem'}}>주문 취소</Button>
                </div>
              </OrderHeader>
              <Product>
                <OrderInfo>
                  <ProductImg as="div" />
                  <Detail>
                    <div>제품명</div>
                    <div>설명</div>
                    <div>가격</div>
                  </Detail>
                </OrderInfo>
                <Buttons>
                  <Button variant="outlined">후기 작성하기</Button>
                  <Button variant="outlined" color="error">후기 삭제하기</Button>
                </Buttons>
              </Product>
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
  margin: 0 2rem;
`;

const Order = styled.div`
  width: 100%;
  border: 3px solid #EEC759;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem 0;
`;

const OrderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Product = styled.div`
  display: flex;
  border: 1px solid #EEC759;
  border-radius: 10px;
  width: 90%;
  margin: 2rem;
  padding: 1rem;
`;

const OrderInfo = styled.div`
  display: flex;
  padding: 1rem;
  width: 75%;
  border-right: 1px solid black;
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
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  button {
    margin: 0.5rem;
  }
`;
