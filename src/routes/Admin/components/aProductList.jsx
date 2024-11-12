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
    // 삭제 확인 알림 표시
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 시 돌이킬 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#527853",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    });

    // 사용자가 삭제를 확인한 경우
    if (result.isConfirmed) {
      try {
        // 상품 삭제
        await DeleteProduct(id);
        // 삭제 성공 시 알림 표시
        await Swal.fire({
          icon: "success",
          title: "삭제 성공",
          text: "상품이 성공적으로 삭제되었습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
        // 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error("상품 삭제 실패:", error);
        // 오류 발생 시 알림 표시
        await Swal.fire({
          icon: "error",
          title: "삭제 실패",
          text: "삭제 중 오류가 발생했습니다. 다시 시도해 주세요.",
          confirmButtonColor: "#d33",
          confirmButtonText: "닫기",
        });
      }
    }
  };

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(location.state?.cp || 1); // 현재 페이지쪽수 초기값
  const ITEMS_PER_PAGE = 10;
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentList = product.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);
  // 현재 페이지에 해당하는 게시글 슬라이싱
  // const currentList = product.slice(
  //   (currentPage - 1) * PerPage,
  //   currentPage * PerPage
  // );
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Title>상품 관리</Title>
      <TableContainer
        component={Paper}
        sx={{
          width: "90%",
          marginTop: "3rem",
          marginLeft: "3rem",
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderTop: "2px solid rgba(0,0,0,0.8)",
                borderBottom: "2px solid rgba(0,0,0,0.8)",
              }}
            >
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
                    <Link
                      to={`/shoppingDetail/${item.id}`}
                      style={{
                        textDecoration: "none",
                        textDecorationColor: "inherit",
                        color: "inherit",
                      }}
                    >
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

      <Pages>
        {totalPages > 1 && (
          <Pagination
            count={totalPages} // 총 페이지 수
            page={currentPage} // 현재 페이지
            onChange={handlePageChange} // 페이지 변경 핸들러
            siblingCount={2} // 현재 페이지 주변에 보이는 페이지 수
            boundaryCount={2} // 처음과 끝에 보이는 페이지 수
            color="primary"
          />
        )}
      </Pages>
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

const Pages = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
