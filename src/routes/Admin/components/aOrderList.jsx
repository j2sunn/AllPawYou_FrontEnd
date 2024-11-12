import styled from "styled-components";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { orderListByTid } from "../../../service/OrderService";
import { payments } from "../../../service/PaymentService";
import { useNavigate } from "react-router-dom";
import { getProductByProductId } from "../../../service/ProductService";

const AdminOrderList = () => {
  const role = localStorage.getItem("role");
  const navigator = useNavigate();
  const [paymentList, setPaymentList] = useState([]);

  const loadPayments = async () => {
    //결제 목록
    const response = await payments();

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
      {role == "ROLE_ADMIN" ? (
        <>
          <Title>주문 목록</Title>
          <Payments>
            {paymentList?.map((payment) => {
              return (
                <Payment key={payment[0]?.tid}>
                  <PaymentHeader>
                    <PaymentTitle>{payment[0]?.createdAt?.slice(0, 10)} <span style={{fontSize: '1rem', fontWeight: '100', marginLeft: '2rem'}}>{payment[0].tid} {payment[0].paymentState ? '' : '(주문 취소)'}</span> </PaymentTitle>
                      <Button variant="outlined" onClick={() => navigator(`${payment[0].tid}`, { state: { payment } })}>
                        주문 상세
                      </Button>
                  </PaymentHeader>
                  {payment?.map((order) => {
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
                          </div>
                        </OrderInfo>
                      </Product>
                    );
                  })}
                </Payment>
                
              );
            })}
          </Payments>
        </>
      ) : (
        <>
          <div>권한이 없습니다.</div>
        </>
      )}
    </>
  );
};

export default AdminOrderList;

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
  margin-right: 30px;
`;

const Detail = styled.div`
  padding: 1rem;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.2rem;
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
