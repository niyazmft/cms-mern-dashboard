import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiPostgreSQL = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_POSTGRESQL_BASE_URL,
    prepareHeaders: (headers) => {
      const apiKey = process.env.REACT_APP_API_KEY || 'super-secret-key';
      if (apiKey) {
        headers.set('x-api-key', apiKey);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "Products",
    "ProductById",
    "CreateProduct",
    "UpdateProduct",
    "DeleteProduct",
  ],
  endpoints: (build) => ({
    getProductsPg: build.query({
      query: () => "products/products",
      providesTags: ["Products"],
    }),
    getProductByIdPg: build.query({
      query: (id) => `products/products/${id}`,
      providesTags: (result, error, id) => [{ type: "ProductById", id }],
    }),
    createProductPg: build.mutation({
      query: (newProduct) => ({
        url: "products/products",
        method: "POST",
        body: newProduct,
        providesTags: ["CreateProduct"],
      }),
    }),
    updateProductPg: build.mutation({
      query: ({ id, ...updates }) => ({
        url: `products/products/${id}`,
        method: "PUT",
        body: updates,
        providesTags: ["UpdateProduct"],
      }),
    }),
    deleteProductPg: build.mutation({
      query: (id) => ({
        url: `products/products/${id}`,
        method: "DELETE",
        providesTags: ["DeleteProduct"],
      }),
    }),
  }),
});

export const {
  useGetProductsPgQuery,
  useGetProductByIdPgQuery,
  useCreateProductPgMutation,
  useUpdateProductPgMutation,
  useDeleteProductPgMutation,
} = apiPostgreSQL;
