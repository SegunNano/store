import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: order => ({
                url: ORDERS_URL,
                body: order,
                method: "POST"
            })
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: ORDERS_URL
            })
        }),

        getOrderDetails: builder.query({
            query: id => ({
                url: `${ORDERS_URL}/${id}`
            })
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details
            })
        }),

        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            })
        }),

        getMyOrder: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/my-orders`
            }),
            keepUnusedDataFor: 5
        }),

        deliveredOrder: builder.mutation({
            query: orderId => ({
                url: `${ORDERS_URL}/${orderId}/delivered`,
                method: 'PUT'
            })
        }),

        getTotalOrders: builder.query({
            query: () => `${ORDERS_URL}/total-orders`
        }),

        getTotalSales: builder.query({
            query: () => `${ORDERS_URL}/total-sales`
        }),

        getTotalSalesByDate: builder.query({
            query: () => `${ORDERS_URL}/total-sales-by-date`
        })
    })
});


export const { useCreateOrderMutation, useGetOrderDetailsQuery, useDeliveredOrderMutation, useGetMyOrderQuery, useGetPaypalClientIdQuery, useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery, useGetAllOrdersQuery, usePayOrderMutation } = orderApiSlice;