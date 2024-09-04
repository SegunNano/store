import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import ProgressStepper from "../../components/ProgressStepper";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";




const PlaceOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) navigate('/shipping');
    }, [cart.payment, cart.shippingAddress.adress, navigate]);



    return (
        <>

            <div className="container mx-auto mt-8">
                <ProgressStepper step1 step2 step3 />
                {!cart.cartItems.length ? (
                    <Message>Your cart is empty</Message>
                ) : (


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-2 bg-gray-50 dark:bg-gray-800">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.cartItems.map((item, index) => (

                                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-2">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            <Link to={`/product/${item._id}`}>  {item.name}</Link>
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.qty}
                                        </td>
                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            ${(item.price * item.qty).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                )}
                <div className="mt-[3rem] flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70 w-full">
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
                                    <span className="font-semibold">Total Price:</span>
                                    ${cart.totalPrice}
                                </li>
                            </ul>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">
                                    <strong>Address:</strong>
                                </h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrder;
