import styled from "styled-components";
import { Button, Box } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCart, getProductByProductId, listCart } from "../service/ProductService";
import Swal from "sweetalert2";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const ShoppingDetail = () => {

    const [value, setValue] = React.useState(0);
    const navigator = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { id } = useParams();   //url에서 id 파라미터 가져온다.
    const [product, setProduct] = useState(null);
    const [files, setFiles] = useState(null);
    const [cart, setCart] = useState([]);
    const [disabled, setDisabled] = useState(false); 
    const [data, setData] = useState({
        userNo: localStorage.getItem("no"),
        productId: id,
        quantity: 1
    });

    const addCartItem = () => {
        let cartExist = false;
        if(data.quantity <= 0) {
            Swal.fire({
                icon: "error",
                title:"수량이 0 입니다.",
                confirmButtonColor: '#527853'
              });
            return;
        }
        cart.forEach(i => i.productId == id ? cartExist = true : null);
        if(cartExist || disabled){
            Swal.fire({
                icon: "warning",
                title:"해당 상품이 이미 장바구니에 있습니다.",
                width: "40%",
                confirmButtonColor: '#527853'
              });
        }else{
            addCart(data);
            setDisabled(true);
            Swal.fire({
                icon: "info",
                title: "장바구니로 이동하시겠습니까?.",

                showCancelButton: true,
                confirmButtonColor: '#527853',      
                cancelButtonColor: '#d33',
                confirmButtonText: '장바구니로 이동',
                cancelButtonText: '취소',
              }).then(result => {
                if(result.isConfirmed){
                    navigator("/cart");  
                }
              });
        }
    }

    const navigatePayment = () => {
        const checkedData = [{
            ...product,
            quantity: data.quantity
        }];
        navigator("/payment", {
        state: { checkedData, totalPrice: product.price * data.quantity}
      })
    
    }

    const loadCart = async() => {
        const response = await listCart(data.userNo);
        setCart(response);
    }

    const handleQuantity = (event) => {
        const obj = data;
        console.log(event.target.value);
  
        if( event.target.value === '0'){
            data.quantity = 1;
        } else if(event.target.value.length > 2){
          data.quantity = +event.target.value.slice(0, 2);
        }else{
            data.quantity = event.target.value;
        }

        setData({...obj});
      }

    const minus = () => {
        const obj = data;
        if(obj.quantity <= 1) {
            alert("최소 수량입니다.")
        }else{
            obj.quantity--;
            setData({...obj});
        }
    }

    const plus = () => {
        const obj = data;
        if(obj.quantity >= 99) {
            alert("최대 수량입니다.")
        }else{
            obj.quantity++;
            setData({...obj});
        }

    }

  
    useEffect(() => {
        if (id) {
            getProductByProductId(id)
                .then(response => {
                    console.log("response 정보 : ", response);
                    setProduct(response);
                    
                }).catch((error) => {
                    console.log("에러발생 : ", error);
                });
        }
        loadCart();
    }, [id]);

    return (
        <>
            <Container>
                <Button variant="outlined" onClick={()=>navigator(-1)} sx={{alignSelf: 'start', marginLeft: '10rem', marginBottom: '5rem'}}>뒤로가기</Button>
                {product ? (
                    <div style={{display: 'flex'}}>
                        <ImgArea className="imgArea">
                            <ProductImage src={`http://localhost:8081${product.productFileDTO?.find(file => file.productFileTypeId === 1)?.imagePath}`}>
                            </ProductImage>
                        </ImgArea>
                        <ContentArea className="contentArea">
                            <div className="productName" style={{ marginBottom: '40px' }}>
                                <h4 style={{ fontFamily: 'NanumSquareRound', fontSize: '2rem', fontWeight:'bold' }}>{product.name}</h4>
                            </div>
                            <div style={{ fontFamily: 'NanumSquareRound', marginBottom: '20px' }}>
                                <h5 style={{ fontWeight: 'bold' }}>{product.price}원</h5>
                            </div>
                            <div>
                                후기
                            </div>

                            <quantityIcon className="quantityIcon">
                                <Box display="flex" alignItems="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Button variant="outlined" sx={{ minWidth: '30px', padding: 0, height: '30px', borderRadius: 0 }} onClick={minus}>-</Button>
                                    <Input type="number" id={product.id} onChange={handleQuantity} value={data.quantity}/>
                                    <Button variant="outlined" sx={{
                                        minWidth: '30px', padding: 0, height: '30px', borderRadius: 0
                                    }} onClick={plus}>+</Button>
                                </Box>
                            </quantityIcon>
                            <div className="orderArea">
                                <Button sx={{ fontFamily: 'NanumSquareRound', marginRight: '10px', width: '150px' }} variant="outlined" onClick={addCartItem}>
                                    장바구니에 담기
                                </Button>
                                <Button sx={{ fontFamily: 'NanumSquareRound', width: '150px' }} variant="contained" onClick={navigatePayment}>
                                    바로 구매하기
                                </Button>
                            </div>
                        </ContentArea>
                    </div>
                ) : (<p>오류입니다.</p>)}
            </Container>
            <DetailArea style={{ marginTop: "50px" }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="상품 설명" {...a11yProps(0)} />
                            <Tab label="리뷰" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        상품 설명 상세내용
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        리뷰 상세내용
                    </CustomTabPanel>
                </Box>
            </DetailArea>
        </>
    );
};

export default ShoppingDetail;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
    list-style: none;
    margin-top: 30px;
`;

const ContentArea = styled.div`
    margin-left : 10rem;
    border: 3px solid #EEC759;
    border-radius: 20px;
    padding: 3rem;
`;

const ImgArea = styled.div`
`;

const ProductImage = styled.img`
    width :400px;
`;

const DetailArea = styled.div`
`;

const Input = styled.input`
  width: 3rem;
  text-align: center;
`;