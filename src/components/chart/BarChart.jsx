import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { graphDailyOrder, graphDailyBoardCount, graphDailyTotalPrice } from "../../service/DashBoard";
import { Select, MenuItem, FormControl, InputLabel, Paper, Grid, Box } from "@mui/material";

const Barchart = () => {
  const [data, setData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [totalPriceData, setTotalPriceData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("daily");
  const [dataType, setDataType] = useState("orders"); // 기본값은 'orders'로 설정
  const revenueDates = getDatesForRevenue();

  const fetchDailyOrders = async (dates) => {
    const dailyOrders = await graphDailyOrder(dates);
    console.log(dailyOrders);
    const formattedData = dailyOrders.map((order) => ({
      date: order.date,
      count: order.count,
    }));
    const reversedData = formattedData.reverse();
    setData("orders", reversedData);
  };

  const fetchDailyBoardCount = async (dates) => {
    const dailyBoardCounts = await graphDailyBoardCount(dates);
    console.log(dailyBoardCounts);
    const formattedData = dailyBoardCounts.map((board) => ({
      date: board.date,
      count: board.count,
    }));
    const reversedData = formattedData.reverse();
    setBoardData("Board", reversedData);
  };

  const fetchDailyTotalPrice = async (dates) => {
    const dailyTotalPrices = await graphDailyTotalPrice(dates);
    console.log("Price", dailyTotalPrices);
    const formattedData = dailyTotalPrices.map((price) => ({
      date: price.date,
      totalPrice: price.totalPrice,
    }));
    console.log(formattedData);
    const reversedData = formattedData.reverse();
    setTotalPriceData(reversedData);
  };

  useEffect(() => {
    // 선택된 날짜 범주에 따라 데이터 가져오기
    const fetchData = async () => {
      if (timeFrame === "daily") {
        await fetchDailyOrders(revenueDates.dailyDates);
        await fetchDailyBoardCount(revenueDates.dailyDates);
        await fetchDailyTotalPrice(revenueDates.dailyDates);
      } else if (timeFrame === "weekly") {
        await fetchDailyOrders(revenueDates.weeklyDates);
        await fetchDailyBoardCount(revenueDates.weeklyDates);
        await fetchDailyTotalPrice(revenueDates.weeklyDates);
      } else if (timeFrame === "twoWeekly") {
        await fetchDailyOrders(revenueDates.twoWeeklyDates);
        await fetchDailyBoardCount(revenueDates.twoWeeklyDates);
        await fetchDailyTotalPrice(revenueDates.twoWeeklyDates);
      } else if (timeFrame === "monthly") {
        await fetchDailyOrders(revenueDates.monthlyDates);
        await fetchDailyBoardCount(revenueDates.monthlyDates);
        await fetchDailyTotalPrice(revenueDates.monthlyDates);
      }
    };

    fetchData();
  }, [timeFrame]); // timeFrame이 변경될 때마다 실행

  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "600px",
        }}
      >
        <Box>
          <FormControl variant="outlined" sx={{ marginBottom: 2, marginRight: 2, width: "10rem" }}>
            <InputLabel id="time-frame-label">시간 범위 선택</InputLabel>
            <Select labelId="time-frame-label" value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} label="시간 범위 선택">
              <MenuItem value="daily">일별</MenuItem>
              <MenuItem value="weekly">주별</MenuItem>
              <MenuItem value="twoWeekly">2주별</MenuItem>
              <MenuItem value="monthly">월별</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ marginBottom: 2, width: "10rem" }}>
            <InputLabel id="data-type-label">데이터 유형 선택</InputLabel>
            <Select labelId="data-type-label" value={dataType} onChange={(e) => setDataType(e.target.value)} label="데이터 유형 선택">
              <MenuItem value="orders">주문 수</MenuItem>
              <MenuItem value="boardCount">게시글 등록 수</MenuItem>
              <MenuItem value="totalPrice">총 수익</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div style={{ width: "100%", height: "100%", marginTop: "20px" }}>
          <ResponsiveBar
            data={dataType === "orders" ? data : dataType === "boardCount" ? boardData : totalPriceData}
            keys={dataType === "totalPrice" ? ["totalPrice"] : ["count"]}
            indexBy="date"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={["#EEC759"]}
            colorBy="id"
            theme={{
              labels: {
                text: {
                  fontSize: 14,
                  fill: "#000000",
                },
              },
              legends: {
                text: {
                  fontSize: 12,
                  fill: "#000000",
                },
              },
              axis: {
                legend: {
                  text: {
                    fontSize: 15,
                    fill: "#000000",
                  },
                },
                ticks: {
                  text: {
                    fontSize: 16,
                    fill: "#000000",
                  },
                },
              },
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "날짜",
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: dataType === "totalPrice" ? "총 수익" : "등록 수",
              legendPosition: "middle",
              legendOffset: -50,
            }}
            labelSkipWidth={36}
            labelSkipHeight={12}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </Paper>
    </Grid>
  );
};

const getDatesForRevenue = (numDays = 5) => {
  const today = new Date();

  const dailyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dailyDates.push(getCurrentDate(date));
  }

  const weeklyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 7);
    weeklyDates.push(getCurrentDate(date));
  }

  const twoWeeklyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 14);
    twoWeeklyDates.push(getCurrentDate(date));
  }

  const monthlyDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    monthlyDates.push(getCurrentDate(date));
  }

  return {
    dailyDates,
    weeklyDates,
    twoWeeklyDates,
    monthlyDates,
  };
};

const getCurrentDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default Barchart;
