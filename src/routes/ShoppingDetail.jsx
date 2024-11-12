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
import { PiStarFill, PiStarHalfFill, PiStarLight } from "react-icons/pi";

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
  const [averageStar, setAverageStar] = useState({ data: 0 });
  const [data, setData] = useState({
    userNo: localStorage.getItem("no"),
    productId: id,
    quantity: 1,
  });

  const [productDetail, setProductDetail] = useState(false); //상품 설명 이미지 있는지

  const [reviews, setReviews] = useState([]);

  const addCartItem = () => {
    let cartExist = false;
    if (data.userNo == null) {
      Swal.fire({
        icon: "warning",
        title: "로그인이 필요합니다.",

        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
      return;
    }
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
        title: "장바구니로 이동하시겠습니까?",

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
    if (data.userNo == null) {
      Swal.fire({
        icon: "warning",
        title: "로그인이 필요합니다.",

        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
      return;
    }
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

          let detailImage = false;
          response.productFileDTO.forEach(i=>i.productFileTypeId == 2 ? detailImage = true : null);
          setProductDetail(detailImage);
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

  //별 그리기
  // 채워진 별 개수
  const totalStars = 5;
  const fullStars = +averageStar.data.toFixed(1);
  console.log(fullStars);
  // 만약 소수점이 있다면 반쪽 별 추가
  const halfStar = fullStars % 1 >= 0.5 ? 1 : 0;
  // 빈 별 개수
  const emptyStars = totalStars - Math.floor(fullStars) - halfStar;

  //상세 이미지 순서 출력
  const getSortedDetailImages = (productFileDTO) => {
    return productFileDTO
      ?.filter((file) => file.productFileTypeId === 2) // 상세 이미지만 필터링
      .sort((a, b) => a.imageOrder - b.imageOrder); // imageOrder 기준으로 정렬
  };

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
              <div className="productName" style={{ marginBottom: "40px", width: '300px', display: 'flex'}}>
                <h4 style={{ fontFamily: "NanumSquareRound", fontSize: "1.7rem", fontWeight: "bold", wordWrap: 'break-word', width: '300px' }}>{product.name}</h4>
              </div>
              <div style={{ fontFamily: "NanumSquareRound", marginBottom: "20px" }}>
                <h5 style={{ fontWeight: "bold" }} onClick={()=>console.log(product)}>{(product.price * data.quantity).toLocaleString()}원</h5>
              </div>
              <Box sx={{ display: "flex", alignItems: "center", color: "#eec759" }}>
                {/* 채워진 별 */}
                {[...Array(Math.floor(fullStars))]?.map((_, i) => (
                  <PiStarFill className="star-lg" key={`full-${i}`} />
                ))}
                {/* 반쪽 별 (있을 경우) */}
                {halfStar > 0 && <PiStarHalfFill className="star-lg half" />}
                {/* 빈 별 */}
                {[...Array(emptyStars)]?.map((_, i) => (
                  <PiStarLight className="star-lg" key={`empty-${i}`} />
                ))}
                <Box sx={{ marginLeft: "8px", alignItems: "center", color: "black" }}>{averageStar.data.toFixed(1)}</Box>
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
              <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
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
          <>
            <NoData>존재하지 않는 상품입니다.</NoData>
            <Button variant="contained" onClick={() => navigator(-1)} sx={{ fontSize: "1.5rem", marginTop: "2rem" }}>
              이전 페이지로 돌아가기
            </Button>
          </>
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
          {productDetail ? (
              <>
              {getSortedDetailImages(product.productFileDTO).map((file, index) => (
                <div key={index}>
                  <img src={`http://localhost:8081${file.imagePath}`} />
                </div>
              ))}
              </>
            ) : (
              <NoData>상품 설명 이미지가 없습니다.</NoData>
            )}
            </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
              {reviews?.length > 0 ? (
                reviews.map(
                  (review, index) =>
                    review.reviewVisible === "Y" ? ( // && 대신 ? 사용
                      <Review key={index}>
                        <div>
                          {review?.reviewImg?.length > 0
                            ? review?.reviewImg?.map((item, index) => (
                                <ReviewImg
                                  key={index}
                                  src={item?.reviewImgPath ? `http://localhost:8081${item.reviewImgPath}${item.reviewImgRename}` : null}
                                  alt={item.reviewImgOriginName || "이미지가 없습니다."}
                                />
                              ))
                            : null}
                        </div>
                        <div style={{color: "#eec759", fontSize: '1.2rem', marginTop: '1rem'}}>
                        {[...Array(review.reviewStar)]?.map((_, i) => (
                          <PiStarFill className="star-lg" key={`full-${i}`} />
                        ))}
                        {/* 빈 별 */}
                        {[...Array(5-review.reviewStar)]?.map((_, i) => (
                          <PiStarLight className="star-lg" key={`empty-${i}`} />
                        ))}
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', margin: '1rem 0'}}>
                          <div style={{fontSize: '1.2rem', marginRight: '1rem'}}>{review.username}</div>
                          <div>{review.reviewDate.slice(0,16)}</div>
                        </div>
                        <div>{review.reviewContent}</div>
                      </Review>
                    ) : null // reviewVisible이 "Y"가 아닌 경우 null 반환
                )
              ) : (
                <NoData>리뷰가 없습니다.</NoData>
              )}
          </CustomTabPanel>
        </Box>
      </DetailArea>
    </>
  );
};

export default ShoppingDetail;

const Container = styled.div`
  min-height: 450px;
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
  max-width: 400px;
  max-height: 600px;
`;

const DetailArea = styled.div``;

const Input = styled.input`
  width: 3rem;
  text-align: center;
`;

const Review = styled.div`
  border-top: 2px solid rgba(0,0,0,0.3);
  padding: 2rem 5rem;
  width: 1000px;
`;

const ReviewImg = styled.img`
  width: 150px;
  height: 150px;
`;

const NoData = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 3rem;
`;
