import React from "react";
import { Box, useTheme, CircularProgress } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api/mongoDBApi";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux/es/hooks/useSelector";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueFormatter: (params) => {
        const createdAt = new Date(params.value);
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        };
        const formattedDate = createdAt.toLocaleString(undefined, options);
        const [date, time] = formattedDate.split(", ");
        const [month, day, year] = date.split("/");
        return `${year}/${month}/${day} ${time}`;
      },
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      valueGetter: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      valueFormatter: (params) =>
        `$ ${Number(params.value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="75vh"
          >
            <CircularProgress />
          </Box>
        </Box>
      ) : (
        <Box
          mt="40px"
          height="75vh"
          gap="0.25rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.sales) || []}
            columns={columns}
            components={{
              ColumnMenu: CustomColumnMenu,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Performance;
