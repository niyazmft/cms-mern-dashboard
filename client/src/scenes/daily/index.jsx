import React, { useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formatValue = (value) => {
  const suffixes = ["", "k", "m", "b", "t"];
  const tier = (Math.log10(value) / 3) | 0;
  if (tier === 0) return value;
  const suffix = suffixes[tier];
  const scale = 10 ** (tier * 3);
  const scaledValue = value / scale;
  return scaledValue.toFixed(2) + suffix;
};

const Daily = () => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    return thirtyDaysAgo;
  });

  const [endDate, setEndDate] = useState(new Date());

  const { data } = useGetSalesQuery();
  const theme = useTheme();

  if (!data) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="DAILY SALES" subtitle="Chart of Daily Sales" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  const { dailyData } = data;
  const formattedData = dailyData.reduce(
    (result, { date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-"));

        result.totalSalesLine.data.push({ x: splitDate, y: totalSales });
        result.totalUnitsLine.data.push({ x: splitDate, y: totalUnits });
      }
      return result;
    },
    {
      totalSalesLine: {
        id: "Sales",
        color: theme.palette.secondary.main,
        data: [],
      },
      totalUnitsLine: {
        id: "Units",
        color: theme.palette.secondary[600],
        data: [],
      },
    }
  );

  const handleDateSelection = (selectedRange) => {
    const today = new Date();
    switch (selectedRange) {
      case "last7days":
        setStartDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000));
        setEndDate(today);
        break;
      case "last30days":
        setStartDate(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000));
        setEndDate(today);
        break;
      case "last3months":
        setStartDate(new Date(today.getFullYear(), today.getMonth() - 3, 1));
        setEndDate(today);
        break;
      case "yeartodate":
        setStartDate(new Date(today.getFullYear(), 0, 1));
        setEndDate(today);
        break;
      default:
        // Do nothing for unknown cases
        break;
    }
  };

  // CustomInput component to style the DatePicker input
  const CustomInput = ({ value, onClick }) => (
    <button onClick={onClick}>{value}</button>
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of Daily Sales" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end" gap="2px">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom-end"
              customInput={<CustomInput />}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom-end"
              customInput={<CustomInput />}
            />
          </Box>
          <Box marginLeft={2}>
            <button onClick={() => handleDateSelection("last7days")}>
              Last 7 Days
            </button>
            <button onClick={() => handleDateSelection("last30days")}>
              Last 30 Days
            </button>
            <button onClick={() => handleDateSelection("last3months")}>
              Last 3 Months
            </button>
            <button onClick={() => handleDateSelection("yeartodate")}>
              Year to Date
            </button>
          </Box>
        </Box>
        <ResponsiveLine
          data={[formattedData.totalSalesLine, formattedData.totalUnitsLine]}
          theme={{
            axis: {
              domain: { line: { stroke: theme.palette.secondary[200] } },
              legend: { text: { fill: theme.palette.secondary[200] } },
              ticks: {
                line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
                text: { fill: theme.palette.secondary[200] },
              },
            },
            legends: { text: { fill: theme.palette.secondary[200] } },
            tooltip: { container: { color: theme.palette.primary.main } },
          }}
          colors={{ datum: "color" }}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat={(value) => formatValue(value)}
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: "Day",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 50,
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
      </Box>
    </Box>
  );
};

export default Daily;
