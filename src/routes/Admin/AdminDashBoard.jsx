import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Piechart from "../../components/chart/PieChart"; // Assuming these exist
import AdminHeader from "./components/AdminHeader";
import { Grid, Paper } from "@mui/material";
import AdminFooter from "./components/AdminFooter";
import { CgProfile } from "react-icons/cg";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";
import Barchart from "../../components/chart/BarChart";
import { TotalVisitor, DailyVisitor, DailyOrder, DailyTotalPrice, DailyBoardCount, TotalPrice } from "../../service/DashBoard";
import { useEffect, useState } from "react";

export default function PermanentDrawerLeft() {
  const [dailyVisitors, setDailyVisitors] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  const [dailtyOrders, setDailyorders] = useState(0);
  const [dailtyTotalPrice, setDailyTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dailyBoardCount, setDailyBoardCount] = useState(0);

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

  // 전체 방문자 변수에 저장하는 함수
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

  useEffect(() => {
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
      const count = await fetchDailyBoardCount();
      setDailyBoardCount(count);
    };

    getDailyVisitors(); // 일일 방문자 수 함수 호출
    getTotalVisitors(); // 누적 방문자 수 함수 호출
    getDailyOrders(); // 일일 주문 수
    getDailyTotalPrice(); //일일 총 수입
    getTotalPrice(); // 누적 수입
    getDailyBoardCount(); // 일일 게시글 등록수
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "850px" }}>
        <AdminHeader />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Grid container spacing={3}>
            {/* 일일 정보 카드 */}
            {[
              { title: "일일 접속자", value: dailyVisitors, icon: <CgProfile size={40} /> },
              { title: "일일 거래수", value: dailtyOrders, icon: <FaHandHoldingDollar size={40} /> },
              { title: "일일 수익", value: `${dailtyTotalPrice}원`, icon: <FaMoneyBillTrendUp size={40} /> },
              { title: "일일 게시물 등록 수", value: dailyBoardCount, icon: <FaUpload size={40} /> },
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
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  <GrContactInfo size={30} />
                  최근 가입 사용자
                </Typography>
                {/* You can replace this with the actual list of users */}
                <Box>
                  <Typography variant="body1">User 1</Typography>
                  <Typography variant="body1">User 2</Typography>
                  <Typography variant="body1">User 3</Typography>
                  <Typography variant="body1">User 4</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  <FaInfoCircle />
                  누계 정보
                </Typography>
                {/* You can replace this with the actual list of users */}
                <Box>
                  <Typography variant="body1">누적 접속횟수 :: {totalVisitors}</Typography>
                  <Typography variant="body1">누적 거래횟수</Typography>
                  <Typography variant="body1">누적 수익 :: {totalPrice}</Typography>
                  <Typography variant="body1">누적 게시물 수</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
