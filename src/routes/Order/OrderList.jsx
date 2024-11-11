import styled from "styled-components";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { orderListByTid } from "../../service/OrderService";
import { paymentCancel, paymentsByUserNo } from "../../service/PaymentService";
import { useNavigate } from "react-router-dom";
import { getProductByProductId } from "../../service/ProductService";
import MypageSideBar from "../../components/common/MypageSideBar";
import Swal from "sweetalert2";

const OrderList = () => {
  const navigator = useNavigate();
  const userNo = localStorage.getItem("no");
  const [paymentList, setPaymentList] = useState([]);

  const loadPayments = async () => {
    //결제 목록
    const response = await paymentsByUserNo(userNo);
    console.log(response);

    //결제 별 주문 목록
    response.forEach((i) => loadOrderList(i.tid, i.totalPrice, i.paymentState));
  };

  //주문 목록 (orderNo순으로 정렬)
  const loadOrderList = async (tid, totalPrice, paymentState) => {
    const arr = paymentList;
    const response = await orderListByTid(tid);
    response[0] = { ...response[0], totalPrice, paymentState };
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
  const cancelPayment = (data) => {
    Swal.fire({
      title: "주문을 취소 하시겠습니까?",
      icon: 'warning',
      
      showCancelButton: true,
      confirmButtonColor: '#527853',
      cancelButtonColor: '#d33',
      confirmButtonText: '주문 취소',
      cancelButtonText: '뒤로가기',
      reverseButtons: true
      
   }).then(result => {
      if (result.isConfirmed) { 
        const arr = paymentList;
        arr.forEach(i=>i[0].tid == data.tid ? i[0].paymentState = false : null);
        setPaymentList([...arr]);
        paymentCancel(data);
        Swal.fire({
          icon: "success",
          title:'주문이 취소되었습니다.',
          confirmButtonColor: '#527853'
        });
      }
   });
    
  };

  useEffect(() => {
    scrollTo(0,0);
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
                    <PaymentTitle>{payment[0].createdAt.slice(0, 10)} <span style={{fontSize: '1rem', fontWeight: '100', marginLeft: '2rem'}}>{payment[0].tid} {payment[0].paymentState ? '' : '(주문 취소)'}</span> </PaymentTitle>
                    <div>
                      <Button variant="outlined" onClick={() => navigator(`${payment[0].tid}`, { state: { payment } })}>
                        주문 상세
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ marginLeft: "1rem" }}
                        onClick={() => cancelPayment({ tid: payment[0].tid, cancel_amount: payment[0].totalPrice })}
                        disabled={!payment[0].paymentState}
                      >
                        주문 취소
                      </Button>
                    </div>
                  </PaymentHeader>
                  {payment.map((order) => {
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
                            <Button variant="outlined" onClick={() => navigator(`/review/createreview/${order?.name}`)} disabled={!payment[0].paymentState}>
                              후기 작성하기
                            </Button>
                          </div>
                        </OrderInfo>
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
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
`;

const Payments = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const Payment = styled.div`
  width: 100%;
  border-top: 2px solid rgba(0,0,0,0.3);
  margin-bottom: 2rem;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`;

const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 2rem;
`;

const PaymentTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
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
