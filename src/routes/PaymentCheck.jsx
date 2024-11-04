import styled from "styled-components";
import HeaderComponent from "../components/common/HeaderComponent";
import FooterComponent from "../components/common/FooterComponent";
import { Button, Table } from "@mui/material";

const PaymentCheck = () => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <Title>주문 / 결제</Title>
        <Content>
          <div>
            <DetailTitle>구매자 정보</DetailTitle>
            <DetailContainer>
              <Table>
                <Tr>
                  <Th>이름</Th>
                  <Td>asd</Td>
                </Tr>

                <Tr>
                  <Th>이메일</Th>
                  <Td>ㅁㄴㅇㄹ</Td>
                </Tr>

                <Tr>
                  <Th>전화번호</Th>
                  <Td>01000000000</Td>
                </Tr>

                <Tr>
                  <Th>배송주소</Th>
                  <Td>ㅁㄴㄹㄴㅇㅁㄴ</Td>
                </Tr>
              </Table>
            </DetailContainer>
          </div>

          <div>
            <DetailTitle>상품</DetailTitle>
            <DetailContainer>
              <Table>
                <Tr>
                  <Th>ㅁㅁㅁㅁ</Th>
                  <Td>수량 : 1개</Td>
                </Tr>

                <Tr>
                  <Th>ㅇㅇㅇㅇ</Th>
                  <Td>수량 : 1개</Td>
                </Tr>
              </Table>
            </DetailContainer>
          </div>

          <div>
            <DetailTitle>결제정보</DetailTitle>
            <DetailContainer>
              <Table>
                <Tr>
                  <Th>결제금액</Th>
                  <Td>10000원</Td>
                </Tr>

                <Tr>
                  <Th>결제수단</Th>
                  <Td>카카오페이</Td>
                </Tr>
              </Table>
            </DetailContainer>
          </div>
          <Button variant="contained" sx={{width: '200px', marginBottom:'3rem'}}>결제하기</Button>
        </Content>
      </Container>
      <FooterComponent />
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