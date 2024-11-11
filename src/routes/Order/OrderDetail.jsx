import styled from "styled-components";
import { Button, Table } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserByNo } from "../../service/UserAPI";
import MypageSideBar from "../../components/common/MypageSideBar";

const OrderDetail = () => {
  const { state } = useLocation();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const paymentState = state?.payment[0]?.paymentState || false;

  console.log(state?.payment);

  const getUserByNo = async (userNo) => {
    const response = await fetchUserByNo(userNo);
    setUser(response);
  };
  useEffect(() => {
    scrollTo(0,0);
    getUserByNo(state?.payment[0]?.userNo);
  }, []);
  return (
    <>
      <Container>
        <MypageSideBar />
        <Content>
          <div style={{display:"flex", justifyContent: 'space-between', alignItems:' center', width: '80%', borderBottom: '2px solid rgba(0,0,0,0.3)', marginBottom: '2rem'}}>
            <Title>주문 상세</Title>
            <Button variant="outlined" sx={{width: '8rem', height: '2.5em'}} onClick={()=>navigate(-1)}>뒤로가기</Button>
          </div>
          <Order>
            <InfoTitle>상품 정보</InfoTitle>
            <InfoContainer>
              {state?.payment?.map((order) => {
                return (
                  <Product key={order?.orderNo}>
                        <OrderInfo>
                          <ProductImg src={`http://localhost:8081${order.productFileDTO?.find(file => file.productFileTypeId === 1)?.imagePath}`} alt="이미지" />
                          <div>
                            <Detail>
                              <div style={{fontSize: '1.1rem', marginRight: '2rem'}}>
                                {order?.name} ({order?.quantity}개)
                              </div>
                              <div>총 가격 : {(order?.price * order?.quantity).toLocaleString()}원</div>
                            </Detail>
                            <Button variant="outlined" onClick={() => navigator(`/review/createreview/${order?.name}`)} disabled={!paymentState}>
                              후기 작성하기
                            </Button>
                          </div>
                        </OrderInfo>
                      </Product>
                );
              })}
            </InfoContainer>

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
                  <Td>{state?.payment[0]?.totalPrice.toLocaleString()}원</Td>
                </Tr>
              </Table>
            </InfoContainer>
          </Order>
        </Content>
      </Container>
    </>
  );
};

export default OrderDetail;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  padding-left: 4rem;
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
  margin: 1.5rem;
`;

const Order = styled.div`
  width: 85%;
`;

const InfoTitle = styled.div`
  padding-left: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const InfoContainer = styled.div`
  width: 90%;
  border-bottom: 2px solid rgba(0,0,0,0.3);
  margin-bottom: 2rem;
  margin: 1rem 2rem 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;


const Product = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.3);
  width: 80%;
  margin: 1rem 0;
  padding: 1rem;
`;

const OrderInfo = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
`;

const ProductImg = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 30px;
`;

const Detail = styled.div`
  padding: 1rem;
  height: 100px;
  display: flex;
`;

const Tr = styled.tr`
  display: flex;
  align-items: center;
`;

const Th = styled.th`
  display: block;
  padding: 1rem;
  width: 150px;
  border-right: 1px solid rgba(0,0,0,0.3);
  text-align: center;
`;

const Td = styled.td`
  display: block;
  padding-left: 2rem;
`;
