import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Piechart from "../../components/chart/PieChart"; // Assuming these exist
import AdminHeader from "./components/AdminHeader";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AdminFooter from "./components/AdminFooter";
import { CgProfile } from "react-icons/cg";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaRegTrashAlt, FaUpload } from "react-icons/fa";
// import { GrContactInfo } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";
import Barchart from "../../components/chart/BarChart";
import CurrentUser from "./components/aCurrentUserList.jsx";
import {
  TotalVisitor,
  DailyVisitor,
  DailyOrder,
  DailyTotalPrice,
  DailyBoardCount,
  TotalPrice,
  TotalBoardCount,
  TotalOrder,
} from "../../service/DashBoard";
import { useEffect, useState } from "react";

export default function AdminDashBoard() {
  const [dailyVisitors, setDailyVisitors] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  const [dailtyOrders, setDailyorders] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  const [dailtyTotalPrice, setDailyTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [dailyBoardCount, setDailyBoardCount] = useState(0);
  const [totalBoardCount, setTotalBoardCount] = useState(0);

  // 일일 방문자 변수에 저장하는 함수
  const fetchDailyVisitors = async () => {
    try {
      const dailyVisitorCount = await DailyVisitor(); // TotalVisitor 호출
      return dailyVisitorCount; // 방문자 수 반환
    } catch (error) {
      console.error("Error fetching daily visitors:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  // 누적 방문자 변수에 저장하는 함수
  const fetchTotalVisitors = async () => {
    try {
      const totalVisitorCount = await TotalVisitor(); // TotalVisitor 호출
      return totalVisitorCount; // 총 방문자 수 반환
    } catch (error) {
      console.error("Error fetching total visitors:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  // 일일 주문수 저장하는 함수
  const fetchDailyOrder = async () => {
    try {
      const DailyOrderCount = await DailyOrder();
      return DailyOrderCount; // 총 주문 수량 반환
    } catch (error) {
      console.error("Error fetching Daily Order:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  // 누적 주문수 저장하는 함수
  const fetchTotalOrder = async () => {
    try {
      const aTotalOrder = await TotalOrder();
      return aTotalOrder; // 총 주문수 반환
    } catch (error) {
      console.error("Error fetching total TotalOrder:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  // 일일 수익 저장하는 함수
  const fetchDailyTotalPrice = async () => {
    try {
      const aDailyTotalPrice = await DailyTotalPrice();
      return aDailyTotalPrice; // 주문수 만환
    } catch (error) {
      console.error("Error fetching dailyTotalPrice:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  // 누적 수익 저장하는 함수
  const fetchTotalPrice = async () => {
    try {
      const aTotalPrice = await TotalPrice();
      return aTotalPrice; // 주문수 만환
    } catch (error) {
      console.error("Error fetching TotalPrice:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  // 일일 게시물 등록수 저장하는 함수
  const fetchDailyBoardCount = async () => {
    try {
      const aDailyBoardCount = await DailyBoardCount();
      return aDailyBoardCount; // 게시물 등록수 반환
    } catch (error) {
      console.error("Error fetching daily BoardCount:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  // 누적 게시물 등록수  저장하는 함수
  const fetchTotalBoardCount = async () => {
    try {
      const aTotalBoardCount = await TotalBoardCount();
      return aTotalBoardCount; // 주문수 만환
    } catch (error) {
      console.error("Error fetching TotalBoardCount:", error);
      return 0; // 에러 발생 시 기본값으로 0 반환
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
    const getDailyVisitors = async () => {
      const count = await fetchDailyVisitors(); // 일일 방문자 수 가져오기
      setDailyVisitors(count); // 상태 업데이트
    };

    const getTotalVisitors = async () => {
      const count = await fetchTotalVisitors(); // 총 방문자 수 가져오기
      setTotalVisitors(count); // 상태 업데이트
    };

    const getDailyOrders = async () => {
      const count = await fetchDailyOrder(); // 일일 주문 수 가져오기
      setDailyorders(count);
    };

    const getTotalOrder = async () => {
      const count = await fetchTotalOrder(); // 총 방문자 수 가져오기
      setTotalOrder(count); // 상태 업데이트
    };

    const getDailyTotalPrice = async () => {
      const count = await fetchDailyTotalPrice();
      const formattedPrice = new Intl.NumberFormat("ko-KR").format(count);
      setDailyTotalPrice(formattedPrice);
    };

    const getTotalPrice = async () => {
      const count = await fetchTotalPrice(); // 총 방문자 수 가져오기
      setTotalPrice(count); // 상태 업데이트
    };

    const getDailyBoardCount = async () => {
      const count = await fetchDailyBoardCount(); // 일일 게시글 등록수 가져오기
      setDailyBoardCount(count);
    };

    const getTotalBoardCount = async () => {
      const count = await fetchTotalBoardCount(); // 총  게시글 등록수 가져오기
      setTotalBoardCount(count); // 상태 업데이트
    };

    getDailyVisitors(); // 일일 방문자 수 함수 호출
    getTotalVisitors(); // 누적 방문자 수 함수 호출

    getDailyOrders(); // 일일 주문 수
    getTotalOrder(); // 누적 주문 수

    getDailyTotalPrice(); //일일 총 수입
    getTotalPrice(); // 누적 수입

    getDailyBoardCount(); // 일일 게시글 등록수
    getTotalBoardCount(); // 누적 게시글 수
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "850px" }}>
        <AdminHeader />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Grid container spacing={3}>
            {/* 일일 정보 카드 */}
            {[
              {
                title: "일일 접속자",
                value: dailyVisitors,
                icon: <CgProfile size={40} />,
              },
              {
                title: "일일 거래수",
                value: dailtyOrders,
                icon: <FaHandHoldingDollar size={40} />,
              },
              {
                title: "일일 수익",
                value: `${dailtyTotalPrice}원`,
                icon: <FaMoneyBillTrendUp size={40} />,
              },
              {
                title: "일일 게시물 등록 수",
                value: dailyBoardCount,
                icon: <FaUpload size={40} />,
              },
            ].map((data, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {data.title}
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {data.value}
                    </Typography>
                  </Box>
                  {data.icon}
                </Paper>
              </Grid>
            ))}

            {/* 차트 섹션 */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  카테고리별 거래 수 (막대그래프)
                </Typography>
                <Barchart />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  카테고리별 거래 수 (파이차트)
                </Typography>
                <Piechart /> {/* PieChart 컴포넌트 */}
              </Paper>
            </Grid>

            {/* 최근 가입 사용자 */}
            <Grid item xs={12} md={8}>
              <Box>
                <CurrentUser />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <TableContainer
                  component={Paper}
                  sx={{
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
                        <TableCell
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "60px",
                          }}
                        >
                          <FaInfoCircle
                            style={{ marginRight: "1rem" }}
                            size={25}
                          />
                          누적 데이터
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          borderTop: "2px solid rgba(0,0,0,0.3)",
                          borderBottom: "2px solid rgba(0,0,0,0.3)",
                        }}
                      >
                        <TableCell sx={{ height: "70px" }}>
                          누적 접속횟수
                        </TableCell>
                        <TableCell>{totalVisitors}</TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          borderTop: "2px solid rgba(0,0,0,0.3)",
                          borderBottom: "2px solid rgba(0,0,0,0.3)",
                        }}
                      >
                        <TableCell sx={{ height: "70px" }}>
                          누적 거래횟수
                        </TableCell>
                        <TableCell>{totalOrder}</TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          borderTop: "2px solid rgba(0,0,0,0.3)",
                          borderBottom: "2px solid rgba(0,0,0,0.3)",
                        }}
                      >
                        <TableCell sx={{ height: "70px" }}>누적 수익</TableCell>
                        <TableCell>{totalPrice}</TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          borderTop: "2px solid rgba(0,0,0,0.3)",
                          borderBottom: "2px solid rgba(0,0,0,0.3)",
                        }}
                      >
                        <TableCell sx={{ height: "70px" }}>
                          누적 게시물 수
                        </TableCell>
                        <TableCell>{totalBoardCount}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
