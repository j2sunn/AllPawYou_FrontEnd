import styled from "styled-components";
import { Button, Table } from "@mui/material";
import { paymentReady } from "../../service/PaymentService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deleteCart } from "../../service/ProductService";

const PaymentCheck = () => {

  //장바구니에서 전달한 정보 받기
  const { state } = useLocation();
  console.log(state);
  
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("phone"),
    address: localStorage.getItem("address")
  });

  const [orderList, setOrderList] = useState([]);
  const [data, setData] = useState({userNo: 1, totalPrice: state.totalPrice, itemName: ''});

  const payment = (data) => {
    paymentReady(data);
    state.checkedData.forEach(i => deleteCart(i.id));
  }

  useEffect(()=>{
    if(state.checkedData){
      setOrderList(state.checkedData);

      let str = '';
      state.checkedData.forEach(order => str.length > 0 ? str += `, ${order.name}  ${order.quantity}` : str += `${order.name}  ${order.quantity}`);
      setData({...data, itemName: str})
    }
  }, []);

  return (
    <>
      <Container>
        <Title>주문 / 결제</Title>
        <Content>
          <div>
            <DetailTitle>구매자 정보</DetailTitle>
            <DetailContainer>
              <Table>
                <Tr>
                  <Th>이름</Th>
                  <Td>{user?.username}</Td>
                </Tr>

                <Tr>
                  <Th>이메일</Th>
                  <Td>{user?.email}</Td>
                </Tr>

                <Tr>
                  <Th>전화번호</Th>
                  <Td>{user?.phone}</Td>
                </Tr>

                <Tr>
                  <Th>배송주소</Th>
                  <Td>{user?.address}</Td>
                </Tr>
              </Table>
            </DetailContainer>
          </div>

          <div>
            <DetailTitle>상품</DetailTitle>
            <DetailContainer>
              <Table>
                {orderList.map(order => {
                  return (
                    <Tr key={order.id}>
                      <Th>{order.name}</Th>
                      <Td>수량 : {order.quantity}개</Td>
                    </Tr>
                  )
                })}
              </Table>
            </DetailContainer>
          </div>

          <div>
            <DetailTitle>결제정보</DetailTitle>
            <DetailContainer>
              <Table>
                <Tr>
                  <Th>결제금액</Th>
                  <Td>{state.totalPrice}원</Td>
                </Tr>

                <Tr>
                  <Th>결제수단</Th>
                  <Td>카카오페이</Td>
                </Tr>
              </Table>
            </DetailContainer>
          </div>
          <Button variant="contained" sx={{width: '200px', marginBottom:'3rem'}} onClick={()=>payment(data)}>결제하기</Button>
        </Content>
      </Container>
    </>
  )
};

export default PaymentCheck;

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
  border-top: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const DetailTitle = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const DetailContainer = styled.div`
  border: 2px solid #EEC759;
  border-radius: 10px;
  width: 70vw;
  margin: 1rem 0 3rem;
  padding: 1rem;
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