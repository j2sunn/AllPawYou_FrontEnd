import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const Piechart = () => {
  const data = [
    { id: "사료", label: "사료", value: 40, color: "hsl(205, 70%, 50%)" },
    { id: "간식", label: "간식", value: 25, color: "hsl(85, 70%, 50%)" },
    { id: "용품", label: "용품", value: 15, color: "hsl(45, 70%, 50%)" },
    { id: "건강", label: "건강", value: 10, color: "hsl(15, 70%, 50%)" },
    { id: "의류", label: "의류", value: 10, color: "hsl(300, 70%, 50%)" },
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
            <Select labelId="time-frame-label" label="시간 범위 선택">
              <MenuItem value="daily">일별</MenuItem>
              <MenuItem value="weekly">주별</MenuItem>
              <MenuItem value="twoWeekly">2주별</MenuItem>
              <MenuItem value="monthly">월별</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div style={{ width: "100%", height: "400px", marginTop: "20px" }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "yellow_green_blue" }}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", "2"]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 60,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 15,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
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

export default Piechart;
