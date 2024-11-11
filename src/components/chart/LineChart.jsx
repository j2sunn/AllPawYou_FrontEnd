import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Box } from "@mui/material";
import { graphDailyOrder, graphDailyBoardCount, graphDailyTotalPrice } from "../../service/DashBoard";

const LineChart = () => {
  const [data, setData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [totalPriceData, setTotalPriceData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("daily");
  const [dataType, setDataType] = useState("orders");
  const revenueDates = getDatesForRevenue();

  const fetchDailyOrders = async (dates) => {
    const dailyOrders = await graphDailyOrder(dates);
    const formattedData = dailyOrders.map((order) => ({
      date: order.date,
      count: order.count,
    }));
    const reversedData = formattedData.reverse();
    setData(reversedData);
  };

  const fetchDailyBoardCount = async (dates) => {
    const dailyBoardCounts = await graphDailyBoardCount(dates);
    const formattedData = dailyBoardCounts.map((board) => ({
      date: board.date,
      count: board.count,
    }));
    const reversedData = formattedData.reverse();
    setBoardData(reversedData);
  };

  const fetchDailyTotalPrice = async (dates) => {
    const dailyTotalPrices = await graphDailyTotalPrice(dates);
    const formattedData = dailyTotalPrices.map((price) => ({
      date: price.date,
      totalPrice: price.totalPrice,
    }));
    const reversedData = formattedData.reverse();
    setTotalPriceData(reversedData);
  };

  useEffect(() => {
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
  }, [timeFrame]);

  // 라인 차트 데이터 변환
  const lineChartData = [
    {
      id: "주문 수",
      data: data.map((item) => ({ x: item.date, y: item.count })),
    },
    {
      id: "게시글 등록 수",
      data: boardData.map((item) => ({ x: item.date, y: item.count })),
    },
    {
      id: "총 수익",
      data: totalPriceData.map((item) => ({ x: item.date, y: item.totalPrice })),
    },
  ];

  return (
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

        <div style={{ width: "100%", height: "400px", marginTop: "20px" }}>
          {/* 라인 차트 추가 */}
          <ResponsiveLine
            data={lineChartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "날짜",
              legendOffset: 36,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "수치",
              legendOffset: -40,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
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

export default LineChart;
