import React, { useEffect, useState } from "react";
import { Box, useTheme, CircularProgress } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PhoneNumber from "libphonenumber-js";

const getCountryName = async (countryCode) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v2/alpha/${countryCode}`
    );
    const { name } = response.data;
    return name;
  } catch (error) {
    console.error("Failed to fetch country name:", error);
    return countryCode; // Fallback to country code if an error occurs
  }
};

const formatPhoneNumber = (phoneNumber, countryCode) => {
  try {
    const phoneNumberInstance = new PhoneNumber(phoneNumber, countryCode);
    return phoneNumberInstance.formatInternational();
  } catch (error) {
    console.error("Failed to format phone number:", error);
    return phoneNumber;
  }
};

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const fetchCountryNames = async () => {
      if (data) {
        const updatedData = await Promise.all(
          data.map(async (customer) => {
            const countryName = await getCountryName(customer.country);
            const formattedPhoneNumber = formatPhoneNumber(
              customer.phoneNumber,
              customer.country
            );
            return {
              id: customer._id,
              name: customer.name,
              email: customer.email,
              phoneNumber: formattedPhoneNumber,
              country: countryName,
              occupation: customer.occupation,
              role: customer.role,
            };
          })
        );
        setFormattedData(updatedData);
      }
    };

    fetchCountryNames();
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers." />
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
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
            rows={formattedData}
            columns={[
              { field: "id", headerName: "ID", flex: 1 },
              { field: "name", headerName: "Name", flex: 0.5 },
              { field: "email", headerName: "Email", flex: 1 },
              { field: "phoneNumber", headerName: "Phone Number", flex: 0.5 },
              { field: "country", headerName: "Country", flex: 1 },
              { field: "occupation", headerName: "Occupation", flex: 1 },
              { field: "role", headerName: "Role", flex: 0.5 },
            ]}
          />
        </Box>
      )}
    </Box>
  );
};

export default Customers;
