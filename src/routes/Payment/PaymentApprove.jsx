import styled from "styled-components";
import { Button, Table } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { paymentApprove } from "../../service/PaymentService";

const PaymentApprove = () => {

  const navigator = useNavigate();
  const location = useLocation();

  //url로 넘어오는 값 받기
  const pg_token = location?.search.split("=")[1];

  //유저 정보는 localStorage나 유저 api 요청해서 사용
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("phone"),
    address: localStorage.getItem("address")
  });
  const [requestData, setRequestData] = useState({
    tid: localStorage.getItem("tid"),
    pg_token
  });

  const [responseData, setResponseData] = useState({});

  const approve = async() => {
    const response = await paymentApprove(requestData);
    setResponseData(response.data);
  }

  useEffect(()=>{
    approve();
  },[]);

  return (
    <>
      <Container>
        <Title>주문 완료</Title>
        <Content>
          <ContentHeader>주문해주셔서 감사합니다.</ContentHeader>
          <div>
            <DetailTitle>상품 및 배송정보</DetailTitle>
            <DetailContainer>
              <Table>
                <Tr>
                  <Th>받으시는분</Th>
                  <Td>{user?.username}</Td>
                </Tr>
                <Tr>
                  <Th>주소</Th>
                  <Td>{user?.address}</Td>
                </Tr>
                <Tr>
                  <Th>전화번호</Th>
                  <Td>{user?.phone}</Td>
                </Tr>
              </Table>
            </DetailContainer>
          </div>
          <div>
            <DetailTitle>결제정보</DetailTitle>
            <DetailContainer>
              <Table>
                <Tr>
                  <Th>상품명</Th>
                  <Td>{responseData?.item_name}</Td>
                </Tr>
                <Tr>
                  <Th>결제금액</Th>
                  <Td>{responseData?.amount?.total.toLocaleString()}원</Td>
                </Tr>
                <Tr>
                  <Th>결제수단</Th>
                  <Td>카카오페이</Td>
                </Tr>
              </Table>
            </DetailContainer>
          </div>
          <Buttons>
            <Button variant="contained" sx={{width: '250px', marginRight: '5rem'}} onClick={()=>navigator('/order')}>주문 목록으로</Button>
            <Button variant="contained" sx={{width: '250px'}} onClick={()=>navigator('/shopping')}>쇼핑몰 메인 페이지로 이동</Button>
          </Buttons>
        </Content>
      </Container>
    </>
  )
};

export default PaymentApprove;

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
`;

const ContentHeader = styled.div`
  margin: 2rem;
  font-size: 1.8rem;
  font-weight: bold;
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

const Buttons = styled.div`
  display: flex;
`;