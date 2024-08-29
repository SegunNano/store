import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useReadProductQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";


const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { data: product, isLoading, isError, error, refetch } = useReadProductQuery(productId);
    const { userInfo } = useSelector(state => state.auth);
    const [CreateReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (rating === 0) return toast.error('You must provide a rating!');

        try {
            await CreateReview({ productId, rating, comment }).unwrap();
            refetch();
            toast.success('Review created succesfully');
        } catch (error) {
            console.log(error);
            toast.error(error?.data || error.message);
        }
        setComment('');
    };


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
                                        <FaStar className="mr-2" /> Ratings: {rating}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaBox className="mr-2" /> In Stock: {product.countInStock}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-between">
                                <Ratings value={product.rating} text={` ${product.numReviews} reviews`} />


                                {product.countInStock > 0 && (
                                    <div className="">
                                        <select name="" value={qty} onChange={e => setQty(e.target.value)} id="" className="p-2 rounded-lg text-black">
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}> {x + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="btn-container">
                                <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0">Add to Cart</button>
                            </div>
                        </div>

                        <div className="container flex flex-wrap items-start justify-between mt-[5rem] ml-[10rem]">
                            < ProductTabs loadingProductReview={loadingProductReview} userInfo={userInfo} submitHandler={submitHandler} product={product} rating={rating} setRating={setRating} comment={comment} setComment={setComment} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;
