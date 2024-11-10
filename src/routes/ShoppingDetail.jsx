import styled from "styled-components";
import { Button, Box } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCart, getProductByProductId, listCart } from "../service/ProductService";
import Swal from "sweetalert2";
import { AverageStar, getReviewByProductId } from "../service/Review";
import { PiStarFill, PiStarLight } from "react-icons/pi";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ShoppingDetail = () => {
  const [value, setValue] = React.useState(0);
  const navigator = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { id } = useParams(); //url에서 id 파라미터 가져온다.
  const [product, setProduct] = useState(null);
  const [files, setFiles] = useState(null);
  const [cart, setCart] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [averageStar, setAverageStar] = useState("0");
  const [data, setData] = useState({
    userNo: localStorage.getItem("no"),
    productId: id,
    quantity: 1,
  });

  const [reviews, setReviews] = useState([]);

  const addCartItem = () => {
    let cartExist = false;
    if (data.quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "수량이 0 입니다.",
        confirmButtonColor: "#527853",
      });
      return;
    }
    cart.forEach((i) => (i.productId == id ? (cartExist = true) : null));
    if (cartExist || disabled) {
      Swal.fire({
        icon: "warning",
        title: "해당 상품이 이미 장바구니에 있습니다.",
        width: "40%",
        confirmButtonColor: "#527853",
      });
    } else {
      addCart(data);
      setDisabled(true);
      Swal.fire({
        icon: "info",
        title: "장바구니로 이동하시겠습니까?.",

        showCancelButton: true,
        confirmButtonColor: "#527853",
        cancelButtonColor: "#d33",
        confirmButtonText: "장바구니로 이동",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          navigator("/cart");
        }
      });
    }
  };

  const navigatePayment = () => {
    const checkedData = [
      {
        ...product,
        quantity: data.quantity,
      },
    ];
    navigator("/payment", {
      state: { checkedData, totalPrice: product.price * data.quantity },
    });
  };

  const loadCart = async () => {
    const response = await listCart(data.userNo);
    setCart(response);
  };

  const handleQuantity = (event) => {
    const obj = data;
    console.log(event.target.value);

    if (event.target.value === "0") {
      data.quantity = 1;
    } else if (event.target.value.length > 2) {
      data.quantity = +event.target.value.slice(0, 2);
    } else {
      data.quantity = event.target.value;
    }

    setData({ ...obj });
  };

  const minus = () => {
    const obj = data;
    if (obj.quantity <= 1) {
      alert("최소 수량입니다.");
    } else {
      obj.quantity--;
      setData({ ...obj });
    }
  };

  const plus = () => {
    const obj = data;
    if (obj.quantity >= 99) {
      alert("최대 수량입니다.");
    } else {
      obj.quantity++;
      setData({ ...obj });
    }
  };

  useEffect(() => {
    if (id) {
      getProductByProductId(id)
        .then((response) => {
          console.log("response 정보 : ", response);
          setProduct(response);
        })
        .catch((error) => {
          console.log("에러발생 : ", error);
        });
    }
    loadCart();

    const fetchReviews = async () => {
      try {
        const data = await getReviewByProductId(id);
        setReviews(data); // 데이터를 상태로 저장
        console.log("리뷰 정보 : ", data);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchReviews();
  }, [id]);

  // 별점 평균을 구하는 함수
  const fetchAverageStar = async () => {
    try {
      const aAverageStar = await AverageStar(data.productId);
      console.log(aAverageStar);
      return aAverageStar; //별점 평균 반환
    } catch (error) {
      console.error("Error fetching AverageStar:", error);
      return 0.0; // 에러 발생 시 기본값으로 0.0 반환
    }
  };

  useEffect(() => {
    const getAverageStar = async () => {
      const count = await fetchAverageStar(); // 별점 평균 가져오기
      setAverageStar(count); // 상태 업데이트
    };

    getAverageStar(); // 별점 평균
  }, []);

  console.log(averageStar.data);

  // 채워진 별 개수
  const fullStars = Math.floor(averageStar.data);
  // 빈 별 개수
  const emptyStars = 5 - fullStars;

  // 만약 소수점이 있다면 반쪽 별 추가
  const halfStar = averageStar.data % 1 >= 0.5 ? 1 : 0;

  return (
    <>
      <Container>
        <Button variant="outlined" onClick={() => navigator(-1)} sx={{ alignSelf: "start", marginLeft: "10rem", marginBottom: "5rem" }}>
          뒤로가기
        </Button>
        {product ? (
          <div style={{ display: "flex" }}>
            <ImgArea className="imgArea">
              <ProductImage
                src={`http://localhost:8081${product.productFileDTO?.find((file) => file.productFileTypeId === 1)?.imagePath}`}
              ></ProductImage>
            </ImgArea>
            <ContentArea className="contentArea">
              <div className="productName" style={{ marginBottom: "40px" }}>
                <h4 style={{ fontFamily: "NanumSquareRound", fontSize: "2rem", fontWeight: "bold" }}>{product.name}</h4>
              </div>
              <div style={{ fontFamily: "NanumSquareRound", marginBottom: "20px" }}>
                <h5 style={{ fontWeight: "bold" }}>{(product.price * data.quantity).toLocaleString()}원</h5>
              </div>
              <Box sx={{ display: "flex", alignItems: "center", color: "#eec759" }}>
                {/* 채워진 별 */}
                {[...Array(fullStars)].map((_, i) => (
                  <PiStarFill className="star-lg" key={`full-${i}`} />
                ))}
                {/* 반쪽 별 (있을 경우) */}
                {halfStar > 0 && <PiStarFill className="star-lg half" />}
                {/* 빈 별 */}
                {[...Array(emptyStars)].map((_, i) => (
                  <PiStarLight className="star-lg" key={`empty-${i}`} />
                ))}
                <Box sx={{ marginLeft: "8px", alignItems: "center", color: "black" }}>{averageStar.data}</Box>
              </Box>

              <quantityIcon className="quantityIcon">
                <Box display="flex" alignItems="center" sx={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Button variant="outlined" sx={{ minWidth: "30px", padding: 0, height: "30px", borderRadius: 0 }} onClick={minus}>
                    -
                  </Button>
                  <Input type="number" id={product.id} onChange={handleQuantity} value={data.quantity} />
                  <Button
                    variant="outlined"
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
                </Box>
              </quantityIcon>
              <div className="orderArea">
                <Button sx={{ fontFamily: "NanumSquareRound", marginRight: "10px", width: "150px" }} variant="outlined" onClick={addCartItem}>
                  장바구니에 담기
                </Button>
                <Button sx={{ fontFamily: "NanumSquareRound", width: "150px" }} variant="contained" onClick={navigatePayment}>
                  바로 구매하기
                </Button>
              </div>
            </ContentArea>
          </div>
        ) : (
          <p>오류입니다.</p>
        )}
      </Container>
      <DetailArea style={{ marginTop: "50px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="상품 설명" {...a11yProps(0)} />
              <Tab label="리뷰" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            상품 설명 상세내용
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Review key={index}>
                    <div>
                      {review.reviewImg.length > 0
                        ? review.reviewImg.map((item, index) => (
                            <ReviewImg
                              key={index}
                              src={
                                item?.reviewImgPath // 이미지 배열이 존재하고 길이가 0보다 큰 경우
                                  ? `http://localhost:8081${item.reviewImgPath}${item.reviewImgRename}`
                                  : null // 이미지가 없으면 null
                              }
                              alt={item.reviewImg && item.reviewImg.length > 0 ? item.reviewImgOriginName : "이미지가 없습니다."}
                            />
                          ))
                        : null}
                    </div>
                    <p>별점: {review.reviewStar}</p>
                    <h4>유저 이름: {review.username}</h4>
                    <p>작성시간: {review.reviewDate}</p>
                    <p>내용: {review.reviewContent}</p>
                  </Review>
                ))
              ) : (
                <p>리뷰가 없습니다.</p>
              )}
            </div>
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
  margin-left: 10rem;
  border: 3px solid #eec759;
  border-radius: 20px;
  padding: 3rem;
`;

const ImgArea = styled.div``;

const ProductImage = styled.img`
  width: 400px;
`;

const DetailArea = styled.div``;

const Input = styled.input`
  width: 3rem;
  text-align: center;
`;

const Review = styled.div`
  border: 1px solid black;
  padding: 2rem 5rem;
  width: 1000px;
`;

const ReviewImg = styled.img`
  width: 200px;
  height: 200px;
`;
