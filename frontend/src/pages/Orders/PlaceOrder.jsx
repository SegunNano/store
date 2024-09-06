import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import ProgressStepper from "../../components/ProgressStepper";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import ProductTable from "../../components/ProductTable";




const PlaceOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    console.log(cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) navigate('/shipping');
    }, [cart.payment, cart.shippingAddress.adress, navigate]);


    const handlePlaceOrder = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                ...cart
            }).unwrap();
            toast.success('Order placed succesfully.');
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err);
        }
    };


    return (
        <>

            <div className="container mx-auto mt-8">
                <ProgressStepper step1 step2 step3 />
                {!cart.cartItems.length ? (
                    <Message>Your cart is empty</Message>
                ) : (
                    <ProductTable items={cart.cartItems} />
                )}
                <div className="mt-[3rem] flex flex-col bg-white border border-t-4 border-t-pink-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-pink-500 dark:shadow-neutral-700/70 w-full">
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Order Summary
                        </h3>
                        <div className="flex justify-between flex-wrap p-8">
                            <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-neutral-700">
                                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                                    <span className="font-semibold">Items Price:</span>
                                    ${cart.itemsPrice}
                                </li>
                                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                                    <span className="font-semibold">ShippingPrice:</span>
                                    ${cart.shippingPrice}
                                </li>
                                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                                    <span className="font-semibold">TaxPrice:</span>
                                    ${cart.taxPrice}
                                </li>
                                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                                    <strong>
                                        <span className="font-semibold">Total Price: </span>
                                        ${cart.totalPrice}
                                    </strong>
                                </li>
                            </ul>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">
                                    <strong>Address: </strong>
                                </h2>
                                <h2 className="text-2xl font-semibold mb-4">
                                    {cart.shippingAddress.address},{" "}
                                    {cart.shippingAddress.city},{" "}
                                    {cart.shippingAddress.postalCode},{" "}
                                    {cart.shippingAddress.country}.
                                </h2>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">
                                    <strong>Payment Method: </strong>
                                </h2>
                                <h2 className="text-2xl font-semibold mb-4">{cart.paymentMethod}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="mt-[2rem] w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:bg-pink-700 disabled:opacity-50 disabled:pointer-events-none" disabled={!cart.cartItems} onClick={handlePlaceOrder}>
                    Place Order
                </button>




            </div>
        </>
    );
};

export default PlaceOrder;
