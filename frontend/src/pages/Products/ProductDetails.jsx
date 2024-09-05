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
import { set } from "mongoose";


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
        console.log(qty);
        if (qty > 0 && qty <= Number(product.countInStock)) {
            dispatch(addToCart({ ...product, qty }));
            navigate('/cart');
        } else {
            toast.error(`Quantity value invalid, specify quantity within the range of "1-${product.countInStock}".`);
            setQty(Number(product.countInStock));
        }
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

    const qtyButton = (operator) => {
        if (operator === "add") {
            setQty(Number(qty) + 1);
        } else {
            setQty(Number(qty) - 1);
        }
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
                    <div className="flex flex-col relative items-between my-[5rem] mx-[15rem] relative">
                        <div className="flex flex-row items-center bg-white border border-gray-200 w-full mr-{2rem]rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
                            <img className="object-cover  rounded-t-lg  md:rounded-none md:rounded-s-lg w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-{2rem]" src={product.image} alt={product.name} />
                            <HeartIcon product={product} />
                            <div className=" w-full flex flex-col justify-left p-[3rem] leading-normal">
                                <div className="flex items-center justify-between  ">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>


                                    <div className="flex items-center ">
                                        <Ratings value={product.rating} />
                                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{product.rating.toFixed(2)}</p>
                                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                        <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{product.numReviews} reviews</a>
                                    </div>

                                </div>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>

                                <ul className="mt-3 flex flex-col mb-5">
                                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>Brand:</span>
                                            <span>{product.brand}</span>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>Added:</span>
                                            <span> {moment(product.CreatedAt).fromNow()}</span>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>In Stock:</span>
                                            <span>{product.countInStock}</span>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>Quantity:</span>
                                            <span>  {product.countInStock > 0 && (

                                                <div className="relative flex items-center max-w-[8rem]">
                                                    <button type="button" id="decrement-button" onClick={() => qtyButton('minus')} data-input-counter-decrement={qty} disabled={Number(qty) === 1} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <input type="number" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min={1} max={Number(product.countInStock)} onChange={e => setQty(e.target.value)} placeholder="1" required value={qty} />
                                                    <button type="button" id="increment-button" disabled={Number(qty) === Number(product.countInStock)} onClick={() => qtyButton('add')} data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>

                                                    {/* <div className="">
                                                        <select name="" value={qty} onChange={e => setQty(e.target.value)} id="" className="p-2 rounded-lg text-black">
                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                            ))}
                                                            </select>
                                                            </div> */}
                                                </div>

                                            )}</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Add to cart
                                    </button>
                                </div>
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
