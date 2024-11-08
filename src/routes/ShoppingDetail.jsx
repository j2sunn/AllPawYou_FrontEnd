import styled from "styled-components";
import { Button, TextField, Box } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCart, getProductByProductId } from "../service/ProductService";
import axios from "axios";

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { id } = useParams();   //url에서 id 파라미터 가져온다.
    const [product, setProduct] = useState(null);
    const [files, setFiles] = useState(null);
    const [data, setData] = useState({
        userNo: localStorage.getItem("no"),
        productId: id,
        quantity: 1
    });

    const addCartItem = () => {
        addCart(data);
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
    }, [id]);

    return (
        <>
            <Container>
                {product ? (
                    <>
                        <ImgArea className="imgArea">
                            <ProductImage src={`http://localhost:8081${product.productFileDTO?.find(file => file.productFileTypeId === 1)?.imagePath}`}>
                            </ProductImage>
                        </ImgArea>
                        {/* <ImgArea className="imgArea">
                            <ProductImage src="/src/assets/mainImage/shopping1.png"></ProductImage>
                        </ImgArea> */}
                        <ContentArea className="contentArea">
                            <div className="productName" style={{ marginBottom: '40px' }}>
                                <h4 style={{ fontFamily: 'NanumSquareRound' }}>{product.name}</h4>
                            </div>
                            <div style={{ fontFamily: 'NanumSquareRound', marginBottom: '20px' }}>
                                <h5 style={{ fontWeight: 'bold' }}>{product.price}</h5>
                            </div>
                            <div>
                                후기
                            </div>

                            <quantityIcon className="quantityIcon">
                                <Box display="flex" alignItems="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Button variant="outlined" sx={{ minWidth: '30px', padding: 0, height: '30px', borderRadius: 0 }}>-</Button>
                                    <TextField
                                        value={1}
                                        variant="outlined"
                                        size="small"
                                        sx={{ width: '60px', padding: 0, margin: 0, height: '30px' }}
                                        inputProps={{ style: { textAlign: 'center', height: '30px' } }}
                                        InputProps={{
                                            style: { borderRadius: 0, height: '30px' },
                                            classes: { notchedOutline: { borderRadius: 0 } }
                                        }}
                                    />
                                    <Button variant="outlined" sx={{
                                        minWidth: '30px', padding: 0, height: '30px', borderRadius: 0
                                    }}>+</Button>
                                </Box>
                            </quantityIcon>
                            <div className="orderArea">
                                <Button sx={{ fontFamily: 'NanumSquareRound', marginRight: '10px', width: '150px' }} variant="outlined" onClick={addCartItem}>
                                    장바구니에 담기
                                </Button>
                                <Button sx={{ fontFamily: 'NanumSquareRound', width: '150px' }} variant="contained">
                                    바로 구매하기
                                </Button>
                            </div>
                        </ContentArea>
                    </>
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
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    list-style: none;
    margin-top: 100px;
`;

const ContentArea = styled.div`
    margin-left : 10rem;
    width :500px;
`;

const ImgArea = styled.div`
`;

const ProductImage = styled.img`
    width :400px;
`;

const DetailArea = styled.div`
`;


