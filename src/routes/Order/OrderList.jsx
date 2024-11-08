import styled from "styled-components";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { orderListByTid } from "../../service/OrderService";
import { paymentCancel, paymentsByUserNo } from "../../service/PaymentService";
import { useNavigate } from "react-router-dom";
import { getProductByProductId } from "../../service/ProductService";
import MypageSideBar from "../../components/common/MypageSideBar";

const OrderList = () => {
  const navigator = useNavigate();
  const userNo = localStorage.getItem("no");
  const [paymentList, setPaymentList] = useState([]);

  const loadPayments = async () => {
    //결제 목록
    const response = await paymentsByUserNo(userNo);
    console.log(response);

    //결제 별 주문 목록
    response.forEach((i) => loadOrderList(i.tid, i.totalPrice));
  };

  //주문 목록 (orderNo순으로 정렬)
  const loadOrderList = async (tid, totalPrice) => {
    const arr = paymentList;
    const response = await orderListByTid(tid);
    response[0] = { ...response[0], totalPrice };
    arr.push(response);
    arr.sort((a, b) => b[0].orderNo - a[0].orderNo);
    setPaymentList([...arr]);
  };

  //상품 상세
  const loadProductDetail = async (productId, index1, index2) => {
    const arr = paymentList;
    const response = await getProductByProductId(productId);
    arr[index1][index2] = { ...response, ...arr[index1][index2] };
    setPaymentList([...arr]);
  };

  //결제 취소
  const cancelPayment = async (data) => {
    console.log(data);
    const response = await paymentCancel(data);
    console.log(response);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  useEffect(() => {
    paymentList.forEach((product, index1) => {
      if (paymentList[index1][0]?.name == undefined) {
        product.forEach((item, index2) => {
          loadProductDetail(item.productId, index1, index2);
        });
      }
    });
  }, [paymentList]);

  return (
    <>
      <Container>
        <MypageSideBar />
        <Content>
          <Title>주문 목록</Title>
          <Payments>
            {paymentList.map((payment) => {
              return (
                <Payment key={payment[0].tid}>
                  <PaymentHeader>
                    <PaymentTitle>{payment[0].createdAt.slice(0, 10)} 주문</PaymentTitle>
                    <div>
                      <Button variant="outlined" onClick={() => navigator(`${payment[0].tid}`, { state: { payment } })}>
                        주문 상세
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ marginLeft: "1rem" }}
                        onClick={() => cancelPayment({ tid: payment[0].tid, cancel_amount: payment[0].totalPrice })}
                      >
                        주문 취소
                      </Button>
                    </div>
                  </PaymentHeader>
                  {payment.map((order) => {
                    return (
                      <Product key={order?.orderNo}>
                        <OrderInfo>
                          <ProductImg as="div" />
                          <Detail>
                            <div>
                              {order?.name} ({order?.quantity}개)
                            </div>
                            <div>설명</div>
                            <div>총 가격 : {order?.price * order?.quantity}원</div>
                          </Detail>
                        </OrderInfo>
                        <Buttons>
                          <Button variant="outlined">후기 작성하기</Button>
                          <Button variant="outlined" color="error">
                            후기 삭제하기
                          </Button>
                        </Buttons>
                      </Product>
                    );
                  })}
                </Payment>
              );
            })}
          </Payments>
        </Content>
      </Container>
    </>
  );
};

export default OrderList;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  margin: 2rem 4rem;
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

const Payments = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
`;

const Payment = styled.div`
  width: 100%;
  border: 3px solid #eec759;
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
  border: 1px solid #eec759;
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
