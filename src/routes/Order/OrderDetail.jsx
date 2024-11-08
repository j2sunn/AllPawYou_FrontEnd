import styled from "styled-components";
import { Button, Table } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSideBar from "../../components/common/AdminSideBar";
import { fetchUserByNo } from "../../service/UserAPI";

const OrderDetail = () => {
  const {state} = useLocation();
  const [user, setUser] = useState({});

  console.log(state.payment);

  const getUserByNo = async(userNo) => {
    const response = await fetchUserByNo(userNo);
    setUser(response);
  }
  useEffect(()=>{
    getUserByNo(state.payment[0].userNo);
  },[]);
  return (
    <>
      <Container>
        <AdminSideBar />
        <Content>
          <Title>주문 상세</Title>
          <Order>
            <InfoTitle>상품 정보</InfoTitle>
            {
              state.payment.map(order => {
                return (
                  <InfoContainer key={order.orderNo}>
                    <OrderInfo>
                      <ProductImg as="div" />
                      <Detail>
                        <div>{order.name} ({order.quantity}개)</div>
                        <div>설명</div>
                        <div>총 가격 : {order?.price * order?.quantity}원</div>
                      </Detail>
                    </OrderInfo>
                    <Buttons>
                      <Button variant="outlined">후기 작성하기</Button>
                      <Button variant="outlined" color="error">후기 삭제하기</Button>
                    </Buttons>
                  </InfoContainer>
                )
              })
            }

            <InfoTitle>받는사람 정보</InfoTitle>
            <InfoContainer>
              <Table>
                <Tr>
                  <Th>이름</Th>
                  <Td>{user?.username}</Td>
                </Tr>
                <Tr>
                  <Th>연락처</Th>
                  <Td>{user?.phone}</Td>
                </Tr>
                <Tr>
                  <Th>배송지 주소</Th>
                  <Td>{user?.address}</Td>
                </Tr>
              </Table>
            </InfoContainer>

            <InfoTitle>결제 정보</InfoTitle>
            <InfoContainer>
              <Table>
                <Tr>
                  <Th>결제 수단</Th>
                  <Td>카카오페이</Td>
                </Tr>
                <Tr>
                  <Th>결제 금액</Th>
                  <Td>{state.payment[0].totalPrice}원</Td>
                </Tr>
              </Table>
            </InfoContainer>
          </Order>
        </Content>
      </Container>
    </>
  )
};

export default OrderDetail;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  margin: 0 4rem;
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  `;
  
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5rem 3rem;
`;

const Order = styled.div`
  width: 85%;
`;

const InfoTitle = styled.div`
  padding-left: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
`;

const InfoContainer = styled.div`
  display: flex;
  border: 3px solid #EEC759;
  border-radius: 10px;
  width: 90%;
  margin: 1rem 2rem 2rem;
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

const Tr = styled.tr`
  display: flex;
  align-items: center;
`;

const Th = styled.th`
  display: block;
  padding: 1rem;
  width: 150px;
  border-right: 2px solid black;
  text-align: center;
`;

const Td = styled.td`
  display: block;
  padding-left: 2rem;
`;