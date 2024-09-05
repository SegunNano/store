import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useFetchTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import Star from "../../components/Star";
import './star.css';


const ProductTabs = ({ loadingProductReview, userInfo, submitHandler, product, rating, comment, setComment, setRating }) => {
    const { data, isLoading } = useFetchTopProductsQuery();
    const [activeTab, setActiveTab] = useState(1);


    if (isLoading) return <Loader />;

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };


    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:flex">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    <li>
                        <div className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 1 ? 'text-white bg-blue-700 dark:bg-blue-600 active' : "dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white hover:text-gray-900 bg-gray-50 hover:bg-gray-100"}`} onClick={() => handleTabClick(1)}>
                            <svg className={`w-4 h-4 me-2 ${activeTab === 1 ? 'text-white' : ' text-gray-500 dark:text-gray-400'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Your Review
                        </div>
                    </li>
                    <li>
                        <div className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 2 ? 'text-white bg-blue-700 dark:bg-blue-600 active' : "dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white hover:text-gray-900 bg-gray-50 hover:bg-gray-100"}`} onClick={() => handleTabClick(2)} >
                            <svg className={`w-4 h-4 me-2 ${activeTab === 2 ? 'text-white' : ' text-gray-500 dark:text-gray-400'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" /></svg>
                            All Reviews
                        </div>
                    </li>
                    <li>
                        <div className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 3 ? 'text-white bg-blue-700 dark:bg-blue-600 active' : "dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white hover:text-gray-900 bg-gray-50 hover:bg-gray-100"}`} onClick={() => handleTabClick(3)} >
                            <svg className={`w-4 h-4 me-2 ${activeTab === 3 ? 'text-white' : ' text-gray-500 dark:text-gray-400'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                            </svg>
                            Related Products
                        </div>
                    </li>
                </ul>
                <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    {activeTab === 1 && (
                        <section>
                            <div className="mt-4">
                                {userInfo ? (
                                    <form onSubmit={submitHandler}>

                                        <div className="py-3 sm:max-w-xl sm:mx-auto">
                                            <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                                                <div className="px-12 py-5">
                                                    <h2 className="text-gray-800 text-3xl font-semibold">Your Review Here!</h2>
                                                </div>
                                                <div className="bg-gray-200 w-full flex flex-col items-center">
                                                    <div className="flex flex-col items-center py-6 space-y-3">
                                                        <span className="text-lg text-gray-800">How was quality of the product?</span>
                                                        <div className="flex space-x-3 p-[2rem]">
                                                            <div style={{ display: 'inline-block' }}>

                                                                {[...Array(5)].map((_, index) => (
                                                                    <div key={index} style={{ display: 'inline-block' }}>
                                                                        <Star
                                                                            value={index + 1}
                                                                            isLeftHalf={true}
                                                                            filled={rating >= index + 0.5}
                                                                            onChange={() => handleRatingChange(index + 0.5)}
                                                                        />
                                                                        <Star
                                                                            value={index + 1}
                                                                            isLeftHalf={false}
                                                                            filled={rating >= index + 1}
                                                                            onChange={() => handleRatingChange(index + 1)}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-3/4 flex flex-col">
                                                        <textarea id="comment" required value={comment} onChange={e => setComment(e.target.value)} rows="3" className="p-4 text-gray-500 rounded-xl resize-none">Leave a comment</textarea>
                                                        <button disabled={loadingProductReview} className="py-3 my-8 text-lg bg-gradient-to-r from-indigo-500 to-pink-600 rounded-xl text-white" type="submit">Review now</button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </form>
                                ) : ''}
                            </div>
                        </section>
                    )}
                </div>
            </div>



            {activeTab === 2 && (
                <section>
                    <div >
                        {product.reviews.length === 0 ? (
                            <p>No reviews</p>
                        ) : (product.reviews.map(review => (
                            <div key={review._id} className="bg-[#E5E5E5] p-4 rounded-lg xl:ml[2rem] xl:w-[50rem] sm:ml[0rem] sm:w-[24rem] mb-5">
                                <div className="flex justify-between text-[#4F4F4F]">
                                    <strong >{review.name}</strong>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                </div>
                                <p className="my-4">{review.comment}</p>
                                <Ratings value={review.rating} />
                            </div>
                        ))
                        )}
                    </div>
                </section>
            )}

            {activeTab === 3 && (
                <section className="flex flex-wrap ml-[4rem]">
                    {!data ? (
                        <Loader />
                    ) : (
                        data.map(product => (
                            <div key={product._id}>
                                <SmallProduct product={product} />
                            </div>
                        ))
                    )}
                </section>
            )}

        </div>
    );
};

export default ProductTabs;
