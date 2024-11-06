import styled from "styled-components";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { orderListByTid } from "../service/OrderService";
import { paymentCancel, payments } from "../service/PaymentService";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigator = useNavigate();
  const [orderList, setOrderList] = useState([]);

  const loadPayments = async() => {
    const response = await payments();
    response.forEach(i => loadOrderList(i.tid, i.totalPrice));
  }

  const loadOrderList = async(tid, totalPrice) => {
    const arr = orderList;
    const response = await orderListByTid(tid);
    response[0] = {...response[0], totalPrice};
    console.log(response);
    arr.push(response);
    arr.sort((a,b)=>b[0].orderNo-a[0].orderNo);
    setOrderList([...arr]);
  }

  const cancelPayment = async(data) => {
    console.log(data);
    const response = await paymentCancel(data);
    console.log(response);
  }

  useEffect(()=>{
    loadPayments();
  }, []);


  return (
    <>
      <Container>
        <Title>주문 목록</Title>
        <Content>
          <SideBar>사이드바</SideBar>
          <Payments>
            {orderList.map(payment => {
              return (
                <Payment key={payment[0].tid}>
                  <PaymentHeader>
                    <PaymentTitle>{payment[0].tid}</PaymentTitle>
                    <div>
                      <Button variant="outlined" onClick={()=>navigator(`/${payment[0].tid}`)}>주문 상세</Button>
                      <Button variant="outlined" sx={{marginLeft: '1rem'}} onClick={()=>cancelPayment({tid: payment[0].tid, cancel_amount: payment[0].totalPrice})}>주문 취소</Button>
                    </div>
                  </PaymentHeader>
                  {payment.map(order => {
                    return (
                      <Product key={order.orderNo}>
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
                    )
                  })}
                </Payment>
              )
            })}
          </Payments>
        </Content>
      </Container>
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

const Payments = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
`;

const Payment = styled.div`
  width: 100%;
  border: 3px solid #EEC759;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem 0;
`;

const PaymentTitle = styled.div`
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
  width: 25%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  button {
    margin: 0.5rem;
  }
`;
