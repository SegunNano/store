import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDeliveredOrderMutation, useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from "../../redux/api/orderApiSlice";
import ProductTable from "../../components/ProductTable";

const Order = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    const [deliverOrder, { isLoading: loadingDelivered }] = useDeliveredOrderMutation();
    const [payOrder, { isLoading: loadingPayed }] = usePayOrderMutation();
    const { userInfo } = useSelector(state => state.auth);

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
    useEffect(() => {
        if (!(errorPayPal || loadingPayPal) && paypal.clientId) {
            const loadingPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        "client-id": paypal.clientId,
                        currency: 'USD'
                    },
                }),
                    paypalDispatch({
                        type: 'setLoadingStatus',
                        value: 'pending',
                    });
            };
            if (order && !order.isPaid && !window.paypal) loadingPayPalScript();
        }
    }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: order.totalPrice
                }
            }]
        })
            .then(orderID => {
                return orderID;
            });
    };
    function onApprove(data, actions) {
        return actions.order.capture()
            .then(async function (details) {
                try {
                    await payOrder({ orderId, details });
                    refetch();
                    toast.success("Order is succesfully Paid.");
                } catch (err) {
                    toast.error(err?.data?.message || err.message);
                }
            });
    }

    function onError(err) {
        toast.error(err.message);
    }

    const handleDeliver = async () => {
        await deliverOrder(orderId);
        refetch();
    };

    return (
        isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant='error'>{error.datamessage}</Message>
        ) : (
            <div className="container mx-auto mt-8">
                <ProductTable items={order.orderItems} />
                <div className="mt-5 w-full flex justify-between">
                    <ul className="w-[59%] flex flex-col">
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                            <h3 className="text-2xl">

                                Shipping
                            </h3>
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                            <strong> Order Id:</strong> {order._id}
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                            <strong> Name:</strong> {order.user.username}
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                            <strong> Email:</strong> {order.user.email}
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                            <strong> Address:</strong>{order.shippingAddress.address},{" "}
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.postalCode},{" "}
                            {order.shippingAddress.country}.
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                            <strong> Payment Method:</strong> {order.paymentMethod}
                        </li>
                        <li>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on: {order.paidAt}</Message>
                            ) : (
                                <Message variant='error'>Not paid</Message>
                            )}
                        </li>
                    </ul>
                    <ul className="w-[39%] flex flex-col">
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                            <h3 className="text-2xl">
                                Summary
                            </h3>
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white justify-between justify-between">
                            <strong> Items Price:</strong>
                            <span>${order.itemsPrice.toFixed(2)}</span>
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white justify-between">
                            <strong> Shipping Price:</strong>
                            <span>${order.shippingPrice.toFixed(2)}</span>
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white justify-between">
                            <strong> Tax Price:</strong>
                            <span>${order.taxPrice.toFixed(2)}</span>
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium odd:bg-pink-100 bg-white border border-pink-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:odd:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white justify-between">
                            <strong> Total Price:</strong>
                            <span>${order.totalPrice.toFixed(2)}</span>
                        </li>
                        <li className="mt-1 bg-pink-100 ">
                            {console.log(userInfo.username, order.user.username)}
                            {!order.isPaid && userInfo.username === order.user.username && (
                                <div>
                                    {loadingPayed && <Loader />}{" "}
                                    {isPending ? (
                                        < Loader />
                                    ) : (
                                        < div>
                                            <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}>
                                            </PayPalButtons>
                                        </div>
                                    )}
                                </div>
                            )}
                            {loadingDelivered && <Loader />}
                            {order.isPaid && userInfo.isAdmin && !order.isDelivered && (

                                < div >
                                    <button onClick={handleDeliver} type="button" className="w-full bg-pink-500 text-white py-4">Mark as delivered</button>
                                </div>
                            )}
                            {order.isDelivered && (
                                <Message variant='success'>Order delivered.</Message>
                            )}
                        </li>

                    </ul>
                </div>
            </div >

        )
    );
};

export default Order;
