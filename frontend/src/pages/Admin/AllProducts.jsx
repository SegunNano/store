import { Link } from "react-router-dom";
import moment from "moment";
import { useFetchAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {

    const { data: products, isLoading, isError } = useFetchAllProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="">Error loading products</div>
        );
    }

    return (
        <div className="container mx-[9rem]">

            <div className="flex flex-col md:flex-row">
                <div className="p-3">
                    <div className="text-xl font-bold h-12 ml-[2rem]">
                        All Products ({products.length})
                    </div>

                    <div className="flex flex-wrap justify-around items-center">
                        {products.map(product => (
                            <Link key={product._id} to={`/admin/product/update/${product._id}`} className="block mb-4 overflow-hidden">
                                <div className="flex">
                                    <img src={product.image} alt={product.name} className="w-[10rem] object-cover" />

                                    <div className="p-4 flex flex-col justify-around">
                                        <div className="flex justify-between">
                                            <h5 className="text-xl font-semibold mb-2">{product?.name}</h5>

                                            <p className="text-gray-400 text-sm">
                                                {moment(product.CreateAt).format("MMMM Do YYYY")}
                                            </p>
                                        </div>

                                        <p className="text-gray-400 xl:w-[30rem] md:w-[20rem]sm:w-[10rem] text-sm md-4">
                                            {product?.description?.substring(0, 160)}...
                                        </p>

                                        <div className="flex justify-between">
                                            <Link to={`/admin/product/update/${product._id}`} className="inline-flex px-3 py-2 text-sm font-medium items-center text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-6oo dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                                                Update Product
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3.5 ml-2 size-5">
                                                    <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                                </svg>


                                            </Link>
                                            <p>${product?.price}</p>
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>

                <div className="md:w-1/4 p-3 mt-2">
                    <AdminMenu />
                </div>

            </div>

        </div>
    );
};

export default AllProducts;
