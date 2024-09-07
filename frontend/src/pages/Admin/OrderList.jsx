import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";


const OrderList = () => {
    const { data: orders, isLoading, error } = useGetAllOrdersQuery();






    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold my-7">All Orders</h2>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error?.data?.message || error.error}</Message>
            ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-pink-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delivered
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={order.orderItems[0].image} alt={order.user} />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{order._id}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {order.user.username}
                                </td>
                                <td className="px-6 py-4">
                                    {order.createdAt.substring(0, 10)}
                                </td>
                                <td className="px-6 py-4">
                                    {order.totalPrice.toFixed(2)}
                                </td>
                                {order.isPaid ? (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Completed
                                        </div>
                                        <div className="font-normal text-gray-500">{order.paidAt.substring(0, 10)}</div>
                                    </td>
                                ) : (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Pending
                                        </div>
                                    </td>
                                )}
                                {order.isDelivered ? (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Completed
                                        </div>
                                        <div className="font-normal text-gray-500">{order.deliveredAt.substring(0, 10)}</div>
                                    </td>
                                ) : (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Pending
                                        </div>
                                    </td>
                                )}
                                <td className="px-6 py-4">
                                    <Link to={`/order/${order._id}`}>
                                        <button className="bg-pink-50  text-back p-3 rounded">View Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderList;
