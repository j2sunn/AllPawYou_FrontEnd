import styled from "styled-components";
import { Button, TextField, Box } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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


    return (
        <>
            <Container>
                <ImgArea className="imgArea">
                    <ProductImage src="/src/assets/mainImage/shopping1.png"></ProductImage>
                </ImgArea>
                <ContentArea className="contentArea">
                    <div className="productName" style={{ marginBottom: '20px' }}>
                        <h4 style={{fontFamily: 'NanumSquareRound', marginBottom: '20px'}}>리카리카 휴대용 실리콘 파우치</h4>
                    </div>
                    <div style={{fontFamily: 'NanumSquareRound'}}>
                        <h5 style={{fontWeight: 'bold' }}>20,000원</h5>
                    </div>

                    <quantityIcon className="quantityIcon">
                        <Box display="flex" alignItems="center" sx={{marginTop : '20px', marginBottom : '20px'}}>
                            <Button variant="outlined" sx={{ minWidth: '40px', padding: 0, height: '40px', borderRadius: 0 }}>-</Button>
                            <TextField
                                value={1}
                                variant="outlined"
                                size="small"
                                inputProps={{ style: { textAlign: 'center' } }}
                                sx={{ width: '60px', padding: 0, margin: 0 }}
                                InputProps={{
                                    style: { borderRadius: 0 },
                                    classes: { notchedOutline: { borderRadius: 0 } }
                                }}
                            />
                            <Button variant="outlined" sx={{
                                minWidth: '40px', padding: 0, height: '40px', borderRadius: 0
                            }}>+</Button>
                        </Box>
                    </quantityIcon>
                    <div className="orderArea">
                        <Button sx={{fontFamily: 'NanumSquareRound', marginRight: '10px', width: '150px'}} variant="outlined">
                            장바구니에 담기
                        </Button>
                        <Button sx={{fontFamily: 'NanumSquareRound' , width: '150px'}} variant="contained">
                            바로 구매하기
                        </Button>
                    </div>
                </ContentArea>
            </Container>
            <DetailArea style={{marginTop:"50px"}}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Shopping Detail" {...a11yProps(0)} />
                            <Tab label="Review" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        상품 설명
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        리뷰
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


