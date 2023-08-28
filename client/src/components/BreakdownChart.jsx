import React from "react";
import { Box, CircularProgress, useTheme, Typography } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  if (isLoading || !data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={isDashboard ? "90%" : "75vh"}
      >
        <CircularProgress />
      </Box>
    );
  }

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const capitalize = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  // Helper function to format number with suffix
  const formatNumberWithSuffix = (num, isDashboard) => {
    if (isDashboard) {
      const suffixes = ["", "K", "M", "B", "T"];
      const suffixNum = Math.floor(("" + num).length / 3);
      let shortValue = parseFloat(
        (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(2)
      );
      if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
      }
      return shortValue + suffixes[suffixNum];
    } else {
      // Add thousand delimiter
      return num.toLocaleString();
    }
  };

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: capitalize(category),
      value: sales,
      color: colors[i],
    })
  );

  const chartProps = {
    data: formattedData,
    theme: theme,
    colors: { datum: "data.color" },
    margin: isDashboard
      ? { top: 40, right: 80, bottom: 100, left: 50 }
      : { top: 40, right: 80, bottom: 80, left: 80 },
    sortByValue: true,
    innerRadius: 0.45,
    activeOuterRadiusOffset: 8,
    borderWidth: 1,
    borderColor: { from: "color", modifiers: [["darker", 0.2]] },
    arcLinkLabelsTextColor: theme.palette.secondary[200],
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: "color" },
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: { from: "color", modifiers: [["darker", 2]] },
    enableArcLinkLabels: !isDashboard, // Show arc link label lines only if it's not a dashboard
    legends: isDashboard // Show legends only if it's a dashboard
      ? [
          {
            anchor: "bottom",
            direction: "row",
            translateX: 20,
            translateY: 50,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]
      : undefined,
  };

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie {...chartProps} />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total: "} $
          {formatNumberWithSuffix(data.yearlySalesTotal, isDashboard)}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
