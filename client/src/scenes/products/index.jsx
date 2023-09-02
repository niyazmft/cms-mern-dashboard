import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useTheme,
  Rating,
  Dialog,
  DialogContent,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProductsQuery } from "state/api";

const Products = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProductsQuery();
  const [formattedData, setFormattedData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (data) {
      const formattedProducts = data.map((product) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        rating: product.rating,
        category: product.category,
        supply: product.supply,
        stat: product.stat,
        imageUrl: product.imageUrl,
      }));
      setFormattedData(formattedProducts);
    }
  }, [data]);

  const secondaryMainColor = theme.palette.secondary.main;

  const renderRatingCell = (params) => (
    <Box display="flex" alignItems="center">
      <Rating value={params.value} readOnly />
    </Box>
  );

  const handleRowClick = (params) => {
    const selectedProductId = params.id;
    const selectedProductData = formattedData.find(
      (product) => product.id === selectedProductId
    );
    setSelectedProduct(selectedProductData);
    setEditDialogOpen(false);
    setUpdatedImages([]);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setEditDialogOpen(false);
    setUpdatedImages([]);
  };

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleAddNewImage = () => {
    setUpdatedImages([...updatedImages, newImageUrl]);
    setNewImageUrl("");
  };

  const handleSaveImages = () => {
    const updatedProduct = {
      ...selectedProduct,
      imageUrl: [...selectedProduct.imageUrl, ...updatedImages],
    };

    const updatedData = formattedData.map((product) =>
      product.id === selectedProduct.id ? updatedProduct : product
    );

    setFormattedData(updatedData);
    setSelectedProduct(updatedProduct);
    setEditDialogOpen(false);
    setUpdatedImages([]);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
        >
          <CircularProgress />
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
            rows={formattedData}
            columns={[
              { field: "id", headerName: "Model Code", flex: 0.75 },
              { field: "name", headerName: "Name", flex: 0.5 },
              {
                field: "category",
                headerName: "Category",
                flex: 0.5,
                valueFormatter: (params) =>
                  params.value.charAt(0).toUpperCase() + params.value.slice(1),
              },
              {
                field: "price",
                headerName: "Unit Price",
                flex: 0.5,
                valueFormatter: (params) =>
                  `$ ${Number(params.value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
              },
              {
                field: "supply",
                headerName: "Stock",
                flex: 0.4,
                valueFormatter: (params) =>
                  Number(params.value).toLocaleString(),
              },
              {
                field: "rating",
                headerName: "Rating",
                flex: 0.5,
                renderCell: renderRatingCell,
              },
            ]}
            onRowClick={handleRowClick}
          />
        </Box>
      )}
      <Dialog open={!!selectedProduct} onClose={handleCloseDialog}>
        <DialogContent sx={{ backgroundColor: "transparent", p: 0 }}>
          {selectedProduct && (
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
              }}
            >
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                    width: "360px",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={
                      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                    }
                    alt={selectedProduct.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ marginTop: 1.5 }}
                >
                  {selectedProduct.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color={theme.palette.secondary[700]}
                  gutterBottom
                >
                  {selectedProduct.category
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Typography>
                <Typography
                  sx={{ m: "0.5rem 0", fontSize: 15 }}
                  color={theme.palette.secondary[400]}
                >
                  {`$ ${Number(selectedProduct.price).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`}
                </Typography>
                <Rating value={selectedProduct.rating} readOnly />
                <Typography variant="body2">
                  <strong>Description:</strong> {selectedProduct.description}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ fontSize: 12 }}>
                  <strong>Model Code:</strong> {selectedProduct.id}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <strong>Available Stock:</strong>{" "}
                  {selectedProduct.supply.toLocaleString()}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <strong>Yearly Sales This Year:</strong>{" "}
                  {selectedProduct.stat.yearlySalesTotal}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <strong>Yearly Units Sold This Year:</strong>{" "}
                  {selectedProduct.stat.yearlyTotalSoldUnits}
                </Typography>
              </CardContent>

              <CardContent>
                {/* Allow adding new images */}
                {isEditDialogOpen && (
                  <div>
                    <TextField
                      label="New Image URL"
                      fullWidth
                      variant="outlined"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleAddNewImage}
                      sx={{ color: secondaryMainColor }}
                    >
                      Add New Image
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardActions>
                {isEditDialogOpen ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleSaveImages}
                      sx={{ color: secondaryMainColor }}
                    >
                      Save Images
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditDialogOpen(false)}
                      sx={{ color: secondaryMainColor }}
                    >
                      Close
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleOpenEditDialog}
                    startIcon={<EditIcon />}
                    sx={{ color: secondaryMainColor }}
                  >
                    Edit Images
                  </Button>
                )}
              </CardActions>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Products;
