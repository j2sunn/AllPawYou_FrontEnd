import styled from "styled-components";
import { Button, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteCart, getProductByProductId, listCart } from "../service/ProductService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoCloseOutline } from "react-icons/io5";

const Cart = () => {
  const navigator = useNavigate();

  const [userNo, setUserNo] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [load, setLoad] = useState(false);
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);

  //장바구니 목록
  const loadCartList = async (no) => {
    const response = await listCart(no);
    console.log(response);
    setCartItems([...response]);
    setLoad(true);
  };

  //confirm 기능 추가하기
  const deleteCartItem = async (cartId) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const arr = productList.filter((i) => i.cartId != cartId);
        deleteCart(cartId);
        setProductList([...arr]);
        Swal.fire({
          icon: "success",
          title: "삭제가 완료되었습니다.",
          confirmButtonColor: "#527853",
        });
      }
    });
  };

  const deleteCheckedItem = async () => {
    Swal.fire({
      title: "선택 항목을 삭제하시겠습니까?",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteArr = productList.filter((i) => i.checked);
        const restArr = productList.filter((i) => !i.checked);
        if (deleteArr.length == 0) {
          Swal.fire({
            icon: "warning",
            title: "선택 항목이 없습니다.",
            confirmButtonColor: "#527853",
          });
          return;
        }
        deleteArr.forEach((i) => deleteCart(i.cartId));
        setProductList([...restArr]);
        Swal.fire({
          icon: "success",
          title: "삭제가 완료되었습니다.",
          confirmButtonColor: "#527853",
        });
      }
    });
  };

  //상품 상세
  const loadProductList = async (productId, cartId, quantity) => {
    const arr = productList;
    const response = await getProductByProductId(productId);
    arr.push({ ...response, quantity, cartId, checked: false });
    arr.sort((a, b) => a.cartId - b.cartId);
    setProductList([...arr]);
  };

  const handleTotalPrice = () => {
    if (productList.length >= 1) {
      let total = 0;
      productList.forEach((item) => (item.checked ? (total += item.price * item.quantity) : null));
      setTotalPrice(total);
    }
  };

  const checkAll = (event) => {
    let arr = productList;
    if (event.target.checked) {
      setIsAllChecked(true);
      arr.forEach((i) => (i.checked = true));
    } else {
      setIsAllChecked(false);
      arr.forEach((i) => (i.checked = false));
    }
    console.log(arr);
    setProductList([...arr]);
  };

  const handleCheckBox = (event) => {
    let arr = productList;
    let all = false;
    if (event.target.checked) {
      arr.forEach((i) => (i.id == event.target.id ? (i.checked = true) : null));
    } else {
      arr.forEach((i) => (i.id == event.target.id ? (i.checked = false) : null));
    }
    arr.forEach((i) => (i.checked == false ? (all = true) : null));
    if (all) {
      setIsAllChecked(false);
    } else {
      setIsAllChecked(true);
    }
    setProductList(arr);
    handleTotalPrice();
  };

  //수량 직접 입력
  const handleQuantity = (event) => {
    // 최소 1
    if (event.target.value === "0") {
      event.target.value = 1;
    }

    //최대 99
    if (event.target.value.length > 2) {
      event.target.value = +event.target.value.slice(0, 2);
    }
    const arr = [...productList];
    arr.forEach((i) => (i.id == event.target.id ? (i.quantity = +event.target.value) : null));
    setProductList(arr);
  };

  // + 버튼 동작
  const plus = (event) => {
    const arr = [...productList];
    arr.forEach((i) => i.id == event.target.id ? i.quantity >= 99 ? 
      Swal.fire({
        icon: "warning",
        title: "최대 수량입니다.",
        confirmButtonColor: "#527853",
      }) : i.quantity++
      : null
    );
    setProductList(arr);
  };

  // - 버튼 동작
  const minus = (event) => {
    const arr = [...productList];
    arr.forEach((i) => i.id == event.target.id ? i.quantity <= 1 ? 
      Swal.fire({
        icon: "warning",
        title: "최소 수량입니다.",
        confirmButtonColor: "#527853",
      }) : i.quantity--
    : null
  );
    setProductList(arr);
  };

  //결제 준비 페이지로 이동
  const navigatePayment = () => {
    const checkedData = productList.filter((i) => i.checked);
    if (checkedData.length == 0 || totalPrice == 0) {
      Swal.fire({
        icon: "error",
        title: "선택된 상품이 없습니다.",
        confirmButtonColor: "#527853",
      });
    } else {
      navigator("/payment", {
        state: { checkedData, totalPrice },
      });
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    //유저 번호
    setUserNo(localStorage.getItem("no"));

    //유저가 존재하면 장바구니 목록 요청
    if (userNo > 0 && !load) {
      loadCartList(userNo);
    }

    //cartItems 반복문 돌려서 상품 상세 요청
    if (cartItems.length >= 1) {
      cartItems.forEach((item) => {
        loadProductList(item.productId, item.cartId, item.quantity);
      });
    }
  }, [userNo, cartItems]);

  //productList 수정되면 totalPrice 다시 계산
  useEffect(() => {
    if (cartItems.length >= 1) {
      handleTotalPrice();
    } else {
      setProductList([]);
    }
  }, [cartItems, productList]);

  // Check for admin role on component mount
  //역할 받아오기
  const role = localStorage.getItem("role");
  // useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    // ROLE_USER, ROLE_ADMIN, ROLE_SALER가 아닌 경우
    if (role !== "ROLE_USER" && role !== "ROLE_ADMIN" && role !== "ROLE_SALER") {
      navigate("/loginNeed");
      Swal.fire({
        title: "로그인이 필요합니다.",
        icon: "warning",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    }
  }, [role, navigate]);

  return (
    <>
      <Container>
        <Title onClick={() => console.log(productList)}>장바구니</Title>
        <Content>
          <ProductList>
            <CartHeader>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox checked={isAllChecked} sx={{ fontSize: "1.5rem" }} onClick={checkAll} />
                전체
              </div>
              <div style={{ cursor: "pointer" }} onClick={deleteCheckedItem}>
                선택 삭제
              </div>
            </CartHeader>
            {productList?.map((product) => {
              return (
                <Product key={product.id}>
                  {product?.checked ? (
                    <Checkbox checked={true} sx={{ fontSize: "1.5rem" }} id={product.id} onChange={() => handleCheckBox(event)} />
                  ) : (
                    <Checkbox checked={false} sx={{ fontSize: "1.5rem" }} id={product.id} onChange={() => handleCheckBox(event)} />
                  )}
                  <ProductImg
                    src={`http://localhost:8081${product.productFileDTO?.find((file) => file.productFileTypeId === 1)?.imagePath}`}
                    alt="이미지"
                  />
                  <ProductName>{product.name}</ProductName>
                  <Quantity>
                    <Button variant="outlined" id={product.id} sx={{ minWidth: "30px", padding: 0, height: "30px", borderRadius: 0 }} onClick={minus}>
                      -
                    </Button>
                    <Input type="number" id={product.id} onChange={handleQuantity} value={product.quantity} />
                    <Button
                      variant="outlined"
                      id={product.id}
                      sx={{
                        minWidth: "30px",
                        padding: 0,
                        height: "30px",
                        borderRadius: 0,
                      }}
                      onClick={plus}
                    >
                      +
                    </Button>
                  </Quantity>
                  <ProductPrice>{(product.price * product.quantity).toLocaleString()}원</ProductPrice>
                  {/* <Button variant="outlined" color="error" sx={{height:'2.5rem'}} onClick={()=>deleteCartItem(product.cartId)}>삭제</Button> */}
                  <IoCloseOutline size={32} style={{ cursor: "pointer" }} onClick={() => deleteCartItem(product.cartId)} />
                </Product>
              );
            })}
          </ProductList>

          <TotalPrice>
            <TotalPriceHeader>결제 정보</TotalPriceHeader>
            <TotalPriceContent>
              <div>총 결제 금액</div>
              <div>{totalPrice.toLocaleString()}원</div>
            </TotalPriceContent>
            <Button variant="contained" sx={{ fontSize: "1.5rem", marginTop: "1.5rem" }} onClick={navigatePayment}>
              구매하기
            </Button>
          </TotalPrice>
        </Content>
      </Container>
    </>
  );
};

export default Cart;

const Container = styled.div`
  min-height: 600px;
  margin: 2rem 10rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 5rem 0 1.5rem;
`;

const Content = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  display: flex;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const ProductList = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Product = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 3rem 0;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 2rem;
`;

const ProductName = styled.div`
  width: 30%;
  font-size: 1.3rem;
`;

const Quantity = styled.div`
  width: 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const TotalPriceHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const TotalPriceContent = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  padding: 1.5rem 0;
`;
