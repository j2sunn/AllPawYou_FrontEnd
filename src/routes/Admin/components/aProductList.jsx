import { useEffect, useState } from "react";
import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { listProducts, DeleteProduct } from "../../../service/ProductService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import Pagination from "react-js-pagination";

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
        console.log(response.data);
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   if (location.state?.refresh) {
  //     getAllProducts(); // AddProduct에서 상품 등록 후 이동 시 목록을 갱신합니다.
  //   }
  // }, [location]);

  const goUpdate = (id) => {
    navigate(`/admin/updateproduct/${id}`);
  };

  const goAddProduct = () => {
    navigate(`/admin/addproduct`);
  };

  const removeProduct = async (id) => {
    try {
      if (confirm("상품을 삭제 하시겠습니까?")) {
        await DeleteProduct(id);
        await getAllProducts();
        alert("상품이 삭제되었습니다.");
        Swal.fire({
          title: "상품이 삭제되었습니다.",
          icon: 'success',

          confirmButtonColor: '#527853',
          confirmButtonText: '닫기',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(location.state?.cp || 1); // 현재 페이지쪽수 초기값
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);
  // 현재 페이지에 해당하는 게시글 슬라이싱
  const currentList = product.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>

      <Title>상품 관리</Title>
      <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem", marginLeft: '3rem', boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{borderTop: '2px solid rgba(0,0,0,0.8)', borderBottom: '2px solid rgba(0,0,0,0.8)'}}>
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
            {currentList.length > 0 ? (
              currentList.map((item, index) => (
                // {product.map((item, index) => (
                <TableRow key={item.no}>
                  <TableCell align="center" sx={{ width: "8rem" }}>
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
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
                    {item.price.toLocaleString()}
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
              ))
            ) : (
              <div>게시글 로딩중입니다.</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProductButton>
        <Button variant="contained" sx={{ marginTop: "25px" }} onClick={() => goAddProduct()}>
          상품 등록
        </Button>
      </AddProductButton>

      <PaginationContainer>
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>이전</Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'selected' : ''}>{i + 1}
          </Button>
        ))}
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>다음</Button>
      </PaginationContainer>

    </>
  );
};
export default ProductList;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
`;

const AddProductButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  button.selected {
    font-weight: bold;
    background-color: #527853;
    color: white;
  }
`;