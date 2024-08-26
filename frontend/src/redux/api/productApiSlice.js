import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}`,
                params: { keyword }
            }),

            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),

        fetchProduct: builder.query({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, productId) => [
                { type: "Product", id: productId }
            ]
        }),


        fetchAllProducts: builder.query({
            query: () => `${PRODUCT_URL}/allproducts`
        }),


        readProduct: builder.query({
            query: productId => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),

        createProduct: builder.mutation({
            query: productData => ({
                url: `${PRODUCT_URL}`,
                method: `POST`,
                body: productData
            }),
            invalidatesTags: ['Product']
        }),

        uploadProductImage: builder.mutation({
            query: data => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            })
        }),


        updateProduct: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'PUT',
                body: formData
            }),
        }),

        deleteProduct: builder.mutation({
            query: productId => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'DELETE',
            }),
            providesTags: ['Product'],
        }),

        createReview: builder.mutation({
            query: data => ({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data
            })
        }),

        fetchTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,

        }),

        fetchNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,

        }),


    })
});



export const { useGetProductsQuery, useFetchProductQuery, useFetchAllProductsQuery, useReadProductQuery, useUploadProductImageMutation, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useCreateReviewMutation, useFetchTopProductsQuery, useFetchNewProductsQuery } = productApiSlice;