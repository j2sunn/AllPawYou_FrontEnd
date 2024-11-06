import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import styled from "styled-components";
import { listProducts } from "../service/ProductService";

const ProductList = () => {

    const [product, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        listProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Container>
                <SideBar>
                    <SideBarTitle>관리자 메뉴</SideBarTitle>
                    <SimpleTreeView>
                        <TreeItem itemId="0" label="회원관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
                        <TreeItem itemId="board" label="게시판 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
                            <TreeItem itemId="1" label="공지사항" />
                            <TreeItem itemId="2" label="자유게시판" />
                            <TreeItem itemId="3" label="FAQ" />
                        </TreeItem>
                        <TreeItem itemId="shopping-mall" label="쇼핑몰 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
                            <TreeItem itemId="4" label="상품 관리" />
                            <TreeItem itemId="5" label="매출 관리" />
                            <TreeItem itemId="6" label="주문 관리" />
                        </TreeItem>
                    </SimpleTreeView>
                </SideBar>
                <Content>
                    <Title>상품 관리</Title>
                    <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#EEC759" }}>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '8rem' }}>번호</TableCell>
                                    <TableCell align="center" sx={{ width: '10rem' }}>카테고리</TableCell>
                                    <TableCell align="center" sx={{ width: '30rem' }}>상품명</TableCell>
                                    <TableCell align="center" sx={{ width: '10rem' }}>가격</TableCell>
                                    <TableCell align="center" sx={{ width: '10rem' }}>공개여부</TableCell>
                                    <TableCell align="center" sx={{ width: "15rem" }}>상품 수정/삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {product.map((item, index) => (
                                    <TableRow key={item.no}>
                                        <TableCell align="center" sx={{ width: '8rem' }}>{index + 1}</TableCell>
                                        <TableCell align="center" sx={{ width: '10rem' }}>{item.category}</TableCell>
                                        <TableCell align="center" sx={{ width: '30rem' }}>{item.name}</TableCell>
                                        <TableCell align="center" sx={{ width: '10rem' }}>{item.price}</TableCell>
                                        <TableCell align="center" sx={{ width: '10rem' }}>{item.releaseStatus}</TableCell>
                                        <TableCell align="center" sx={{ width: "10rem" }} >
                                            <Button variant="contained" sx={{marginRight:'10px'}}>수정</Button>
                                            <Button variant="outlined">삭제</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pages>1 2 3 4 5 6</Pages>
                </Content>
            </Container>
        </>
    );


}
export default ProductList;

const Container = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 25%;
  height: 70vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideBarTitle = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
`;

const Title = styled(SideBarTitle)`
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

const Content = styled.div`
  width: 100%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
