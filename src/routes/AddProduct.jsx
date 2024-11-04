import FooterComponent from "../components/common/FooterComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Checkbox, TextField } from "@mui/material";
import styled from "styled-components";
import FormControlLabel from '@mui/material/FormControlLabel';

const Container = styled.div`
    margin-left:100px;
`;

const AddProduct = () => {
    return (
        <>
            <HeaderComponent />
            <Container>
                <div>
                    <h4>상품 등록</h4>
                </div>
                <form>
                    <InputLabel id="category">카테고리</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        label="Age"
                        style={{ width: '150px' }}
                    >
                        <MenuItem value={10}>사료</MenuItem>
                        <MenuItem value={20}>간식</MenuItem>
                        <MenuItem value={30}>의류</MenuItem>
                    </Select>
                    <div>상품명 <TextField placeholder="상품명을 입력해주세요"></TextField></div>
                    <div>가격 <TextField type="가격을 입력해주세요" ></TextField></div>
                    <div>썸네일 이미지 <TextField type="file" ></TextField></div>
                    <div>상품 설명 이미지 <TextField type="file"></TextField></div>
                    <div>상품 공개 여부
                        <span style={{marginLeft: '20px'}}>
                            <FormControlLabel control={<Checkbox />} label="공개" />
                            <FormControlLabel control={<Checkbox />} label="비공개" />
                        </span>
                    </div>
                    <Button variant="outlined">취소</Button>
                    <Button variant="contained">등록</Button>

                </form>
            </Container>


            <FooterComponent />
        </>
    );
}
export default AddProduct;