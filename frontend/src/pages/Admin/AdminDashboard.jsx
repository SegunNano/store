import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useGetUsersQuery } from '../../redux/api/usersApiSlice';
import { useGetTotalOrdersQuery, useGetTotalSalesQuery, useGetTotalSalesByDateQuery } from '../../redux/api/orderApiSlice';
import OrderList from './OrderList';
import AdminMenu from './AdminMenu';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
    const { data: sales, isLoading } = useGetTotalSalesQuery();
    const { data: customers, isLoading: loadingCustomer } = useGetUsersQuery();
    const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
    const { data: salesDetail } = useGetTotalSalesByDateQuery();


    const [state, setState] = useState({
        options: {
            chart: {
                type: "line",
            },
            tooltip: {
                theme: "liight",
            },
            colors: ["#00E396"],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "Sales Trend",
                align: "left",
            },
            grid: {
                borderColor: "#ccc",
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date",
                },
            },
            yaxis: {
                title: {
                    text: "Sales",
                },
                min: 0,
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
        series: [{ name: "Sales", data: [] }],
    });
    useEffect(() => {
        if (salesDetail) {
            const formattedSalesDate = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }));

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x),
                    },
                },

                series: [
                    { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
                ],
            }));
        }
    }, [salesDetail]);


    return (
        <>
            <AdminMenu />
            <section className="xl:ml-[20rem] md:ml-[0rem]">
                <div className="w-[80%]  flex justify-between flex-wrap">
                    <div class="bg-pink-50 sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-[30%] rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                        <h3 class="text-gray-800 text-lg font-semibold mt-4">Sales</h3>
                        <div class="flex items-center justify-between">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <p class="text-gray-600 text-left">${sales.totalSales.toFixed(2)}</p>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#232B2B] size-20 ml-6 rounded-full">
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                            </svg>

                        </div>
                    </div>
                    <div class="bg-pink-50 sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-[30%] rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                        <h3 class="text-gray-800 text-lg font-semibold mt-4">Customers</h3>
                        <div class="flex items-center justify-between">
                            {loadingCustomer ? (
                                <Loader />
                            ) : (
                                <p class="text-gray-600 text-left">{customers?.length}</p>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#232B2B] size-20 ml-6 rounded-full">
                                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                            </svg>

                        </div>
                    </div>
                    <div class="bg-pink-50 sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-[30%] rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                        <h3 class="text-gray-800 text-lg font-semibold mt-4">All Orders</h3>
                        <div class="flex items-center justify-between">
                            {loadingOrders ? (
                                <Loader />
                            ) : (
                                <p class="text-gray-600 text-left">{orders?.totalOrders}</p>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#232B2B] size-20 ml-6 rounded-full">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                            </svg>


                        </div>
                    </div>
                </div>
                <div className="px-auto ml-[10rem] mt-[4rem]">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="50%"
                    />
                </div>
                <div className="mt-[4rem]">
                    <OrderList />
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;
