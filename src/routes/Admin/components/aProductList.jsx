import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { listProducts, DeleteProduct } from "../../../service/ProductService";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    listProducts()
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (location.state?.refresh) {
      getAllProducts(); // AddProduct에서 상품 등록 후 이동 시 목록을 갱신합니다.
    }
  }, [location]);

  const goUpdate = (id) => {
    navigate(`/admin/updateproduct/${id}`);
  };

  const goAddProduct = () => {
    navigate(`/admin/addproduct`);
  };

  const removeProduct = async (id) => {
    try {
      await DeleteProduct(id);
      await getAllProducts();
      alert("상품이 삭제되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Title>상품 관리</Title>
      <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#EEC759" }}>
            <TableRow>
              <TableCell align="center" sx={{ width: "8rem" }}>
                번호
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                카테고리
              </TableCell>
              <TableCell align="center" sx={{ width: "30rem" }}>
                상품명
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                가격
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                공개여부
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                상품 수정/삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((item, index) => (
              <TableRow key={item.no}>
                <TableCell align="center" sx={{ width: "8rem" }}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" sx={{ width: "10rem" }}>
                  {item.category}
                </TableCell>
                <TableCell align="center" sx={{ width: "30rem" }}>
                  <Link to={`/shoppingDetail/${item.id}`} style={{ textDecoration: "none", textDecorationColor: "inherit", color: "inherit" }}>
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell align="center" sx={{ width: "10rem" }}>
                  {item.price}
                </TableCell>
                <TableCell align="center" sx={{ width: "10rem" }}>
                  {item.releaseStatus}
                </TableCell>
                <TableCell align="center" sx={{ width: "10rem" }}>
                  <Button variant="contained" onClick={() => goUpdate(item.id)} sx={{ marginRight: "10px" }}>
                    수정
                  </Button>
                  <Button variant="outlined" onClick={() => removeProduct(item.id)}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProductButton>
        <Button variant="contained" sx={{ marginTop: "25px" }} onClick={() => goAddProduct()}>
          상품 등록
        </Button>
      </AddProductButton>
      {/* <Pages>1 2 3 4 5 6</Pages> */}
    </>
  );
};
export default ProductList;

const Title = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

const AddProductButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;
