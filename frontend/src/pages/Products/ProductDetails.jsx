import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useReadProductQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import HeartIcon from "./HeartIcon";



const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [qty, SetQty] = useState(1);
    const [rating, SetRating] = useState(0);
    const [comment, SetComment] = useState('');

    const { data: product, isLoading, isError, error, refetch } = useReadProductQuery(productId);
    // console.log(useReadProductQuery(productId).error);
    const { userInfo } = useSelector(state => state.auth);
    const [useCreateReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();


    return (
        <>
            <div>
                <Link to='/' className="font-semibold hover:underline ml-[10rem]">Go Back</Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message varaint='danger'>{error?.data?.error || error.message}</Message>
            ) : (
                <>
                    <div className="flex flex-wrap relative items-between mt-[2rem ] ml-[10rem]">
                        <div className="">
                            <img src={product.image} alt={product.name} className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-{2rem]" />

                            <HeartIcon product={product} />
                        </div>
                        <div className="flex flex-col justify-between">
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#555]">{product.description}</p>
                            <p className=" text-5xl my-4 font-extrabold">${product.price}</p>
                            <div className="flex items-center justifybetween w-20[rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6">
                                        <FaStore className="mr-2" /> Brand: {product.brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaClock className="mr-2" /> Added: {moment(product.CreatedAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaStar className="mr-2" /> Reviews: {product.numReviews}
                                    </h1>
                                </div>
                                <div className="two">
                                    <h1 className="flex items-center mb-6">
                                        <FaStore className="mr-2" /> Ratings: {rating}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaStore className="mr-2" /> Quantity: {product.quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaStore className="mr-2" /> In Stock: {product.countInStock}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-between">
                                {/* Ratings */}
                            </div>

                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;
