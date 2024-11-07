import styled from "styled-components";
import { Button, Checkbox, TextField } from "@mui/material";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { deleteCart, getProductByProductId, listCart } from "../service/ProductService";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const navigator = useNavigate();

  const [userNo, setUserNo] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //장바구니 목록
  const loadCartList = async(no) => {
    const response = await listCart(no);
    setCartItems(response);
  }


  //confirm 기능 추가하기
  const deleteCartItem = async(cartNo) => {
    const response = await deleteCart(cartNo);
    console.log(response);
  }

  //상품 상세
  const loadProductList = async(productId, cartId) => {
    const arr = productList;
    const response = await getProductByProductId(productId);
    arr.push({...response, quantity: 1, cartId});
    setProductList([...arr]);
  }

  const handleTotalPrice = () => {
    if(productList.length >= 1){
      let total = 0;
      productList.forEach(item => item.checked ? total += item.price * item.quantity : null);
      setTotalPrice(total);
    }
  };

  const handleCheckBox = (event) => {
    let arr = productList;
    if(event.target.checked){
      arr.forEach(i => i.id == event.target.id ? i.checked = true : null);
    } else {
      arr.forEach(i => i.id == event.target.id ? i.checked = false : null);
    }
    setProductList(arr);
    handleTotalPrice();
  }

  //수량 직접 입력
  const handleQuantity = (event) => {
    // 최소 1
    if( event.target.value === '0'){
      event.target.value = 1;
    }

    //최대 99
    if(event.target.value.length > 2){
      event.target.value = +event.target.value.slice(0, 2);
    }
    const arr = [...productList];
    arr.forEach(i => i.id == event.target.id ? i.quantity = +event.target.value : null);
    setProductList(arr);
  }

  // + 버튼 동작
  const plus = (event) => {
    const arr = [...productList];
    arr.forEach(i => i.id == event.target.id ? i.quantity >= 99 ? null : i.quantity++ : null);
    setProductList(arr);
  }

  // - 버튼 동작
  const minus = (event) => {
    if(event.target.value <= 1){
      console.log('err');
      return;
    }
    const arr = [...productList];
    arr.forEach(i => i.id == event.target.id ? i.quantity <= 1 ? null : i.quantity-- : null);
    setProductList(arr);
  }

  //결제 준비 페이지로 이동
  const navigatePayment = () => {
    const checkedData = productList.filter(i => i.checked);
    if(checkedData.length == 0){
      alert("선택된 상품이 없습니다.");
    } else {
      navigator("/payment", {
        state: { checkedData, totalPrice }
      })
    }
  }


  useEffect(()=>{
    //유저 번호
    setUserNo(localStorage.getItem("no"));

    //유저가 존재하면 장바구니 목록 요청
    if(userNo > 0 && cartItems.length == 0){
      loadCartList(userNo);
    }

    //cartItems 반복문 돌려서 상품 상세 요청
    if(cartItems.length >= 1){
      cartItems.forEach((item) => {
        loadProductList(item.productId, item.cartId);
      })
    }
  },[userNo, cartItems]);

  //productList 수정되면 totalPrice 다시 계산
  useEffect(()=>{
    handleTotalPrice();
  },[productList]);

  return (
    <>
      <Container>
        <Title onClick={()=>console.log(productList)}>장바구니</Title>
        <Content>
          <ProductList>
            {productList?.map((product)=>{
                return (
                  <Product key={product.id}>
                    <Checkbox sx={{fontSize: '1.5rem'}} id={product.id} onChange={()=>handleCheckBox(event)}/>
                    <ProductImg as="div" />
                    <ProductName>{product.name}</ProductName>
                    <Quantity>
                      <BiMinusCircle style={{cursor:'pointer'}} id={product.id} onClick={minus} />
                      <Input type="number" id={product.id} onChange={handleQuantity} value={product.quantity}/>
                      <BiPlusCircle style={{cursor:'pointer'}} id={product.id} onClick={plus} />
                    </Quantity>
                    <ProductPrice>{product.price * product.quantity}</ProductPrice>
                    <Button variant="outlined" color="error" sx={{height:'2.5rem'}}>삭제</Button>
                  </Product>
                );
              })
            }
          </ProductList>

          <TotalPrice>
            <TotalPriceHeader>결제 정보</TotalPriceHeader>
            <TotalPriceContent>
              <div>총 결제 금액</div>
              <div>{totalPrice}원</div>
            </TotalPriceContent>
            <Button variant="contained" sx={{fontSize: '1.5rem', marginTop: '1.5rem'}} 
              onClick={navigatePayment}>
                구매하기
            </Button>
          </TotalPrice>
        </Content>
      </Container>
    </>
  )
};

export default Cart;

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
  border-top: 2px solid black;
  display: flex;
`;

const ProductList = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Product = styled.div`
  border: 3px solid #EEC759;
  border-radius: 15px;
  margin: 2rem 0;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 2rem;
  border: 1px solid black;
`;

const ProductName = styled.div`
  width: 30%;
  font-size: 1.3rem;
`;

const Quantity = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  margin: 0 1rem;
`;

const Input = styled.input`
  width: 3rem;
  text-align: center;
`;

const ProductPrice = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  margin: 0 1rem;
`;



const TotalPrice = styled.div`
  width: 35%;
  height: 300px;
  margin-top: 3rem;
  padding: 1.5rem;
  border: 3px solid #EEC759;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const TotalPriceHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const TotalPriceContent = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  padding: 1.5rem 0;
`;